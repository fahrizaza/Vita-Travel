/**
 * Route: /retreat
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

export default function TuscanyPage() {
  return (
    <>
      <title>Retreat</title>
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
                        4 Day Custom Relax Yoga &amp; Outdoor{" "}
                        <span className="mobile-hidden">Retreat in Tuscany, Italy</span>
                      </div>
                    </li>
                  </ul>
                  <div className="h2 mobile-no-br line-height-100">
                    4 Day Custom Relax Yoga &amp; Outdoor <br />
                    Retreat in Tuscany, Italy
                  </div>
                </div>
                <MobileSlider className="retreat-page-intro__photos" preset="photos">
                  <img
                    src="/images/retreat-photo-1.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/retreat-photo-2.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/retreat-photo-3.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/retreat-photo-4.webp"
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
                      In the wonderful Maremma, enjoy a revitalizing relaxing journey together with
                      Paula and Erico. In a quiet environment in the middle of the countryside, this
                      is a customized private or small group yoga retreat with optional guided
                      outdoor or cultural activities. <br />
                      <br />
                      Paula will prepare a specific yoga and food program tailored to your needs.
                      She is an expert guide who accompanies you from your starting point to
                      achieving your goals.
                      <br />
                      Maremma is rich in culture and different natural environments. Ideal for those
                      seeking tranquility, nature, culture, and good healthy food. <br />
                      This retreat is suitable for all levels and ages and you can choose your own
                      arrival date.
                    </div>
                  </div>
                  <div className="retreat-page-content-item">
                    <div className="h4">What's Included In This Package</div>
                    <div className="retreat-page-content-item__included mobile-column-1">
                      <div className="retreat-page-content-item__included-column">
                        <div className="retreat-page-content-item__advantages-item accomodation">
                          <div className="body-md">
                            <span className="body-md">3 Nights Accommodation</span>
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
                              Water, tea, coffee served throughout the day
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
                            <span className="body-md">Specialized workshops</span>
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
                      Is not just a retreat or yoga holiday is more than that, you will be part of
                      the family. <br />
                      The most important thing for me is to arrive deep into the person, what it
                      looks like with <br />
                      the yoga practice, and the experience in this beautiful land.
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
                      You can come any time of the year. From May to mid-October you can enjoy the
                      sun the <br />
                      sea and the natural environment between meditation walks and excursions.
                    </div>
                  </div>
                  <div className="retreat-page-content-item">
                    <div className="body-xl">Sample Daily Schedule</div>
                    <div className="retreat-page-content-item-calendar">
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">09:00</div>
                        <div className="body-md color-white-40">
                          Breakfast for those not participating
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">12:00</div>
                        <div className="body-md color-white-40">Group integration session</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">14:00</div>
                        <div className="body-md color-white-40">Lunch for non-participants</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">18:30</div>
                        <div className="body-md color-white-40">Afternoon snack</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">20:00</div>
                        <div className="body-md color-white-40">Group preparation session</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">22:00</div>
                        <div className="body-md color-white-40">Nighttime ayahuasca ceremony</div>
                      </div>
                    </div>
                    <div className="body-md-regular color-white-60">
                      You can come any time of the year. From May to mid-October you can enjoy the
                      sun the <br />
                      sea and the natural environment between meditation walks and excursions.{" "}
                      <br />
                      <br />
                      The rest of the year you will go to visit Ancient Medieval Villages in the
                      heart of the <br />
                      Maremma between history and nature. You can enjoy the calm and clean air
                      hiking, <br />
                      walking among the olive trees, and having thermal baths.
                    </div>
                  </div>
                  <div id="food" className="retreat-page-content-item">
                    <div className="body-xl">Food</div>
                    <div className="body-md-regular color-white-60">
                      Erico and Paula have a great passion for good and healthy eating. Paula is a
                      Natural Bio <br />
                      Vegan Chef, she has experience in natural nutrition based on the use of local
                      products.
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
                        <div className="retreat-page-content-item__advantages-item checkmark">
                          <div className="body-md">
                            <span className="body-md">Snacks</span>
                          </div>
                        </div>
                      </div>
                      <div className="retreat-page-content-item__included-column">
                        <div className="body-lg">Diets Catered</div>
                        <div className="retreat-page-content-item__advantages-item checkmark">
                          <div className="body-md">
                            <span className="body-md">Egg-free</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item checkmark">
                          <div className="body-md">
                            <span className="body-md">Gluten Free</span>
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
                        src="/images/photo-1-2.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-2-2.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-3-2.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-4-2.webp"
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
                          <div className="body-lg">Maria Paula Medina</div>
                          <div className="body-sm">Meditation Coach</div>
                        </div>
                        <div className="retreat-page-team__body">
                          <div className="body-md-regular color-white-60">
                            Maria Paula Medina is a certified yoga teacher and she's going to lead
                            this yoga retreat.
                            <br />
                            <br />
                            Yoga formed part of her life from the age of 19, and from there she
                            devoted many hours of study and practice in Argentina, Europe, and India
                            for Hatha and Vinyasa yoga.
                          </div>
                        </div>
                      </div>
                      <div className="retreat-page-team__column">
                        <div className="retreat-page-team__visual">
                          <img
                            src="/images/photo-1-3.webp"
                            loading="lazy"
                            alt=""
                            className="retreat-page-team__photo"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="retreat-page-team">
                      <div className="retreat-page-team__column padding-left-0">
                        <div className="retreat-page-team__head">
                          <div className="body-lg">Alex Axinte</div>
                          <div className="body-sm">Facilitator</div>
                        </div>
                        <div className="retreat-page-team__body">
                          <div className="body-md-regular color-white-60">
                            My journey into the world of inner transformation began eight years ago,
                            when life invited me to radically shift paths.
                            <br />
                            <br />
                            After my divorce, I found myself raising my one-year-old daughter on my
                            own — a moment that became both a challenge and a deep calling. I knew
                            that in order to show up fully for her, I had to change myself first.
                          </div>
                        </div>
                      </div>
                      <div className="retreat-page-team__column">
                        <div className="retreat-page-team__visual">
                          <img
                            src="/images/photo-2.webp"
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
                        Villa Artemisia <br />
                        Strada Poggetti, 4/B, 58011 Capalbio GR, Italy
                      </div>
                    </div>
                    <div className="width-625">
                      <div className="body-md-regular color-white-60">
                        In a few minutes you can reach and visit Ansedonia and Monte Argentario,
                        Feniglia, Orbetello, and Talamone. The medieval villages of Magliano in
                        Toscana, Sorano, Sovana, and Pitigliano, the thermal baths of Saturnia, the
                        Hermitage of Poggio Conte, the Tarot Garden, and the Maremma Natural Park
                        are some of the beauties not to be missed, and visited.
                      </div>
                    </div>
                    <img
                      src="/images/retreat-illustration.webp"
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
                        <div className="h4">$1,328</div>
                      </div>
                    </div>
                    <div className="retreat-page-info__details">
                      <div className="retreat-page-info-detail location">
                        <div className="body-sm">Province of Grosseto, Tuscany, Italy</div>
                      </div>
                      <div className="retreat-page-info-detail calendar">
                        <div className="body-sm">
                          Jan 15 - 21, 2026{" "}
                          <span className="color-white-60">(7 days, 6 nights)</span>
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
          <FeaturedSection
            seeAll
            title="You may also like"
            retreats={["morocco-photo", "morocco"]}
          />
        </div>
      </SectionSpyProvider>
    </>
  );
}
