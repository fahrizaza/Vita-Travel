/** Animations specific to the retreat, coaches, contacts and legal pages. */
import { getHeaderHeight } from "../../lib/scroll";
import { gsap, ScrollTrigger } from "../gsap";
import { BRIGHTEN, splitLines, splitLinesAndChars, splitTypewriter, typeIn } from "../split";

const ENTER = { start: "top 88%", once: true };

/** Retreat pages: sticky info sidebar and the intro entrance. */
export function animateRetreatPage(root, { isMobile }) {
  const content = root.querySelector(".retreat-page-content__in");
  const sidebar = root.querySelector(".retreat-page-info");
  if (content) {
    const headerHeight = getHeaderHeight();
    if (isMobile) {
      const nav = root.querySelector(".retreat-page-info__nav.mobile-visible");
      if (nav) gsap.set(nav, { position: "sticky", top: headerHeight, zIndex: 10 });
    } else if (sidebar) {
      ScrollTrigger.create({
        trigger: content,
        pin: sidebar,
        start: `top ${headerHeight}`,
        end: () => `+=${content.offsetHeight - sidebar.offsetHeight}`,
        pinSpacing: false,
      });
    }
  }

  const intro = [
    ".retreat-page-intro__head .breadcrumbs",
    ".retreat-page-intro__head .h2",
    ".retreat-page-intro__photos",
    ".retreat-page-content__description",
  ]
    .map((selector) => root.querySelector(selector))
    .filter(Boolean);
  intro.forEach((element, index) => {
    gsap.set(element, { opacity: 0, y: 30 });
    gsap.to(element, { opacity: 1, y: 0, duration: 0.8, delay: 0.15 * index, ease: "power3.out" });
  });
}

export function animateCoachesPage(root, { isMobile }) {
  const section = root.querySelector('[data-anim="coaches-page-title"]')?.closest("section");
  if (!section) return;
  const byAnim = (name) => section.querySelector(`[data-anim="${name}"]`);

  const title = byAnim("coaches-page-title");
  if (title) gsap.set(title, { opacity: 0, y: 40 });

  const headline = byAnim("coaches-page-headline");
  let headlineSplit = null;
  if (headline) {
    if (isMobile) gsap.set(headline, { opacity: 0, y: 30 });
    else headlineSplit = splitTypewriter(headline);
  }

  const description = byAnim("coaches-page-description");
  let descriptionSplit = null;
  if (description) {
    if (isMobile) gsap.set(description, { opacity: 0, y: 30 });
    else descriptionSplit = splitLinesAndChars(description, "coaches-char");
  }

  const typeStagger = 0.03;
  ScrollTrigger.create({
    trigger: section,
    ...ENTER,
    onEnter() {
      const tl = gsap.timeline();
      const fadeUp = { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" };
      if (title) tl.to(title, fadeUp, 0);
      if (headlineSplit) tl.to(headlineSplit.chars, typeIn(typeStagger), 0);
      else if (headline && isMobile) tl.to(headline, fadeUp, 0.2);

      const at = headlineSplit ? headlineSplit.chars.length * typeStagger * 0.5 : 0.4;
      if (descriptionSplit) {
        tl.to(
          descriptionSplit.lines,
          { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.08 },
          at,
        );
        tl.to(descriptionSplit.chars, BRIGHTEN, at + 0.5);
      } else if (description && isMobile) {
        tl.to(description, fadeUp, at);
      }
    },
  });

  // Coach cards: photo slides in, then name and role; desktop staggers per row of three.
  section.querySelectorAll(".coaches-person").forEach((person, index) => {
    const visual = person.querySelector(".coaches-person__visual");
    if (visual) gsap.set(visual, { opacity: 0, x: -40 });
    const prepare = (element) => {
      if (!element) return null;
      if (isMobile) {
        gsap.set(element, { opacity: 0, y: 30 });
        return null;
      }
      return splitLines(element);
    };
    const name = person.querySelector(".coaches-person__head .body-lg");
    const nameSplit = prepare(name);
    const role = person.querySelector(".coaches-person__head .body-sm");
    const roleSplit = prepare(role);

    ScrollTrigger.create({
      trigger: person,
      ...ENTER,
      onEnter() {
        const tl = gsap.timeline({ delay: isMobile ? 0.15 : (index % 3) * 0.15 });
        const lineUp = { y: "0%", duration: 0.7, ease: "power3.out", stagger: 0.06 };
        const fadeUp = { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" };
        if (visual) tl.to(visual, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0);
        if (nameSplit) tl.to(nameSplit.lines, lineUp, 0.15);
        else if (name) tl.to(name, fadeUp, 0.15);
        if (roleSplit) tl.to(roleSplit.lines, lineUp, 0.25);
        else if (role) tl.to(role, fadeUp, 0.25);
      },
    });
  });
}

export function animateContactsPage(root, { isMobile }) {
  const section =
    root.querySelector('[data-anim="contacts-head"]')?.closest(".contact-us") ??
    root.querySelector(".contact-us");
  if (!section) return;
  const byAnim = (name) => section.querySelector(`[data-anim="${name}"]`);

  const visual = section.querySelector(".contact-us__visual");
  if (visual) gsap.set(visual, { opacity: 0, x: -40 });
  const head = byAnim("contacts-head");
  if (head) gsap.set(head, { opacity: 0, y: 40 });
  const title = byAnim("contacts-title");
  const titleSplit = title ? splitLines(title) : null;
  const description = byAnim("contacts-description");
  const descriptionSplit = description ? splitLines(description) : null;
  const form = byAnim("contacts-form");
  if (form) gsap.set(form, { opacity: 0, y: 30 });

  const verticalLine = isMobile ? null : section.querySelector(".contact-us__dec--1");
  const horizontalLine = isMobile ? null : section.querySelector(".contact-us__dec--2");
  if (verticalLine) gsap.set(verticalLine, { height: "0%" });
  if (horizontalLine) gsap.set(horizontalLine, { width: "0%" });

  ScrollTrigger.create({
    trigger: section,
    ...ENTER,
    onEnter() {
      const tl = gsap.timeline();
      const lineUp = { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.08 };
      let at = 0;
      if (visual) tl.to(visual, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, at);
      if (head) tl.to(head, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, at);
      at += 0.2;
      if (titleSplit) tl.to(titleSplit.lines, lineUp, at);
      at += 0.3;
      if (descriptionSplit) tl.to(descriptionSplit.lines, lineUp, at);
      at += 0.3;
      if (form) tl.to(form, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, at);
      if (verticalLine)
        tl.to(verticalLine, { height: "100%", duration: 0.8, ease: "power2.inOut" }, 0.4);
      if (horizontalLine)
        tl.to(horizontalLine, { width: "100%", duration: 0.8, ease: "power2.inOut" }, 0.1);
    },
  });
}

/** Privacy / Terms: keep the table of contents pinned next to the text on desktop. */
export function pinLegalNav(root, { isMobile }) {
  const text = root.querySelector(".legal-content__text");
  const nav = root.querySelector(".legal-nav");
  if (!text || !nav || isMobile) return;

  const headerHeight = getHeaderHeight();
  const sidebarPadding =
    parseFloat(getComputedStyle(nav.closest(".legal-content__sidebar")).paddingTop) || 0;
  ScrollTrigger.create({
    trigger: text,
    pin: nav,
    start: `top ${headerHeight + sidebarPadding}`,
    end: () => `bottom ${nav.offsetHeight + headerHeight + sidebarPadding}`,
    pinSpacing: false,
  });
}
