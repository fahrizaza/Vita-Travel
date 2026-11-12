import { createContext, useContext } from "react";

/** Shared by the two copies of the retreat section nav (phone bar and desktop sidebar). */
export const SectionSpyContext = createContext(null);

export function useSectionSpy() {
  const value = useContext(SectionSpyContext);
  if (!value) throw new Error("useSectionSpy must be used inside <SectionSpyProvider>");
  return value;
}
