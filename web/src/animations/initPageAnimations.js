import { initReveal } from "./reveal";
import {
  animateAbout,
  animateCombine,
  animateDestination,
  animateIntro,
  animatePractitioners,
  animateStatistic,
} from "./sections/home";
import {
  animateContactsPage,
  animateCoachesPage,
  animateRetreatPage,
  pinLegalNav,
} from "./sections/pages";
import { animateFeatured, animateFooter, animateHowWorks } from "./sections/shared";

/**
 * Sets up every scroll animation found inside `root`. Each initializer does nothing when its
 * section is not on the current page. Must run inside a gsap context (see usePageAnimations).
 */
export function initPageAnimations(root, options) {
  initReveal(root);
  animateIntro(root, options);
  animateStatistic(root, options);
  animateAbout(root, options);
  animateFeatured(root, options);
  animateCombine(root, options);
  animateDestination(root, options);
  animateHowWorks(root, options);
  animatePractitioners(root, options);
  animateFooter(root, options);
  animateRetreatPage(root, options);
  animateCoachesPage(root, options);
  animateContactsPage(root, options);
  pinLegalNav(root, options);
}
