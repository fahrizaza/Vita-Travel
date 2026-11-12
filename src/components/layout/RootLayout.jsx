import { useRef } from "react";
import { Outlet, useMatches } from "react-router";
import { usePageAnimations } from "../../animations/usePageAnimations";
import { useEqualHeights } from "../../hooks/useEqualHeights";
import { useHashScroll } from "../../hooks/useHashScroll";
import CookieBanner from "./CookieBanner";
import Footer from "./Footer";
import Header from "./Header";

/**
 * Shell shared by every page. `.page-wrapper` / `.main-wrapper` are the ScrollSmoother wrapper
 * and content; the header and cookie banner stay outside so they remain fixed.
 */
export default function RootLayout() {
  const wrapperRef = useRef(null);
  const footerVariant = useMatches().at(-1)?.handle?.footerVariant ?? "base";

  // Order matters: equalize card heights before ScrollTriggers measure the page.
  useEqualHeights(wrapperRef, ".coaches-person-info__head");
  usePageAnimations(wrapperRef);
  useHashScroll();

  return (
    <>
      <Header />
      <div ref={wrapperRef} className="page-wrapper">
        <div className="main-wrapper">
          <Outlet />
          <Footer variant={footerVariant} />
        </div>
      </div>
      <CookieBanner />
    </>
  );
}
