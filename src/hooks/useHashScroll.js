import { useEffect } from "react";
import { useLocation } from "react-router";
import { scrollToElement } from "../lib/scroll";

/** Resolves once the window has loaded and the web fonts are applied (text height is final). */
function whenLayoutIsReady() {
  const loaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
  return Promise.all([loaded, document.fonts?.ready]);
}

/**
 * Scrolls to the element named by the URL hash (e.g. "/#retreats") after every navigation,
 * leaving 40px above it.
 */
export function useHashScroll() {
  const { hash, key } = useLocation();

  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return undefined;

    let cancelled = false;
    let timer;
    let cancelScroll;
    whenLayoutIsReady().then(() => {
      if (cancelled) return;
      timer = setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          cancelScroll = scrollToElement(target, {
            offsetY: 40,
            duration: 0.6,
            ease: "sine.inOut",
          });
        }
      }, 100);
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelScroll?.();
    };
  }, [hash, key]);
}
