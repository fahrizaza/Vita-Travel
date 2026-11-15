/** Scroll animations for sections that appear on several pages. */
import { gsap, ScrollTrigger } from "../gsap";
import { splitLines } from "../split";

const ENTER = { start: "top 88%", once: true };
const LINE_UP = { y: "0%", duration: 0.7, ease: "power3.out", stagger: 0.06 };

/** "Featured Retreats" (home) and "You may also like" (retreat pages). */
export function animateFeatured(root, { isMobile }) {
  const section = root.querySelector(".featured-section");
  if (!section) return;
  const byAnimation = (name, scope = section) => scope.querySelector(`[data-animation="${name}"]`);
  const prepare = (element) => {
    if (!element) return null;
    if (isMobile) {
      gsap.set(element, { opacity: 0, y: 30 });
      return null;
    }
    return splitLines(element);
  };

  const head = byAnimation("featured-head");
  const headSplit = prepare(head);
  const description = byAnimation("featured-head-description");
  const descriptionSplit = prepare(description);

  const cards = Array.from(section.querySelectorAll(".featured-item")).map((card) => {
    const cardHead = byAnimation("featured-item-head", card);
    const parts = {
      card,
      headSplit: cardHead ? splitLines(cardHead) : null,
      cost: byAnimation("featured-item-cost", card),
      properties: card.querySelectorAll('[data-animation="featured-item-property"]'),
      button: card.querySelector('[data-animation="featured-item-button"] .btn-secondary'),
      illustration: byAnimation("featured-item-illustration", card),
      mobileVisual: card.querySelector(".featured-item__visual.mobile-visible"),
    };
    if (parts.cost) gsap.set(parts.cost, { opacity: 0, y: 20 });
    if (parts.properties.length) gsap.set(parts.properties, { opacity: 0, y: 20 });
    if (parts.button) {
      gsap.set(parts.button, {
        transition: "none",
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
      });
    }
    if (parts.illustration) gsap.set(parts.illustration, { opacity: 0, x: -40 });
    if (parts.mobileVisual) gsap.set(parts.mobileVisual, { opacity: 0, x: -40 });
    return parts;
  });

  // Grid lines: 1-4 are horizontal, 5+ vertical.
  const horizontalLines = [];
  const verticalLines = [];
  for (let n = 1; n <= 7; n++) {
    const line = section.querySelector(`.featured__dec--${n}`);
    if (!line) continue;
    if (n <= 4) {
      gsap.set(line, { width: "0%" });
      horizontalLines.push(line);
    } else {
      gsap.set(line, { height: "0%" });
      verticalLines.push({ el: line, target: n === 5 ? "calc(100% - 2px)" : "100%" });
    }
  }

  const drawLines = (tl) => {
    horizontalLines.forEach((line, index) => {
      tl.to(line, { width: "100%", duration: 0.8, ease: "power2.inOut" }, 0.1 * index);
    });
    const verticalAt = 0.1 * horizontalLines.length;
    verticalLines.forEach(({ el, target }, index) => {
      tl.to(el, { height: target, duration: 0.8, ease: "power2.inOut" }, verticalAt + 0.1 * index);
    });
  };

  const revealCard = (parts, tl, at) => {
    const fadeIn = { opacity: 1, duration: 0.6, ease: "power3.out" };
    const slideIn = { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" };
    if (parts.headSplit) tl.to(parts.headSplit.lines, { ...LINE_UP, stagger: 0.08 }, at);
    if (parts.cost) tl.to(parts.cost, { ...fadeIn, y: 0 }, at + 0.1);
    if (parts.illustration) tl.to(parts.illustration, slideIn, at + 0.1);
    if (parts.mobileVisual) tl.to(parts.mobileVisual, slideIn, at + 0.1);
    if (parts.properties.length)
      tl.to(parts.properties, { ...fadeIn, y: 0, stagger: 0.08 }, at + 0.2);
    if (parts.button) {
      tl.to(
        parts.button,
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
        at + 0.2 + 0.08 * parts.properties.length,
      );
    }
  };

  const headLineUp = { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.08 };
  const fadeUp = { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" };

  if (isMobile) {
    // Phones: the heading animates with the section, each card when it scrolls in.
    ScrollTrigger.create({
      trigger: section,
      ...ENTER,
      onEnter() {
        const tl = gsap.timeline();
        drawLines(tl);
        if (headSplit) tl.to(headSplit.lines, headLineUp, 0);
        else if (head) tl.to(head, fadeUp, 0.2);
        if (descriptionSplit) tl.to(descriptionSplit.lines, headLineUp, 0.3);
        else if (description) tl.to(description, fadeUp, 0.5);
      },
    });
    cards.forEach((parts) => {
      ScrollTrigger.create({
        trigger: parts.card,
        start: "top 90%",
        once: true,
        onEnter: () => revealCard(parts, gsap.timeline(), 0),
      });
    });
    return;
  }

  ScrollTrigger.create({
    trigger: section,
    ...ENTER,
    onEnter() {
      const tl = gsap.timeline();
      drawLines(tl);
      if (headSplit) tl.to(headSplit.lines, headLineUp, 0);
      if (descriptionSplit) tl.to(descriptionSplit.lines, headLineUp, 0.3);
      cards.forEach((parts, index) => revealCard(parts, tl, 0.7 + 0.15 * index));
    },
  });
}

/** "How it works" (home) and "Our values" (coaches). */
export function animateHowWorks(root, { isMobile }) {
  const section = root.querySelector(".how-works-section");
  if (!section) return;
  const prepare = (element) => {
    if (!element) return null;
    if (isMobile) {
      gsap.set(element, { opacity: 0, y: 30 });
      return null;
    }
    return splitLines(element);
  };

  const headline = section.querySelector('[data-animation="how-works-headline"]');
  const headlineSplit = prepare(headline);
  const description = section.querySelector('[data-animation="how-works-description"]');
  const descriptionSplit = prepare(description);

  const items = Array.from(section.querySelectorAll(".how-works-item")).map((item) => {
    const head = item.querySelector(".how-works-item__head");
    const title = item.querySelector(".how-works-item__body .body-md:not(.color-white-50)");
    const text = item.querySelector(".how-works-item__body .body-md.color-white-50");
    if (head) gsap.set(head, { opacity: 0, y: 30 });
    if (isMobile) {
      if (title) gsap.set(title, { opacity: 0, y: 30 });
      if (text) gsap.set(text, { opacity: 0, y: 30 });
      return { head, title, text };
    }
    return {
      head,
      titleSplit: title ? splitLines(title) : null,
      textSplit: text ? splitLines(text) : null,
    };
  });

  ScrollTrigger.create({
    trigger: section,
    ...ENTER,
    onEnter() {
      const tl = gsap.timeline();
      const headLineUp = { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.08 };
      const fadeUp = { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" };
      let at = 0;
      if (headlineSplit) tl.to(headlineSplit.lines, headLineUp, at);
      else if (headline) tl.to(headline, { ...fadeUp, duration: 0.8 }, at + 0.2);

      at += 0.3;
      if (descriptionSplit) tl.to(descriptionSplit.lines, headLineUp, at);
      else if (description) tl.to(description, { ...fadeUp, duration: 0.8 }, at + 0.2);

      at += 0.4;
      items.forEach((item, index) => {
        const itemAt = at + 0.2 * index;
        if (item.head) tl.to(item.head, fadeUp, itemAt);
        if (isMobile) {
          if (item.title) tl.to(item.title, fadeUp, itemAt + 0.1);
          if (item.text) tl.to(item.text, fadeUp, itemAt + 0.2);
        } else {
          if (item.titleSplit) tl.to(item.titleSplit.lines, LINE_UP, itemAt + 0.1);
          if (item.textSplit) tl.to(item.textSplit.lines, LINE_UP, itemAt + 0.2);
        }
      });
    },
  });
}

export function animateFooter(root, { isMobile }) {
  const footer = root.querySelector(".footer");
  if (!footer) return;

  const visual = footer.querySelector(".footer__visual");
  if (visual) gsap.set(visual, { opacity: 0, x: -40 });
  const logo = footer.querySelector(".footer-logo");
  if (logo) gsap.set(logo, { opacity: 0, y: 40 });

  const linkSplits = Array.from(footer.querySelectorAll(".footer-top__link .h3")).map(splitLines);
  const contactSplits = Array.from(footer.querySelectorAll(".footer-top__contact .body-lg")).map(
    splitLines,
  );

  const copyright = footer.querySelector(".footer__copy .button-sm");
  let copyrightSplit = null;
  if (copyright) {
    if (isMobile) gsap.set(copyright, { opacity: 0, y: 30 });
    else copyrightSplit = splitLines(copyright);
  }

  const bottomLinks = Array.from(footer.querySelectorAll(".footer-bottom__link .button-sm"));
  const bottomLinkSplits = isMobile ? [] : bottomLinks.map(splitLines);
  if (isMobile) gsap.set(bottomLinks, { opacity: 0, y: 30 });

  const madeBy = footer.querySelector(
    isMobile ? ".footer-made-by.mobile-visible" : ".footer-made-by.mobile-hidden",
  );
  if (madeBy) gsap.set(madeBy, { opacity: 0, y: 20 });

  const bottomLine = isMobile ? null : footer.querySelector(".footer-bottom__dec");
  const copyLine = isMobile ? null : footer.querySelector(".footer__copy-dec");
  if (bottomLine) gsap.set(bottomLine, { width: "0%" });
  if (copyLine) gsap.set(copyLine, { height: "0%" });

  ScrollTrigger.create({
    trigger: footer,
    ...ENTER,
    onEnter() {
      const tl = gsap.timeline();
      const fadeUp = { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" };
      let at = 0;
      if (visual) tl.to(visual, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, at);

      at += 0.2;
      if (logo) tl.to(logo, fadeUp, at);

      at += 0.2;
      linkSplits.forEach((split, index) => tl.to(split.lines, LINE_UP, at + 0.1 * index));

      at += 0.3;
      contactSplits.forEach((split, index) => tl.to(split.lines, LINE_UP, at + 0.1 * index));

      at += 0.3;
      if (copyrightSplit) tl.to(copyrightSplit.lines, LINE_UP, at);
      else if (copyright && isMobile) tl.to(copyright, fadeUp, at);

      at += 0.1;
      if (madeBy) tl.to(madeBy, fadeUp, at);

      at += 0.15;
      if (bottomLinkSplits.length) {
        bottomLinkSplits.forEach((split, index) => tl.to(split.lines, LINE_UP, at + 0.1 * index));
      } else {
        bottomLinks.forEach((link, index) => tl.to(link, fadeUp, at + 0.1 * index));
      }
      if (bottomLine)
        tl.to(bottomLine, { width: "100%", duration: 0.8, ease: "power2.inOut" }, at + 0.1);
      if (copyLine)
        tl.to(copyLine, { height: "100%", duration: 0.8, ease: "power2.inOut" }, at + 0.2);
    },
  });
}
