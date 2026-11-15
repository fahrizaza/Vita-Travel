/**
 * Route: /bali
 */

import FeaturedSection from "../components/retreats/FeaturedSection";
import SectionNav from "../components/section-nav/SectionNav";
import SectionSpyProvider from "../components/section-nav/SectionSpyProvider";
import Button from "../components/ui/Button";
import MobileSlider from "../components/ui/MobileSlider";

const SECTION_LINKS = [
  { target: "about", label: "About Retreats" },
  { target: "full-program", label: "Full Program" },
  { target: "food", label: "Food" },
  { target: "team", label: "Team" },
  { target: "location", label: "Location" },
];

export default function BaliPage() {
  return (
    <>
      <title>7 Day Solo Travelers Retreat: Fun in Bali</title>
      <SectionSpyProvider links={SECTION_LINKS}>
        <div className="page-padding">
          <div className="retreat-page-intro padding-global">
            <div className="container">
              <div className="retreat-page-intro__in">
                <div className="retreat-page-intro__head">
                  <ul role="list" className="breadcrumbs">
                    <li className="breadcrumbs__item">
                      <div className="title-xs color-white-40">Home</div>
                    </li>
                    <li className="breadcrumbs__item">
                      <div className="title-xs color-white">
                        7 Day Solo Travelers Retreat: Fun in Bali
                      </div>
                    </li>
                  </ul>
                  <div className="h2 mobile-no-br line-height-100">
                    7 Day Solo Travelers Retreat: Fun in Bali
                  </div>
                </div>
                <MobileSlider className="retreat-page-intro__photos" preset="photos">
                  <img
                    src="/images/bali-photo-1.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/bali-photo-2.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/bali-photo-3.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/bali-photo-4.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                </MobileSlider>
              </div>
            </div>
          </div>
          <div className="retreat-page-content">
            <div className="container">
              <div className="retreat-page-content__in">
                <div className="retreat-page-content__description">
                  <SectionNav className="retreat-page-info__nav mobile-visible" />
                  <div id="about" className="retreat-page-content-item">
                    <div className="h4">About Retreats</div>
                    <div className="body-md-regular color-white-60">
                      Firefly Retreat Bali is located just a 25-minute walk from Ubud’s bustling
                      main street, offering a peaceful sanctuary away from the crowds while still
                      being close enough to explore the town’s vibrant cultural <br />
                      attractions.
                      <br />
                      Surrounded by lush rice paddies, tropical forests, and tranquil villages, the
                      retreat provides the perfect setting <br />
                      for relaxation, reflection, and rejuvenation. The serene natural environment
                      is ideal for your yoga practice and wellness journey.
                    </div>
                  </div>
                  <div className="retreat-page-content-item">
                    <div className="h4">What's Included In This Package</div>
                    <div className="retreat-page-content-item__included mobile-column-1">
                      <div className="retreat-page-content-item__included-column">
                        <div className="retreat-page-content-item__advantages-item accomodation">
                          <div className="body-md">
                            <span className="body-md">6 nights accommodation</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item meals">
                          <div className="body-md">
                            <span className="body-md">Chocolate making class, cooking class</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item tea">
                          <div className="body-md">
                            <span className="body-md">Herbal drink-making class</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item meditation">
                          <div className="body-md">
                            <span className="body-md">Meeting other solo travelers</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item workshops">
                          <div className="body-md">
                            <span className="body-md">Initial health check-up</span>
                          </div>
                        </div>
                      </div>
                      <div className="retreat-page-content-item__included-column">
                        <div className="retreat-page-content-item__advantages-item integration-icon">
                          <div className="body-md">
                            <span className="body-md">
                              Three integration sessions during the retreat
                            </span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item optional">
                          <div className="body-md">
                            <span className="body-md">Optional sessions with ancestral tools</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item integration">
                          <div className="body-md">
                            <span className="body-md">Post retreat online integration</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item support">
                          <div className="body-md">
                            <span className="body-md">
                              Pre and post retreat support from our team
                            </span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item wifi">
                          <div className="body-md">
                            <span className="body-md">Wifi connection</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="retreat-page-content-item">
                    <div className="h4">What Makes This Retreat Special</div>
                    <div className="body-md-regular color-white-60">
                      Firefly Retreat Bali offers a unique experience by blending affordability with
                      a <br />
                      welcoming, community-driven atmosphere. It's not a luxurious resort or a
                      strict ashram <br />
                      but rather a warm, budget-friendly destination where guests can relax and
                      enjoy <br />
                      enriching activities without the pressure of formality. Located just a
                      25-minute walk from <br />
                      Ubud's main street, the retreat is surrounded by nature, offering a perfect
                      setting for <br />
                      yoga, meditation, and connection with Balinese culture.
                    </div>
                  </div>
                  <div id="full-program" className="retreat-page-content-item">
                    <div className="h4">Full Program</div>
                    <div className="retreat-page-content-item__time">
                      <div className="retreat-page-content-item__time-from">
                        <span className="color-white-40">Check-in: </span>
                        6:00 PM
                      </div>
                      <div className="retreat-page-content-item__time-to">
                        <span className="color-white-40">Check-out: </span>
                        4:00 PM
                      </div>
                    </div>
                    <div className="body-md-regular color-white-60">
                      We are also a magical programme if you simply wish to deepen your knowledge
                      and <br />
                      experience of natural health practices and living abundantly and positively -
                      and <br />
                      crucially - feeling empowered to take that awareness back out into your daily
                      life. We <br />
                      have daily wellness workshops and table talks around nutrition and healthy
                      living which <br />
                      are always very popular and informative.
                    </div>
                  </div>
                  <div className="retreat-page-content-item">
                    <div className="body-xl">Sample Daily Schedule</div>
                    <div className="retreat-page-content-item-calendar">
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 1</div>
                        <div className="body-md color-white-40">
                          Arrival and settle in, First <br />
                          meeting and introduction
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 2</div>
                        <div className="body-md color-white-40">
                          Sunrise Yoga, &nbsp;Morning walk and introduction to Balinese natural
                          medicines
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 3</div>
                        <div className="body-md color-white-40">
                          Balinese Excursion OR <br />
                          Sound Healing At Pyramids <br />
                          Of Chi
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 4</div>
                        <div className="body-md color-white-40">
                          Sunrise yoga, Cooking class, Jamu making
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 5-6</div>
                        <div className="body-md color-white-40">
                          Herbal remedies tasting, Chocolate making
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 7</div>
                        <div className="body-md color-white-40">Departure</div>
                      </div>
                    </div>
                  </div>
                  <div id="food" className="retreat-page-content-item">
                    <div className="body-xl">Food</div>
                    <div className="body-md-regular color-white-60">
                      During the retreat, all meals are thoughtfully crafted to nourish both body
                      and mind.
                    </div>
                    <div className="retreat-page-content-item__included mobile-column-2">
                      <div className="retreat-page-content-item__included-column">
                        <div className="body-lg">Meals Provided</div>
                        <div className="retreat-page-content-item__advantages-item checkmark">
                          <div className="body-md">
                            <span className="body-md">Breakfast</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item checkmark">
                          <div className="body-md">
                            <span className="body-md">Lunch</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item checkmark">
                          <div className="body-md">
                            <span className="body-md">Dinner</span>
                          </div>
                        </div>
                      </div>
                      <div className="retreat-page-content-item__included-column">
                        <div className="body-lg">Diets Catered</div>
                        <div className="retreat-page-content-item__advantages-item checkmark">
                          <div className="body-md">
                            <span className="body-md">Dairy-free</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item checkmark">
                          <div className="body-md">
                            <span className="body-md">Vegan</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item checkmark">
                          <div className="body-md">
                            <span className="body-md">Vegetarian</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item checkmark">
                          <div className="body-md">
                            <span className="body-md">Diabetic-friendly</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="retreat-page-content-item__photos margin-top-40 mobile-margin-top-16">
                      <img
                        src="/images/photo-1-8.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-2-7.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-3-7.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/bali-photo-4-5.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                    </div>
                  </div>
                  <div id="team" className="retreat-page-content-item">
                    <div className="body-xl">Team</div>
                    <div className="retreat-page-team">
                      <div className="retreat-page-team__column padding-left-0">
                        <div className="retreat-page-team__head">
                          <div className="body-lg">David Schneider</div>
                          <div className="body-sm">Nature Retreat Guide</div>
                        </div>
                        <div className="retreat-page-team__body">
                          <div className="body-md-regular color-white-60">
                            I design and guide retreats centered around <br />
                            nature, walking practices, and quiet observation.
                            <br />
                            <br />
                            My work uses natural environments as a space for reflection and mental
                            reset. I support participants <br />
                            in reconnecting with simplicity, presence, and physical awareness
                            through structured outdoor experiences.
                          </div>
                        </div>
                      </div>
                      <div className="retreat-page-team__column">
                        <div className="retreat-page-team__visual">
                          <img
                            src="/images/coach-6.webp"
                            loading="lazy"
                            alt=""
                            className="retreat-page-team__photo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="location" className="retreat-page-content-item">
                    <div className="h4">Where we’ll meet</div>
                    <div className="retreat-page-location">
                      <div className="body-md-regular">Ubud, Bali, Indonesia</div>
                    </div>
                    <div className="width-625">
                      <div className="body-md-regular color-white-60">
                        At Firefly Retreat Bali, everyone begins their journey together on Sunday,
                        creating an instant sense of connection and belonging. <br />
                        This shared arrival makes it easy for solo travelers to meet like-minded
                        people and form genuine friendships right from the start.
                      </div>
                    </div>
                    <img
                      src="/images/photo-illustration.webp"
                      loading="lazy"
                      alt=""
                      className="img-fw mobile-square"
                    />
                  </div>
                  <div className="retreat-page-content-item">
                    <div className="body-xl mobile-font-size-22">
                      What's <span className="color-orange">Not Included</span> In This Package
                    </div>
                    <div className="retreat-page-content-item__included mobile-column-1">
                      <div className="retreat-page-content-item__included-column">
                        <div className="retreat-page-content-item__advantages-item decline">
                          <div className="body-md">
                            <span className="body-md">Airport transfers</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item decline">
                          <div className="body-md">
                            <span className="body-md">Flights costs</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item decline">
                          <div className="body-md">
                            <span className="body-md">Travel insurance</span>
                          </div>
                        </div>
                      </div>
                      <div className="retreat-page-content-item__included-column">
                        <div className="retreat-page-content-item__advantages-item decline">
                          <div className="body-md">
                            <span className="body-md">Visa fee</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item decline">
                          <div className="body-md">
                            <span className="body-md">Additional treatments</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item decline">
                          <div className="body-md">
                            <span className="body-md">Additional activities not included</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="retreat-page-content__sidebar">
                  <div className="retreat-page-info">
                    <div className="retreat-page-info__head">
                      <div className="retreat-page-info__headline">
                        <div className="body-xl color-white-40 mobile-font-size-22">from</div>
                        <div className="h4">$406</div>
                      </div>
                    </div>
                    <div className="retreat-page-info__details">
                      <div className="retreat-page-info-detail location">
                        <div className="body-sm">Ubud, Bali, Indonesia</div>
                      </div>
                      <div className="retreat-page-info-detail calendar">
                        <div className="body-sm">
                          Jan | Feb | Mar | Apr | May{" "}
                          <span className="color-white-60">(7 days, 6 nights)</span>
                        </div>
                      </div>
                      <div className="retreat-page-info-detail users">
                        <div className="body-sm">Solo</div>
                      </div>
                    </div>
                    <div className="retreat-page-info__divider mobile-hidden" />
                    <div className="retreat-page-info__button mobile-visible">
                      <Button kind="primary" variant="full-width-mobile" to="/contacts">
                        Get in touch
                      </Button>
                    </div>
                    <SectionNav className="retreat-page-info__nav mobile-hidden" />
                    <div className="retreat-page-info__button mobile-hidden">
                      <Button kind="primary" to="/contacts">
                        Get in touch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FeaturedSection title="You may also like" retreats={["romania", "tuscany"]} />
        </div>
      </SectionSpyProvider>
    </>
  );
}
