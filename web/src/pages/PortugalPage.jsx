/**
 * Route: /portugal
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

export default function PortugalPage() {
  return (
    <>
      <title>8 Day Juice Detox, Retreat in Portugal</title>
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
                        8 Day Juice Detox, Retreat in Portugal
                      </div>
                    </li>
                  </ul>
                  <div className="h2 mobile-no-br line-height-100">
                    8 Day Juice Detox, Retreat in Portugal
                  </div>
                </div>
                <MobileSlider className="retreat-page-intro__photos" preset="photos">
                  <img
                    src="/images/portugal-photo-1.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/portugal-photo-2.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/portugal-photo-3.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/portugal-photo-4.webp"
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
                      For over three decades, we’ve helped thousands rediscover balance, vitality,
                      and peace through the simple, powerful practice of juice fasting. <br />
                      As one of the world’s first dedicated juice fasting retreats, and named by The
                      Sunday Times among the Top 10 Detox Retreats Worldwide,we combine deep
                      expertise with genuine care to guide you on a truly <br />
                      transformative wellness journey.
                    </div>
                  </div>
                  <div className="retreat-page-content-item">
                    <div className="h4">What's Included In This Package</div>
                    <div className="retreat-page-content-item__included mobile-column-1">
                      <div className="retreat-page-content-item__included-column">
                        <div className="retreat-page-content-item__advantages-item accomodation">
                          <div className="body-md">
                            <span className="body-md">7 nights accommodation</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item meals">
                          <div className="body-md">
                            <span className="body-md">3 daily delicious and nutritious meals</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item tea">
                          <div className="body-md">
                            <span className="body-md">
                              Lemon water and herbal teas which you can take freely all day
                            </span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item meditation">
                          <div className="body-md">
                            <span className="body-md">Daily meditation classes</span>
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
                              Personal use of colonic cleansing equipment when indicated
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
                      Our yoga classes are accessible to all - whether you are a beginner or
                      seasoned yogi <br />
                      our skilled teachers can guide you through an enriching and relaxing practice
                      that <br />
                      supports your detox.
                      <br />
                      Yoga is a fundamental part of our programme because the combination of gentle{" "}
                      <br />
                      moving, stretching, and twisting together with deep breathing, significantly
                      helps the <br />
                      detox process for body, mind and spirit. The lymph and blood transporting the
                      released <br />
                      toxins are pumped through the body at a faster rate, speeding up the
                      elimination <br /> process.
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
                        <div className="body-lg">05:00</div>
                        <div className="body-md color-white-40">Wake up,lemon tea</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">07:00</div>
                        <div className="body-md color-white-40">Yoga</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">10:00</div>
                        <div className="body-md color-white-40">
                          Orange juice, therapies or <br />
                          free time
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">13:30</div>
                        <div className="body-md color-white-40">Fruit or vegetable juice</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">16:00</div>
                        <div className="body-md color-white-40">
                          Vegetable juice &amp; nutrition workshop
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">20:00</div>
                        <div className="body-md color-white-40">
                          Mixed vegetable broth – mineral rich
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="food" className="retreat-page-content-item">
                    <div className="body-xl">Food</div>
                    <div className="body-md-regular color-white-60">
                      To keep you attuned to nature, our juices and broths are prepared in
                      accordance with <br />
                      the season and also we ensure that across the retreat you have variety and a
                      range of <br />
                      vitamins and minerals to replenish and cleanse your nervous system.
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
                            <span className="body-md">Raw</span>
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
                      </div>
                    </div>
                    <div className="retreat-page-content-item__photos margin-top-40 mobile-margin-top-16">
                      <img
                        src="/images/photo-1-7.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-2-6.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-3-6.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-4-6.webp"
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
                          <div className="body-lg">Sarah Johnson</div>
                          <div className="body-sm">Nutrition Specialist</div>
                        </div>
                        <div className="retreat-page-team__body">
                          <div className="body-md-regular color-white-60">
                            I support retreat participants with nutrition that is simple,
                            nourishing, and adapted to real needs. My work focuses on whole foods,
                            energy balance, <br />
                            and practical eating habits that support focus and recovery. <br />
                            <br />I help people understand how nutrition affects <br />
                            their physical and mental state, without strict rules or unnecessary
                            restrictions, and with respect for individual lifestyles.
                          </div>
                        </div>
                      </div>
                      <div className="retreat-page-team__column">
                        <div className="retreat-page-team__visual">
                          <img
                            src="/images/coach-10.webp"
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
                      <div className="body-md-regular">
                        R. Moinhos Velhos 3, 8600-077 Lagos, Portugal
                      </div>
                    </div>
                    <div className="width-625">
                      <div className="body-md-regular color-white-60">
                        Nestled in a secluded valley with an abundance of quartz crystal naturally
                        embedded in the Earth, Moinhos Velhos is in equal parts beautiful,
                        energising and regenerative! Here we wake up to the creative life force of
                        nature and the songs of the birds in the morning and retire with the silence
                        of the stars at night.
                      </div>
                    </div>
                    <img
                      src="/images/location-illustration.webp"
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
                        <div className="h4">$3,829</div>
                      </div>
                    </div>
                    <div className="retreat-page-info__details">
                      <div className="retreat-page-info-detail location">
                        <div className="body-sm">R. Moinhos Velhos 3, 8600-077 Lagos, Portugal</div>
                      </div>
                      <div className="retreat-page-info-detail calendar">
                        <div className="body-sm">
                          Feb 06 - 14, 2026{" "}
                          <span className="color-white-60">(8 days, 7 nights)</span>
                        </div>
                      </div>
                      <div className="retreat-page-info-detail users">
                        <div className="body-sm">12 guests</div>
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
          <FeaturedSection seeAll title="You may also like" retreats={["bali", "romania"]} />
        </div>
      </SectionSpyProvider>
    </>
  );
}
