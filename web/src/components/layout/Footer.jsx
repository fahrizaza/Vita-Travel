import AppLink from "../ui/AppLink";
import LogoMark from "./LogoMark";

/** Webflow variant class used by the "simplified" footer (Contacts page). */
const SIMPLIFIED_CLASS = "w-variant-ad03ac84-fafd-e118-38ea-a8459db1e3ca";

function MadeBy() {
  return (
    <>
      <div className="button-sm color-white-60">Made by</div>
      <div className="footer-made-by__visual">
        <div className="button-sm color-white-60">Phenomenon Studio</div>
      </div>
    </>
  );
}

/** @param {{ variant?: "base" | "simplified" }} props */
export default function Footer({ variant = "base" }) {
  const variantClass = variant === "simplified" ? ` ${SIMPLIFIED_CLASS}` : "";

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__in">
          <div className={`footer__visual${variantClass}`}>
            <img
              loading="eager"
              src="/images/illustration.webp"
              alt=""
              className="footer__illustration"
            />
            <div className="footer__layer" />
          </div>
          <div className="footer-top">
            <div className="row mobile-column mobile-gap-56">
              <div className="column column-4">
                <AppLink to="/" className="footer-logo w-inline-block">
                  <div className="w-embed">
                    <LogoMark className="footer-logo__icon" />
                  </div>
                  <div className="footer-logo__title">Vita Travels</div>
                </AppLink>
              </div>
              <div className="column column-8">
                <div className="row mobile-column mobile-gap-56">
                  <div className="column column-6">
                    <div className="footer-top__links">
                      <div className="footer-top__link">
                        <AppLink to="/coaches" className={`h3 color-white${variantClass}`}>
                          <span className="color-white-40">+</span>Coaches
                        </AppLink>
                      </div>
                      <div className="footer-top__link">
                        <AppLink to="/contacts" className={`h3 color-white${variantClass}`}>
                          <span className="color-white-40">+</span>Contacts
                        </AppLink>
                      </div>
                    </div>
                  </div>
                  <div className="column column-6">
                    <div className="footer-top__contacts">
                      <div className="footer-top__contact">
                        <a href="tel:+1012345678" className="body-lg color-white">
                          +1 012 345 678
                        </a>
                      </div>
                      <div className="footer-top__contact">
                        <a href="mailto:vita-travels@gmail.com" className="body-lg color-white">
                          vita-travels@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom__in">
          <div className="footer__l">
            <div className="footer__copy">
              <div className="button-sm color-white-60">
                ©All Rights Reserved. Vita Travel, 2026
              </div>
              <div className="footer__copy-dec" />
            </div>
            <a
              href="https://phenomenonstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-made-by mobile-hidden w-inline-block"
            >
              <MadeBy />
            </a>
          </div>
          <div className="footer-bottom__links">
            <div className="footer-bottom__link">
              <AppLink to="/terms" className="button-sm color-white-60">
                Terms and Conditions
              </AppLink>
            </div>
            <div className="footer-bottom__link">
              <AppLink to="/privacy" className="button-sm color-white-60">
                Privacy Policy
              </AppLink>
            </div>
          </div>
          <div className="footer-made-by mobile-visible">
            <MadeBy />
          </div>
        </div>
        <div className="footer-bottom__dec" />
      </div>
    </div>
  );
}
