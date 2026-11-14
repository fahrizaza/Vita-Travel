import { Children, cloneElement, useLayoutEffect, useRef, useState } from "react";
import { cx } from "../../lib/cx";

// Same defaults as the slick carousel the original site used.
const SPEED_MS = 300;
const TOUCH_THRESHOLD = 5; // a swipe must cover 1/5 of the carousel width
const EDGE_FRICTION = 0.35; // resistance when dragging past the first/last slide
const VARIABLE_WIDTH_TRACK_PER_SLIDE = 5000; // px; lets each slide keep its CSS width

/** Track offset that brings the slide at `trackIndex` to the left edge. */
function slideOffset(track, trackIndex) {
  return -(track?.children[trackIndex]?.offsetLeft ?? 0);
}

function moveTrack(track, x, withTransition) {
  track.style.transition = withTransition ? `transform ${SPEED_MS}ms ease` : "none";
  track.style.transform = `translate3d(${x}px, 0px, 0px)`;
}

/**
 * Minimal slick-compatible carousel (one slide per step). It renders the same DOM as slick
 * (`.slick-slider > .slick-list > .slick-track > .slick-slide`), with the slide classes put on
 * the children themselves, so the site's existing slick CSS applies unchanged.
 *
 * Children must be elements that accept `className` and `style` (e.g. plain DOM elements).
 */
export default function Carousel({
  className,
  children,
  infinite = false,
  dots = false,
  variableWidth = false,
}) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const clones = infinite && count > 1 ? 1 : 0; // one copy at each end for the wrap-around
  const listRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const [listWidth, setListWidth] = useState(0);
  const [position, setPosition] = useState(clones); // index in the track, clones included
  const [animated, setAnimated] = useState(false);
  const current = (((position - clones) % count) + count) % count;

  useLayoutEffect(() => {
    const list = listRef.current;
    const measure = () => setListWidth(list.offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  // Slide to `position` (or jump there when `animated` is off) whenever it or the layout changes.
  useLayoutEffect(() => {
    const track = trackRef.current;
    moveTrack(track, slideOffset(track, position), animated);
  }, [position, animated, listWidth]);

  const goTo = (nextPosition) => {
    const last = infinite ? count + clones : count - 1;
    const target = Math.max(0, Math.min(last, nextPosition));
    setAnimated(true);
    if (target === position)
      moveTrack(trackRef.current, slideOffset(trackRef.current, position), true);
    else setPosition(target);
  };

  // After sliding onto a copy at either end, jump to the real slide it duplicates.
  const handleTransitionEnd = (event) => {
    if (event.target !== trackRef.current || !clones) return;
    if (position === 0 || position === count + 1) {
      setAnimated(false);
      setPosition(position === 0 ? count : 1);
    }
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      base: slideOffset(trackRef.current, position),
      dx: 0,
    };
  };
  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    drag.dx = event.clientX - drag.startX;
    const pastEdge =
      !infinite && ((current === 0 && drag.dx > 0) || (current === count - 1 && drag.dx < 0));
    moveTrack(trackRef.current, drag.base + drag.dx * (pastEdge ? EDGE_FRICTION : 1), false);
  };
  const handlePointerEnd = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag) return;
    const swiped = Math.abs(drag.dx) > listWidth / TOUCH_THRESHOLD;
    goTo(swiped ? position + (drag.dx < 0 ? 1 : -1) : position);
  };

  const renderSlide = (child, trackIndex, slideIndex, cloned) =>
    cloneElement(child, {
      key: cloned ? `clone-${trackIndex}` : child.key,
      className: cx(
        child.props.className,
        "slick-slide",
        cloned && "slick-cloned",
        !cloned && slideIndex === current && "slick-current slick-active",
      ),
      "data-slick-index": trackIndex - clones,
      "aria-hidden": cloned || undefined,
      style: variableWidth ? child.props.style : { ...child.props.style, width: listWidth },
    });

  const trackSlides = [
    ...(clones ? [renderSlide(slides[count - 1], 0, count - 1, true)] : []),
    ...slides.map((child, index) => renderSlide(child, index + clones, index, false)),
    ...(clones ? [renderSlide(slides[0], count + clones, 0, true)] : []),
  ];
  const trackWidth = variableWidth
    ? VARIABLE_WIDTH_TRACK_PER_SLIDE * trackSlides.length
    : listWidth * trackSlides.length;

  return (
    <div className={cx(className, "slick-initialized slick-slider", dots && "slick-dotted")}>
      <div
        ref={listRef}
        className="slick-list draggable"
        style={{ touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onDragStart={(event) => event.preventDefault()}
      >
        <div
          ref={trackRef}
          className="slick-track"
          style={{ opacity: 1, width: trackWidth }}
          onTransitionEnd={handleTransitionEnd}
        >
          {trackSlides}
        </div>
      </div>
      {dots && (
        <ul className="slick-dots" role="tablist">
          {slides.map((_, index) => (
            <li
              key={index}
              className={index === current ? "slick-active" : undefined}
              role="presentation"
            >
              <button
                type="button"
                role="tab"
                aria-label={`${index + 1} of ${count}`}
                aria-selected={index === current}
                tabIndex={index === current ? 0 : -1}
                onClick={() => goTo(index + clones)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
