import { useCallback, useSyncExternalStore } from "react";

/** Same breakpoint the original scripts used (`window.innerWidth <= 479`). */
export const MOBILE_QUERY = "(max-width: 479px)";

export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useIsMobile() {
  return useMediaQuery(MOBILE_QUERY);
}
