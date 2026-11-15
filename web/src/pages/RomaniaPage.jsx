/**
 * Route: /romania
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

export default function RomaniaPage() {
  return (
    <>
      <title>7 Day Mystic Mountain Retreat in Romania</title>
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
                        7 Day Mystic Mountain Retreat in Romania
                      </div>
                    </li>
                  </ul>
                  <div className="h2 mobile-no-br line-height-100">
                    7 Day Mystic Mountain Retreat in Romania
                  </div>
                </div>
                <MobileSlider className="retreat-page-intro__photos" preset="photos">
                  <img
                    src="/images/romania-photo-1.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/romania-photo-2.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/romania-photo-3.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/romania-photo-4.webp"
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
                      Vipassana meditation, also known as insight meditation, is an ancient
                      technique that focuses on developing deep self-awareness and understanding of
                      the true nature of reality. <br />
                      <br />
                      It involves observing sensations, thoughts, and emotions in a non-reactive
                      way, fostering clarity and mindfulness. By practicing Vipassana, individuals
                      aim to see things as they truly are, gaining insight into impermanence,
                      suffering, and the nature of the mind, ultimately leading to inner peace and
                      liberation from mental conditioning.
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
                            <span className="body-md">7 daily delicious and nutritious meals</span>
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
                      Eqylife Center specializes in organizing silent retreats, providing a serene
                      and peaceful <br />
                      environment for individuals seeking inner reflection, relaxation, and personal
                      growth. <br />
                      The center offers a tranquil space away from the noise and distractions of
                      everyday life, <br />
                      allowing students to disconnect, find stillness, and explore their inner
                      selves.
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
                        <div className="body-lg">05:00</div>
                        <div className="body-md color-white-40">
                          Morning wake-up bell, <br />
                          Meditate in the hall
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">07:00</div>
                        <div className="body-md color-white-40">Breakfast break</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">10:00</div>
                        <div className="body-md color-white-40">
                          Meditate in the hall <br />
                          according to the teacher's instructions
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">13:30</div>
                        <div className="body-md color-white-40">
                          Rest and interviews with the teacher
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">16:00</div>
                        <div className="body-md color-white-40">
                          Meditate in the hall according to the teacher's instructions
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">20:00</div>
                        <div className="body-md color-white-40">
                          Retire to your own room - Lights out
                        </div>
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
                      At the Eqylife Center, we take immense pride in our vegetarian kitchen, a
                      place where <br />
                      food becomes a culinary art, and healthy eating lies at the heart of all we
                      do. Here, food <br />
                      is not only about satiating hunger but also nourishing the body and mind.
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
                        src="/images/photo-1-4.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-2-3.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-3-3.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-4-3.webp"
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
                          <div className="body-lg">Julien Lefèvre</div>
                          <div className="body-sm">Meditation Coach</div>
                        </div>
                        <div className="retreat-page-team__body">
                          <div className="body-md-regular color-white-60">
                            I teach meditation as a practical skill for focus, emotional regulation,
                            and mental clarity. My sessions are simple and structured, suitable for
                            both beginners and experienced practitioners. <br />
                            <br />I focus on techniques that can be integrated into daily routines
                            and professional life without isolating meditation from reality.
                          </div>
                        </div>
                      </div>
                      <div className="retreat-page-team__column">
                        <div className="retreat-page-team__visual">
                          <img
                            src="/images/coach-5.webp"
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
                        Eqylife Str. Nistoresti nr. 143, Măgura 137038, Romania
                      </div>
                    </div>
                    <div className="width-625">
                      <div className="body-md-regular color-white-60">
                        Located in Magura, Dambovita county, the EqyLife Center benefits from its
                        unique surroundings and proximity to Targoviste, offering a special blend of
                        natural beauty, historical charm, and convenient amenities. <br />
                        <br />
                        Here's a description of what makes the location and neighborhood special,
                        along with some highlights of what visitors can find nearby:
                      </div>
                    </div>
                    <img
                      src="/images/romania-location-photo.webp"
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
                        <div className="h4">$1,000</div>
                      </div>
                    </div>
                    <div className="retreat-page-info__details">
                      <div className="retreat-page-info-detail location">
                        <div className="body-sm">Gura Humorului, Romania</div>
                      </div>
                      <div className="retreat-page-info-detail calendar">
                        <div className="body-sm">
                          Feb 15 - 21, 2026{" "}
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
            retreats={["tuscany", "morocco-photo"]}
          />
        </div>
      </SectionSpyProvider>
    </>
  );
}
