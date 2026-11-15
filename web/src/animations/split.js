/**
 * SplitText helpers shared by the section animations.
 * Everything here runs inside a gsap context (useGSAP), so splits and `gsap.set` calls are
 * reverted automatically when the page changes.
 */
import { gsap, SplitText } from "./gsap";

export const DIM_WHITE = "rgba(255,255,255,0.4)";
export const WHITE = "rgba(255,255,255,1)";

const LEADING_SPACE = /^((?:&nbsp;|\xA0| )+)/;

/** Wraps every line in an overflow-hidden box so it can slide up into view. */
function maskLines(lines) {
  lines.forEach((line) => {
    const mask = document.createElement("div");
    mask.style.overflow = "hidden";
    line.parentNode.insertBefore(mask, line);
    mask.appendChild(line);
  });
}

/** SplitText drops leading non-breaking spaces (used as a text indent); put them back. */
function restoreLeadingSpace(originalHtml, parent, beforeNode) {
  const match = originalHtml.match(LEADING_SPACE);
  if (!match || !parent) return;
  const span = document.createElement("span");
  span.innerHTML = match[0];
  parent.insertBefore(span, beforeNode);
}

/** Lines start hidden below their mask; animate `split.lines` to `{ y: "0%" }`. */
export function splitLines(element) {
  const split = new SplitText(element, { type: "lines", linesClass: "split-line" });
  maskLines(split.lines);
  gsap.set(split.lines, { y: "100%" });
  return split;
}

/**
 * Lines slide up and characters start dimmed; animate `split.lines` to `{ y: "0%" }` and
 * `split.chars` to `{ color: WHITE }`.
 */
export function splitLinesAndChars(element, charsClass, { keepIndent = false } = {}) {
  const html = element.innerHTML;
  const split = new SplitText(element, {
    type: "lines,chars",
    linesClass: "split-line",
    charsClass,
  });
  if (keepIndent && split.lines.length)
    restoreLeadingSpace(html, split.lines[0], split.lines[0].firstChild);
  maskLines(split.lines);
  gsap.set(split.lines, { y: "100%" });
  gsap.set(split.chars, { color: DIM_WHITE });
  return split;
}

/** Dimmed characters without line masks (mobile variant). */
export function splitDimChars(element, charsClass, { keepIndent = false } = {}) {
  const html = element.innerHTML;
  const split = new SplitText(element, { type: "chars", charsClass });
  if (keepIndent && split.chars.length)
    restoreLeadingSpace(html, split.chars[0].parentNode, split.chars[0]);
  gsap.set(split.chars, { color: DIM_WHITE });
  return split;
}

/** Characters start invisible and are typed in with `typeIn()`. */
export function splitTypewriter(element) {
  const split = new SplitText(element, { type: "chars", charsClass: "tw-char" });
  gsap.set(split.chars, { opacity: 0 });
  return split;
}

/** Tween vars that type characters in one after another. */
export function typeIn(stagger) {
  return {
    keyframes: [
      { opacity: 0.4, duration: 0.06, ease: "none" },
      { opacity: 1, duration: 0.18, ease: "power1.out" },
    ],
    stagger,
  };
}

/** Tween vars that brighten dimmed characters one after another. */
export const BRIGHTEN = { color: WHITE, duration: 0.08, ease: "none", stagger: 0.008 };
