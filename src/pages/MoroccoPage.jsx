/**
 * Route: /morocco
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

export default function MoroccoPage() {
  return (
    <>
      <title>Morocco Holiday &amp; Desert Moon</title>
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
                      <div className="title-xs color-white">Morocco Holiday &amp; Desert Moon</div>
                    </li>
                  </ul>
                  <div className="h2 mobile-no-br line-height-100">
                    Morocco Holiday &amp; Desert Moon
                  </div>
                </div>
                <MobileSlider className="retreat-page-intro__photos" preset="photos">
                  <img
                    src="/images/morocco-photo-1.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/morocco-photo-2.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/morocco-photo-3.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/morocco-photo-4.webp"
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
                      Have you ever experienced the most absolute silence, so deep that it
                      penetrates your very soul? <br />
                      You have the chance to live this all-encompassing experience with us and the
                      nomads of the Sahara Desert. Practice Surya Namaskar on waking up as the sun
                      rises over the towering sand dunes, sit in silence, eyes closed, and listen to
                      the breath of the desert.
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
                      There is a peaceful silence, when the desert dispenses its coolness in the
                      evening, <br />
                      giving us the impression that we have now reached the quiet harbor and the
                      sails are <br />
                      lowered. <br />
                      There is the silence of the noontime, when under the beating sun, thoughts and{" "}
                      <br />
                      movements cease" And there is the deep silence, when at night we hold our
                      breath and <br />
                      eavesdrop.
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
                      Experience the Magic of Morocco: 15-Day Tour of Cities, Culture, and <br />
                      Nature and Photography
                    </div>
                  </div>
                  <div className="retreat-page-content-item">
                    <div className="body-xl">Sample Daily Schedule</div>
                    <div className="retreat-page-content-item-calendar">
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 1</div>
                        <div className="body-md color-white-40">
                          Reception at Marrakech <br />
                          airport.
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 2</div>
                        <div className="body-md color-white-40">
                          Morning departure from Marrakech for M'hamid.
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 3</div>
                        <div className="body-md color-white-40">
                          Departure from the fixed bivouac with the nomadic team.
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 4-5</div>
                        <div className="body-md color-white-40">
                          Today our destination will be Zmila. On the way to the magnificent howling
                          dunes of Erg Zahar!
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 6</div>
                        <div className="body-md color-white-40">
                          We wake up as the sun rises and leave the Erg Zahar to <br />
                          head towards the Erg Ait <br />
                          Outnir.
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 7</div>
                        <div className="body-md color-white-40">
                          Return through the landscapes of the Draa Valley to reach the M'hamid
                          civilization.
                        </div>
                      </div>
                    </div>
                    <div className="body-md-regular color-white-60">
                      We will spend the first night here in a permanent camp run by nomads. <br />
                      Each morning we will do an Asana, Pranayama, and Meditation practice. <br />
                      We will then walk into the desert following the pace dictated by the camels'
                      gait. <br />
                      The nomads will take care of us, cook our meals, and carry our luggage on the
                      camels. <br />
                      There will be many opportunities to practice silence and meditation. <br />
                      The Sahara is a place of peace and transformation
                    </div>
                  </div>
                  <div id="food" className="retreat-page-content-item">
                    <div className="body-xl">Food</div>
                    <div className="body-md-regular color-white-60">
                      Food will be vegetarian and vegan options cooked by the nomads. <br />
                      All daily meals are included in the package. It is amazing how our friends the
                      Nomads <br />
                      are able to cook such delicious meals in the middle of the desert. They are
                      even able to <br />
                      bake the bread in the hot sand, they are amazing and everything taste so
                      delicious.
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
                        src="/images/photo-1-6.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-2-5.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-3-5.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-4-5.webp"
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
                      <div className="body-md-regular">Marrakesh, Marrakesh-Safi, Morocco</div>
                    </div>
                    <div className="width-625">
                      <div className="body-md-regular color-white-60">
                        We will spend thefirst and last night in the beautiful city of Marrakech,
                        with its famous medina. The other nights we will be on journeys accompanied
                        by nomads from the Sahara desert. Each night they will set up camp and we
                        will sleep in traditional <br />
                        Berber tents made of camel hair, which are large and comfortable.
                      </div>
                    </div>
                    <img
                      src="/images/morocco-location-photo.webp"
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
                        <div className="body-sm">Marrakesh, Marrakesh-Safi, Morocco</div>
                      </div>
                      <div className="retreat-page-info-detail calendar">
                        <div className="body-sm">
                          April 12 - 20, 2026{" "}
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
          <FeaturedSection seeAll title="You may also like" retreats={["portugal", "bali"]} />
        </div>
      </SectionSpyProvider>
    </>
  );
}
