import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { MOBILE_QUERY, useIsMobile } from "./useMediaQuery";

/**
 * Gives every element matching `selector` inside `scopeRef` the height of the tallest one
 * (desktop only), re-measuring on resize and on page change. Crossing the mobile breakpoint
 * re-renders the carousels, so the elements are queried again then too.
 */
export function useEqualHeights(scopeRef, selector) {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    const elements = Array.from(scopeRef.current?.querySelectorAll(selector) ?? []);
    if (!elements.length) return undefined;

    const update = () => {
      elements.forEach((element) => {
        element.style.height = "auto";
      });
      if (window.matchMedia(MOBILE_QUERY).matches) return;
      const tallest = Math.max(...elements.map((element) => element.offsetHeight));
      elements.forEach((element) => {
        element.style.height = `${tallest}px`;
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      elements.forEach((element) => {
        element.style.height = "";
      });
    };
  }, [scopeRef, selector, pathname, isMobile]);
}
