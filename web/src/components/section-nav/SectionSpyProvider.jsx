import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MOBILE_QUERY } from "../../hooks/useMediaQuery";
import { getHeaderHeight, getScrollOffset, scrollToElement } from "../../lib/scroll";
import { SectionSpyContext } from "./sectionSpyContext";

const MOBILE_NAV_SELECTOR = ".retreat-page-info__nav.mobile-visible";

const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

/** Which section the reader is in: the last one whose top is above the nav, or the last one at the page end. */
function findActiveTarget(links) {
  const navHeight = isMobile()
    ? document.querySelector(MOBILE_NAV_SELECTOR)?.offsetHeight || 60
    : 60;
  const probe = window.scrollY + navHeight + 20;
  const sections = links
    .map(({ target }) => ({ target, element: document.getElementById(target) }))
    .filter(({ element }) => element)
    .map(({ target, element }) => ({ target, top: getScrollOffset(element) }));
  if (!sections.length) return null;

  const atPageEnd =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100;
  if (atPageEnd) return sections.at(-1).target;

  const current = sections.find(({ top }, index) => {
    const nextTop = sections[index + 1]?.top ?? Infinity;
    return probe >= top && probe < nextTop;
  });
  return (current ?? sections[0]).target;
}

/**
 * Tracks the active section of a retreat page and scrolls to a section on click.
 *
 * @param {{ links: { target: string, label: string }[], children: import("react").ReactNode }} props
 */
export default function SectionSpyProvider({ links, children }) {
  const [activeTarget, setActiveTarget] = useState(null);
  // While a click-triggered scroll runs, the spy must not fight the highlighted link.
  const scrollingRef = useRef(false);
  const cancelScrollRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (!scrollingRef.current) setActiveTarget(findActiveTarget(links));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [links]);

  useEffect(() => () => cancelScrollRef.current?.(), []);

  const scrollToSection = useCallback((target) => {
    setActiveTarget(target);
    const element = document.getElementById(target);
    if (!element) return;

    const headerHeight = getHeaderHeight();
    const offsetY = isMobile()
      ? headerHeight + (document.querySelector(MOBILE_NAV_SELECTOR)?.offsetHeight ?? 0) + 20
      : headerHeight + 20;
    scrollingRef.current = true;
    cancelScrollRef.current?.();
    cancelScrollRef.current = scrollToElement(element, {
      offsetY,
      onComplete: () => {
        setTimeout(() => {
          scrollingRef.current = false;
        }, 100);
      },
    });
  }, []);

  const value = useMemo(
    () => ({ links, activeTarget, scrollToSection }),
    [links, activeTarget, scrollToSection],
  );
  return <SectionSpyContext value={value}>{children}</SectionSpyContext>;
}
