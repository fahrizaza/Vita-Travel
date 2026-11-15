/**
 * Single place where GSAP plugins are registered. Import gsap and its plugins from here so the
 * registration always happens before use.
 */
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

export { gsap, ScrollSmoother, ScrollToPlugin, ScrollTrigger, SplitText, useGSAP };
