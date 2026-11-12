import { gsap, ScrollSmoother } from "../animations/gsap";

/** How long a scroll keeps correcting itself while lazy images above the target load. */
const SETTLE_MS = 2000;

/** Height of the fixed site header, used to offset in-page scrolling. */
export function getHeaderHeight() {
  return document.querySelector(".header")?.offsetHeight ?? 0;
}

/**
 * Scroll position at which `element`'s top reaches the top of the viewport.
 * ScrollSmoother moves the content with a lag, so ask it for the settled position when active.
 */
export function getScrollOffset(element) {
  const smoother = ScrollSmoother.get();
  if (smoother) return smoother.offset(element, "top top");
  return element.getBoundingClientRect().top + window.scrollY;
}

function tweenTo(element, { offsetY, duration, ease, onComplete }) {
  return gsap.to(window, {
    scrollTo: { y: Math.max(0, getScrollOffset(element) - offsetY), autoKill: false },
    duration,
    ease,
    onComplete,
  });
}

/**
 * Animates the window so that `element` ends up `offsetY` pixels below the top of the viewport.
 *
 * Lazy images only load while the page scrolls past them and then push the target down, so for
 * a short while the scroll is re-aimed whenever the page content grows.
 *
 * @returns {() => void} cancels the scroll
 */
export function scrollToElement(
  element,
  { offsetY = 0, duration = 0.8, ease = "power2.inOut", onComplete } = {},
) {
  let tween = tweenTo(element, { offsetY, duration, ease, onComplete });
  const content = document.querySelector(".main-wrapper");
  if (!content) return () => tween.kill();

  let height = content.offsetHeight;
  const observer = new ResizeObserver(() => {
    if (content.offsetHeight === height) return;
    height = content.offsetHeight;
    tween.kill();
    tween = tweenTo(element, { offsetY, duration: 0.3, ease, onComplete });
  });
  observer.observe(content);
  const timer = setTimeout(() => observer.disconnect(), SETTLE_MS);

  return () => {
    clearTimeout(timer);
    observer.disconnect();
    tween.kill();
  };
}
