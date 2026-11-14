import { useSyncExternalStore } from "react";

function subscribe(onChange) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** True once the page has been scrolled further than `offset` pixels. */
export function useScrolledPast(offset) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > offset,
    () => false,
  );
}
