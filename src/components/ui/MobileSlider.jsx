import { useIsMobile } from "../../hooks/useMediaQuery";
import Carousel from "./Carousel";

/** Carousel settings the original site used on phones (<= 479px). */
const PRESETS = {
  photos: { infinite: true, dots: true },
  cards: { variableWidth: true },
};

/** Renders its children as a carousel on phones and as a plain container everywhere else. */
export default function MobileSlider({ preset, className, children }) {
  const isMobile = useIsMobile();

  if (!isMobile) return <div className={className}>{children}</div>;
  return (
    <Carousel className={className} {...PRESETS[preset]}>
      {children}
    </Carousel>
  );
}
