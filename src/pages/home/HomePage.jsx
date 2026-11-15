import AboutSection from "./AboutSection";
import CombineSection from "./CombineSection";
import DestinationSection from "./DestinationSection";
import FeaturedSection from "../../components/retreats/FeaturedSection";
import HowWorksSection from "./HowWorksSection";
import IntroSection from "./IntroSection";
import PractitionersSection from "./PractitionersSection";
import StatisticSection from "./StatisticSection";

export default function HomePage() {
  return (
    <>
      <title>Vita Travel</title>
      <IntroSection />
      <StatisticSection />
      <AboutSection />
      <FeaturedSection
        title={
          <>
            Featured <span className="mobile-fw">Retreats</span>
          </>
        }
        retreats={["romania", "tuscany", "morocco-photo", "morocco", "portugal", "bali"]}
      />
      <CombineSection />
      <DestinationSection />
      <HowWorksSection />
      <PractitionersSection />
    </>
  );
}
