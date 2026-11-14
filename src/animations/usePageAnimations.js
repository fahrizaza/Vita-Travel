import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { useIsMobile } from "../hooks/useMediaQuery";
import { ScrollSmoother, ScrollTrigger, useGSAP } from "./gsap";
import { initPageAnimations } from "./initPageAnimations";

/**
 * ScrollTrigger re-measures on window "load", but pages are rendered after that event and their
 * images keep loading afterwards. Re-measure whenever the content height changes, otherwise
 * pins and reveal positions stay where the page was before its images arrived.
 */
function refreshWhenContentResizes(content) {
  let height = content.offsetHeight;
  let timer;
  const observer = new ResizeObserver(() => {
    if (content.offsetHeight === height) return;
    height = content.offsetHeight;
    clearTimeout(timer);
    timer = setTimeout(() => ScrollTrigger.refresh(), 150);
  });
  observer.observe(content);
  return () => {
    observer.disconnect();
    clearTimeout(timer);
  };
}

/**
 * Smooth scrolling plus every scroll animation of the current page.
 *
 * Everything is created inside a gsap context, so on navigation (or when crossing the mobile
 * breakpoint) the previous smoother, ScrollTriggers, SplitText splits and inline styles are
 * reverted before the new page is set up.
 */
export function usePageAnimations(wrapperRef) {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  // A new page starts at the top. Declared first so it runs before the smoother is re-created.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const content = wrapper.querySelector(".main-wrapper");
      ScrollSmoother.create({ wrapper, content, smooth: 1.2, effects: true });
      initPageAnimations(wrapper, { isMobile });
      return refreshWhenContentResizes(content);
    },
    { scope: wrapperRef, dependencies: [pathname, isMobile], revertOnUpdate: true },
  );
}
