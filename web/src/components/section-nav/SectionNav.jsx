import { useLayoutEffect, useRef } from "react";
import { MOBILE_QUERY } from "../../hooks/useMediaQuery";
import { cx } from "../../lib/cx";
import { useSectionSpy } from "./sectionSpyContext";

/** In-page navigation of a retreat page ("About Retreats", "Full Program", ...). */
export default function SectionNav({ className }) {
  const navRef = useRef(null);
  const { links, activeTarget, scrollToSection } = useSectionSpy();

  // On phones the nav is a horizontal strip: keep the active link in view.
  useLayoutEffect(() => {
    const nav = navRef.current;
    const activeItem = nav.querySelector(".is-active")?.parentElement;
    if (!activeItem || !window.matchMedia(MOBILE_QUERY).matches) return;
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const itemLeft =
      activeItem.getBoundingClientRect().left - nav.getBoundingClientRect().left + nav.scrollLeft;
    nav.scrollLeft = itemLeft - 1.25 * rootFontSize;
  }, [activeTarget]);

  return (
    <div ref={navRef} className={className}>
      {links.map(({ target, label }) => (
        <div key={target} className="retreat-page-info__link">
          <a
            href={`#${target}`}
            className={cx("body-lg color-white-40", activeTarget === target && "is-active")}
            aria-current={activeTarget === target ? "location" : undefined}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(target);
            }}
          >
            {label}
          </a>
        </div>
      ))}
    </div>
  );
}
