import { useRef, useState } from "react";
import { gsap, useGSAP } from "../../animations/gsap";
import { MOBILE_QUERY } from "../../hooks/useMediaQuery";
import { useScrolledPast } from "../../hooks/useScrolledPast";
import { cx } from "../../lib/cx";
import AppLink from "../ui/AppLink";
import Button from "../ui/Button";
import LogoMark from "./LogoMark";

const NAV_LINKS = [
  { to: "/#retreats", label: "Retreats", delay: "0.1" },
  { to: "/coaches", label: "Coaches", delay: "0.2" },
  { to: "/contacts", label: "Contacts", delay: "0.3" },
];

function NavLinks({ animated, onNavigate }) {
  return (
    <ul role="list" className="header-nav">
      {NAV_LINKS.map(({ to, label, delay }) => (
        <li
          key={to}
          className="header-nav__item"
          {...(animated && { "data-anim": "fade-down", "data-anim-delay": delay })}
        >
          <AppLink to={to} className="button-sm color-white header-nav__link" onClick={onNavigate}>
            <span className="color-white-40 mobile-visible-inline">+</span>
            {label}
          </AppLink>
        </li>
      ))}
    </ul>
  );
}

/**
 * Plays once when the site loads: items drop in, decorative lines draw (desktop only).
 * Uses set() + to() with explicit end values rather than from(): some of these elements have a
 * CSS `transition: all`, which would make from() read an already-faded value as its target.
 */
function useHeaderEntrance(headerRef) {
  useGSAP(
    () => {
      headerRef.current.querySelectorAll('[data-anim="fade-down"]').forEach((element) => {
        gsap.set(element, { opacity: 0, y: -40 });
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: parseFloat(element.dataset.animDelay ?? 0),
          ease: "power3.out",
        });
      });

      if (window.matchMedia(MOBILE_QUERY).matches) return;
      const draw = { duration: 0.5, ease: "power2.inOut" };
      gsap.set(".header__dec--1", { scaleX: 0, transformOrigin: "left center" });
      gsap.to(".header__dec--1", { scaleX: 1, delay: 0.3, ...draw });
      gsap.set(".header__dec--2", { scaleY: 0, transformOrigin: "center top" });
      gsap.to(".header__dec--2", { scaleY: 1, delay: 0.4, ...draw });
      gsap.set(".header__dec--3", { scaleY: 0, transformOrigin: "center top" });
      gsap.to(".header__dec--3", { scaleY: 1, delay: 0.5, ...draw });
    },
    { scope: headerRef },
  );
}

export default function Header() {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledPast(20);
  useHeaderEntrance(headerRef);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = (event) => {
    event.preventDefault();
    setMenuOpen((open) => !open);
  };

  return (
    <div ref={headerRef} role="banner" className={cx("header w-nav", scrolled && "is-active")}>
      <div className="header__in">
        <AppLink to="/" className="header__l w-inline-block">
          <div data-anim="fade-down" className="header-logo">
            <div className="w-embed">
              <LogoMark className="header-logo__icon" />
            </div>
            <div className="header-logo__title">Vita Travels</div>
          </div>
          <div className="header__dec header__dec--2" />
        </AppLink>
        <div className="header__r">
          <NavLinks animated onNavigate={closeMenu} />
          <AppLink to="/#retreats" className="header__accent mobile-hidden w-inline-block">
            <div data-anim-delay="0.4" data-anim="fade-down" className="button-sm color-white">
              Explore
            </div>
            <div className="header__dec header__dec--3" />
          </AppLink>
          <div className="header__button mobile-visible">
            <Button kind="primary" variant="full-width-mobile" to="/#retreats" onClick={closeMenu}>
              Explore Retreats
            </Button>
          </div>
        </div>
        <div className="header__burger">
          <a
            href="#"
            className={cx("btn-burger w-inline-block", menuOpen && "is-active")}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <div className="btn-burger__in">
              <div className="btn-burger__line btn-burger__line--1" />
              <div className="btn-burger__line btn-burger__line--2" />
            </div>
          </a>
        </div>
      </div>
      <div className={cx("mobile-menu", menuOpen && "is-active")}>
        <NavLinks onNavigate={closeMenu} />
        <div className="header__button mobile-visible">
          <Button kind="primary" variant="full-width-mobile" to="/#retreats" onClick={closeMenu}>
            Explore Retreats
          </Button>
        </div>
      </div>
      <div className="header__dec header__dec--1" />
    </div>
  );
}
