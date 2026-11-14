/** Scroll animations for the home page sections. */
import { gsap, ScrollTrigger } from "../gsap";
import {
  BRIGHTEN,
  splitDimChars,
  splitLines,
  splitLinesAndChars,
  splitTypewriter,
  typeIn,
} from "../split";

const ENTER = { start: "top 88%", once: true };
const TYPE_STAGGER = 0.03;

/** Phone-only fade of the hero call-to-action. */
export function animateIntro(root, { isMobile }) {
  const button = root.querySelector(".intro__button.mobile-visible");
  if (!button || !isMobile) return;
  gsap.set(button, { opacity: 0, y: 30 });
  gsap.to(button, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" });
}

export function animateStatistic(root, { isMobile }) {
  const section = root.querySelector(".statistic-section");
  if (!section) return;
  const find = (name, scope = section) => scope.querySelector(`[data-anim="${name}"]`);

  const title = find("statistic-head-title");
  const heading = find("statistic-h2");
  const borderTop = find("statistic-border-top");
  const borderBottom = find("statistic-border-bottom");
  const borderRight1 = find("statistic-border-right-1");
  const borderRight2 = find("statistic-border-right-2");

  if (title) gsap.set(title, { opacity: 0, y: 40 });
  let headingSplit = null;
  if (heading) {
    if (isMobile) gsap.set(heading, { opacity: 0, y: 30 });
    else headingSplit = splitTypewriter(heading);
  }
  if (borderTop) gsap.set(borderTop, { width: "0%" });
  if (borderBottom) gsap.set(borderBottom, { width: "0%" });
  if (borderRight1) gsap.set(borderRight1, { height: "0%" });
  if (borderRight2) gsap.set(borderRight2, { height: "0%" });

  const items = [1, 2, 3]
    .map((n) => find(`statistic-item-${n}`))
    .filter(Boolean)
    .map((item) => {
      const parts = {
        title: find("statistic-item-title", item),
        subtitle: find("statistic-item-subtitle", item),
        illustration: find("statistic-item-illustration", item),
      };
      if (parts.title) gsap.set(parts.title, { opacity: 0, y: 30 });
      if (parts.subtitle) gsap.set(parts.subtitle, { opacity: 0, y: 30 });
      if (parts.illustration) gsap.set(parts.illustration, { opacity: 0, x: -40 });
      return parts;
    });

  ScrollTrigger.create({
    trigger: section,
    ...ENTER,
    onEnter() {
      const tl = gsap.timeline();
      if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0);
      if (headingSplit) tl.to(headingSplit.chars, typeIn(TYPE_STAGGER), 0);
      else if (heading && isMobile)
        tl.to(heading, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2);

      const bordersAt = headingSplit ? headingSplit.chars.length * TYPE_STAGGER * 0.5 : 0.4;
      if (borderTop)
        tl.to(borderTop, { width: "100%", duration: 0.8, ease: "power2.inOut" }, bordersAt);
      if (borderBottom)
        tl.to(borderBottom, { width: "100%", duration: 0.8, ease: "power2.inOut" }, bordersAt);
      const sideBorders = { height: "calc(100% - 2px)", duration: 0.8, ease: "power2.inOut" };
      if (borderRight1) tl.to(borderRight1, sideBorders, bordersAt + 0.48);
      if (borderRight2) tl.to(borderRight2, sideBorders, bordersAt + 0.48);

      items.forEach((item, index) => {
        const at = bordersAt + 0.24 + 0.3 * index;
        if (item.title)
          tl.to(item.title, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, at);
        if (item.subtitle)
          tl.to(item.subtitle, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, at + 0.1);
        if (item.illustration) {
          tl.to(
            item.illustration,
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
            at + 0.15,
          );
        }
      });
    },
  });
}

export function animateAbout(root, { isMobile }) {
  const section = root.querySelector(".about-section");
  if (!section) return;
  const byAnim = (name) => section.querySelector(`[data-anim="${name}"]`);
  const byAnimation = (name) => section.querySelector(`[data-animation="${name}"]`);

  const head = byAnim("about-section-head");
  if (head) gsap.set(head, { opacity: 0, y: 40 });

  const description = byAnim("about-head-description");
  let descriptionSplit = null;
  if (description) {
    if (isMobile) gsap.set(description, { opacity: 0, y: 30 });
    else descriptionSplit = splitTypewriter(description);
  }

  const illustration = byAnimation("about-illustration");
  if (illustration) gsap.set(illustration, { opacity: 0, x: -40 });

  const headline = byAnimation("about-head");
  let headlineSplit = null;
  if (headline) {
    if (isMobile) {
      headlineSplit = splitDimChars(headline, "about-char", { keepIndent: true });
      gsap.set(headline, { opacity: 0, y: 30 });
    } else {
      headlineSplit = splitLinesAndChars(headline, "about-char", { keepIndent: true });
    }
  }

  const itemHeads = [];
  const itemDescriptions = [];
  for (let n = 1; n <= 2; n++) {
    const itemHead = byAnimation(`about-item-head-${n}`);
    const itemDescription = byAnimation(`about-item-description-${n}`);
    if (itemHead) itemHeads.push(splitLines(itemHead));
    if (itemDescription) itemDescriptions.push(splitLines(itemDescription));
  }

  const footer = byAnimation("about-item-footer");
  const footerSplit = footer ? splitLines(footer) : null;
  const logos = section.querySelectorAll('[data-animation="about-item-footer-logos"] img');
  if (logos.length) gsap.set(logos, { opacity: 0, y: 20 });

  ScrollTrigger.create({
    trigger: section,
    ...ENTER,
    onEnter() {
      const tl = gsap.timeline();
      if (head) tl.to(head, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0);
      if (descriptionSplit) tl.to(descriptionSplit.chars, typeIn(TYPE_STAGGER), 0);
      else if (description && isMobile) {
        tl.to(description, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2);
      }

      const at = descriptionSplit ? descriptionSplit.chars.length * TYPE_STAGGER * 0.5 : 0.4;
      if (illustration)
        tl.to(illustration, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, at);
      if (headlineSplit) {
        if (isMobile) {
          tl.to(headline, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, at + 0.2);
          tl.to(headlineSplit.chars, BRIGHTEN, at + 0.5);
        } else {
          tl.to(
            headlineSplit.lines,
            { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.08 },
            at + 0.2,
          );
          tl.to(headlineSplit.chars, BRIGHTEN, at + 0.7);
        }
      }

      const itemsAt = at + 0.8;
      const lineUp = { y: "0%", duration: 0.7, ease: "power3.out", stagger: 0.06 };
      itemHeads.forEach((split, index) => tl.to(split.lines, lineUp, itemsAt + 0.3 * index));
      itemDescriptions.forEach((split, index) =>
        tl.to(split.lines, lineUp, itemsAt + 0.15 + 0.3 * index),
      );
      if (footerSplit) tl.to(footerSplit.lines, lineUp, itemsAt + 0.6);
      if (logos.length) {
        tl.to(
          logos,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.12 },
          itemsAt + 0.8,
        );
      }
    },
  });
}

export function animateCombine(root) {
  const section = root.querySelector('[data-animation="combine-headline"]')?.closest("section");
  if (!section) return;
  const byAnimation = (name) => section.querySelector(`[data-animation="${name}"]`);

  const headline = byAnimation("combine-headline");
  const headlineSplit = headline ? splitLines(headline) : null;
  const titleSplits = [1, 2, 3].map((n) => {
    const title = byAnimation(`combine-title-item-${n}`);
    return title ? splitLines(title) : null;
  });

  const description = byAnimation("combine-description");
  const descriptionSplit = description ? splitLinesAndChars(description, "combine-char") : null;

  const horizontalLines = [1, 2]
    .map((n) => section.querySelector(`.combine__dec--${n}`))
    .filter(Boolean);
  gsap.set(horizontalLines, { width: "0%" });

  const verticalLines = [1, 2, 3, 4]
    .map((n) => ({
      el: section.querySelector(`.combine-step__dec--${n}`),
      target: n === 4 ? "calc(100% - 2px)" : "100%",
    }))
    .filter(({ el }) => el);
  verticalLines.forEach(({ el }) => gsap.set(el, { height: "0%" }));

  const steps = [1, 2, 3, 4].map((n) => {
    const step = byAnimation(`combine-step-${n}`);
    if (!step) return null;
    const head = step.querySelector(".combine-step__head");
    const body = step.querySelector(".combine-step__body .body-lg");
    return { headSplit: head ? splitLines(head) : null, bodySplit: body ? splitLines(body) : null };
  });

  ScrollTrigger.create({
    trigger: section,
    ...ENTER,
    onEnter() {
      const tl = gsap.timeline();
      let at = 0;
      if (headlineSplit)
        tl.to(
          headlineSplit.lines,
          { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.08 },
          at,
        );
      titleSplits.forEach((split, index) => {
        if (split) {
          tl.to(
            split.lines,
            { y: "0%", duration: 0.7, ease: "power3.out", stagger: 0.08 },
            at + 0.15 * (index + 1),
          );
        }
      });
      horizontalLines.forEach((line, index) => {
        tl.to(line, { width: "100%", duration: 0.8, ease: "power2.inOut" }, at + 0.1 * index);
      });

      at += 0.6;
      if (descriptionSplit) {
        tl.to(
          descriptionSplit.lines,
          { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.08 },
          at,
        );
        tl.to(descriptionSplit.chars, BRIGHTEN, at + 0.5);
      }
      verticalLines.forEach(({ el, target }, index) => {
        tl.to(el, { height: target, duration: 0.8, ease: "power2.inOut" }, at + 0.4 + 0.1 * index);
      });

      at += 0.6;
      const lineUp = { y: "0%", duration: 0.7, ease: "power3.out", stagger: 0.06 };
      steps.forEach((step, index) => {
        if (!step) return;
        const stepAt = at + 0.2 * index;
        if (step.headSplit) tl.to(step.headSplit.lines, lineUp, stepAt);
        if (step.bodySplit) tl.to(step.bodySplit.lines, lineUp, stepAt + 0.1);
      });
    },
  });
}

export function animateDestination(root, { isMobile }) {
  const section = root.querySelector(".destination-section");
  if (!section) return;
  const byAnimation = (name) => section.querySelector(`[data-animation="${name}"]`);

  const title = byAnimation("destination-head-title");
  if (title) gsap.set(title, { opacity: 0, y: 40 });

  const heading = byAnimation("destination-h2");
  let headingSplit = null;
  if (heading) {
    if (isMobile) gsap.set(heading, { opacity: 0, y: 30 });
    else headingSplit = splitTypewriter(heading);
  }

  const description = byAnimation("destination-description");
  let descriptionSplit = null;
  if (description) {
    if (isMobile) {
      descriptionSplit = splitDimChars(description, "dest-char");
      gsap.set(description, { opacity: 0, y: 30 });
    } else {
      descriptionSplit = splitLinesAndChars(description, "dest-char", { keepIndent: true });
    }
  }

  // Map dots: every glow <g opacity> is followed by its <circle>.
  const map = section.querySelector(".destination__dots");
  const dots = [];
  if (map) {
    const nodes = Array.from(map.children);
    nodes.forEach((glow, index) => {
      const dot = nodes[index + 1];
      if (glow.tagName.toLowerCase() !== "g" || !glow.getAttribute("opacity")) return;
      if (dot?.tagName.toLowerCase() !== "circle") return;
      const origin = `${dot.getAttribute("cx")} ${dot.getAttribute("cy")}`;
      gsap.set([glow, dot], { scale: 0, svgOrigin: origin });
      dots.push({ glow, dot, origin });
    });
  }

  ScrollTrigger.create({
    trigger: section,
    ...ENTER,
    onEnter() {
      const tl = gsap.timeline();
      if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0);
      if (headingSplit) tl.to(headingSplit.chars, typeIn(TYPE_STAGGER), 0.2);
      else if (heading && isMobile)
        tl.to(heading, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2);

      const at = 0.2 + (headingSplit ? headingSplit.chars.length * TYPE_STAGGER * 0.5 : 0.4);
      if (!descriptionSplit) return;
      if (isMobile) {
        tl.to(description, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, at);
        tl.to(descriptionSplit.chars, BRIGHTEN, at + 0.3);
      } else {
        tl.to(
          descriptionSplit.lines,
          { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.08 },
          at,
        );
        tl.to(descriptionSplit.chars, BRIGHTEN, at + 0.5);
      }
    },
  });

  if (dots.length) {
    ScrollTrigger.create({
      trigger: map,
      start: "top 90%",
      once: true,
      onEnter() {
        const tl = gsap.timeline();
        gsap.utils.shuffle(dots.slice()).forEach(({ glow, dot }, index) => {
          const at = 0.08 * index;
          tl.to(
            glow,
            {
              scale: 0.6,
              opacity: 0.15,
              duration: 0.6,
              ease: "elastic.out(1, 0.5)",
              filter: "blur(2px)",
            },
            at,
          );
          tl.to(dot, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }, at);
        });
        // Then keep every dot gently pulsing.
        tl.call(() => {
          dots.forEach(({ glow, dot, origin }) => {
            const delay = 2 * Math.random();
            const duration = 1 + 0.8 * Math.random();
            const pulse = {
              duration,
              delay,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              svgOrigin: origin,
            };
            gsap.to(dot, { scale: 1.2, ...pulse });
            gsap.to(glow, { scale: 1.4, opacity: 0.1, ...pulse });
          });
        });
      },
    });
  }

  if (isMobile) {
    section.querySelectorAll(".destination-mobile-item").forEach((item, index) => {
      gsap.set(item, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: item,
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15 * index,
            ease: "power3.out",
          }),
      });
    });
  }
}

export function animatePractitioners(root, { isMobile }) {
  const section = root.querySelector(".practitioners-section");
  if (!section) return;
  const byAnimation = (name) => section.querySelector(`[data-animation="${name}"]`);
  /** Splits on desktop; fades the whole block on phones. */
  const prepare = (element) => {
    if (!element) return null;
    if (isMobile) {
      gsap.set(element, { opacity: 0, y: 30 });
      return null;
    }
    return splitLines(element);
  };

  const people = [1, 2, 3, 4].map((n) => {
    const visual = byAnimation(`practitioners-illustration-${n}`);
    const title = byAnimation(`practitioners-person-title-${n}`);
    const description = byAnimation(`practitioners-person-description-${n}`);
    if (visual) gsap.set(visual, { opacity: 0, x: -40 });
    return {
      visual,
      titleSplit: title ? splitLines(title) : null,
      descriptionSplit: description ? splitLines(description) : null,
    };
  });

  const title = byAnimation("practitioners-title");
  if (title) gsap.set(title, { opacity: 0, y: 40 });
  const headline = byAnimation("practitioners-headline");
  const headlineSplit = prepare(headline);

  const pluses = [1, 2].map((n) => byAnimation(`practitioners-plus-${n}`)).filter(Boolean);
  gsap.set(pluses, { rotation: -180, opacity: 0 });

  const itemTitle = byAnimation("practitioners-item-title-1");
  const itemTitleSplit = prepare(itemTitle);
  const itemDescription = byAnimation("practitioners-item-description-1");
  const itemDescriptionSplit = prepare(itemDescription);

  const quote = byAnimation("practitioners-item-description-2");
  let quoteSplit = null;
  if (quote) {
    if (isMobile) gsap.set(quote, { opacity: 0, y: 30 });
    else quoteSplit = splitLinesAndChars(quote, "pract-char");
  }

  const lines = {
    1: section.querySelector(".practitioners__dec--1"),
    2: section.querySelector(".practitioners__dec--2"),
    3: section.querySelector(".practitioners__dec--3"),
    4: section.querySelector(".practitioners__dec--4"),
    5: section.querySelector(".practitioners__dec--5"),
  };
  if (!isMobile) {
    if (lines[1]) gsap.set(lines[1], { width: "0%" });
    if (lines[2]) gsap.set(lines[2], { width: "0%" });
    if (lines[4]) gsap.set(lines[4], { height: "0%" });
    if (lines[5]) gsap.set(lines[5], { width: "0%" });
    if (lines[3]) gsap.set(lines[3], { height: "0%" });
  }

  ScrollTrigger.create({
    trigger: section,
    ...ENTER,
    onEnter() {
      const tl = gsap.timeline();
      const lineUp = { y: "0%", duration: 0.7, ease: "power3.out", stagger: 0.06 };
      const fadeUp = { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" };

      people.forEach((person, index) => {
        const at = 0.2 * index;
        if (person.visual)
          tl.to(person.visual, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, at);
        if (person.titleSplit) tl.to(person.titleSplit.lines, lineUp, at + 0.15);
        if (person.descriptionSplit) tl.to(person.descriptionSplit.lines, lineUp, at + 0.25);
      });

      let at = 0.2 * people.length + 0.3;
      if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, at);

      at += 0.2;
      if (headlineSplit)
        tl.to(
          headlineSplit.lines,
          { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.08 },
          at,
        );
      else if (headline && isMobile) tl.to(headline, { ...fadeUp, duration: 0.8 }, at + 0.2);

      at += 0.4;
      if (pluses[0])
        tl.to(pluses[0], { rotation: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, at);
      if (itemTitleSplit) tl.to(itemTitleSplit.lines, lineUp, at + 0.1);
      else if (itemTitle && isMobile) tl.to(itemTitle, fadeUp, at + 0.1);
      if (itemDescriptionSplit) tl.to(itemDescriptionSplit.lines, lineUp, at + 0.2);
      else if (itemDescription && isMobile) tl.to(itemDescription, fadeUp, at + 0.2);

      at += 0.5;
      if (pluses[1])
        tl.to(pluses[1], { rotation: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, at);
      if (quoteSplit) {
        tl.to(
          quoteSplit.lines,
          { y: "0%", duration: 0.8, ease: "power3.out", stagger: 0.08 },
          at + 0.1,
        );
        tl.to(quoteSplit.chars, BRIGHTEN, at + 0.6);
      } else if (quote && isMobile) {
        tl.to(quote, { ...fadeUp, duration: 0.8 }, at + 0.1);
      }

      if (!isMobile) {
        const draw = { duration: 0.8, ease: "power2.inOut" };
        if (lines[1]) tl.to(lines[1], { width: "100%", ...draw }, 0);
        if (lines[2]) tl.to(lines[2], { width: "100%", ...draw }, 0.1);
        if (lines[4]) tl.to(lines[4], { height: "100%", ...draw }, 0.2);
        if (lines[5]) tl.to(lines[5], { width: "100%", ...draw }, 0.3);
        if (lines[3]) tl.to(lines[3], { height: "100%", ...draw }, 0.4);
      }
    },
  });
}
