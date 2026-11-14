/**
 * Declarative scroll reveals: any element with `data-anim="<preset>"` animates in when it
 * scrolls into view. Optional attributes: data-anim-duration, data-anim-delay,
 * data-anim-distance, data-anim-ease, data-anim-start, data-anim-once, data-anim-stagger
 * (staggers the element's children instead of the element itself).
 */
import { gsap, ScrollTrigger } from "./gsap";

const DEFAULTS = { duration: 0.8, distance: 40, ease: "power3.out", start: "top 88%" };

const PRESETS = {
  fade: () => ({ from: { opacity: 0 } }),
  "fade-up": (distance) => ({ from: { opacity: 0, y: distance } }),
  "fade-up-big": () => ({ from: { opacity: 0, y: 200 } }),
  "fade-down": (distance) => ({ from: { opacity: 0, y: -distance } }),
  "fade-left": (distance) => ({ from: { opacity: 0, x: -distance } }),
  "fade-right": (distance) => ({ from: { opacity: 0, x: distance } }),
  "zoom-in": () => ({ from: { opacity: 0, scale: 0.85 } }),
  "zoom-out": () => ({ from: { opacity: 0, scale: 1.15 } }),
  "blur-in": () => ({ from: { opacity: 0, filter: "blur(12px)" }, clearProps: "filter" }),
};

function option(element, key, fallback) {
  return element.dataset[key] ?? fallback;
}

export function initReveal(root) {
  root.querySelectorAll("[data-anim]").forEach((element) => {
    const preset = PRESETS[element.dataset.anim];
    if (!preset) return; // other data-anim values are handled by the section animations

    const stagger = parseFloat(option(element, "animStagger", 0));
    const once = option(element, "animOnce", "true") !== "false";
    const { from, clearProps } = preset(
      parseFloat(option(element, "animDistance", DEFAULTS.distance)),
    );
    const targets = stagger > 0 ? element.children : element;

    gsap.set(targets, from);
    ScrollTrigger.create({
      trigger: element,
      start: option(element, "animStart", DEFAULTS.start),
      once,
      onEnter: () =>
        gsap.to(targets, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          ...(clearProps && { filter: "blur(0px)", clearProps }),
          duration: parseFloat(option(element, "animDuration", DEFAULTS.duration)),
          delay: parseFloat(option(element, "animDelay", 0)),
          ease: option(element, "animEase", DEFAULTS.ease),
          stagger,
        }),
      onLeaveBack: once ? undefined : () => gsap.set(targets, from),
    });
  });
}
