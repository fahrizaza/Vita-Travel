import { useLayoutEffect, useRef, useState } from "react";
import AppLink from "../ui/AppLink";
import Button from "../ui/Button";

const STORAGE_KEY = "cookie_accepted";

function hasAccepted() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false; // storage blocked: just show the banner
  }
}

function rememberAccepted() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // storage blocked: the banner simply shows again next visit
  }
}

/** Cookie notice. Accept, Decline and close all dismiss it for good, as on the original site. */
export default function CookieBanner() {
  const bannerRef = useRef(null);
  const [visible, setVisible] = useState(() => !hasAccepted());

  // Reserve room at the bottom of the page so the banner never covers the footer.
  useLayoutEffect(() => {
    if (!visible) return undefined;
    const reserveSpace = () => {
      document.body.style.paddingBottom = `${bannerRef.current.offsetHeight}px`;
    };
    reserveSpace();
    window.addEventListener("resize", reserveSpace);
    return () => {
      window.removeEventListener("resize", reserveSpace);
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  const dismiss = (event) => {
    event.preventDefault();
    setVisible(false);
    rememberAccepted();
  };

  return (
    <div ref={bannerRef} className={visible ? "cookie is-active" : "cookie"}>
      <div className="cookie__text">
        <div className="body-md-regular color-white-60 mobile-no-br">
          By clicking “Accept”, you agree to the storing of cookies on your device to enhance site
          navigation, analyze site <br />
          usage, and assist in our marketing efforts. View our{" "}
          <AppLink to="/privacy" className="link">
            <span className="color-white">Privacy Policy</span>
          </AppLink>{" "}
          for more information.
        </div>
      </div>
      <div className="cookie__controls">
        <Button kind="secondary" variant="mobile-big" onClick={dismiss}>
          Decline
        </Button>
        <Button kind="primary" variant="full-width-mobile" onClick={dismiss}>
          Accept
        </Button>
        <div className="cookie__close">
          <a href="#" className="btn-close w-button" aria-label="Close" onClick={dismiss} />
        </div>
      </div>
    </div>
  );
}
