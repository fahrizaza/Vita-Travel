/**
 * Route: /morocco-photo
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

export default function MoroccoPhotoPage() {
  return (
    <>
      <title>Photography Retreat &amp; Tour in Magical Morocco</title>
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
                        Photography Retreat &amp; Tour in Magical Morocco
                      </div>
                    </li>
                  </ul>
                  <div className="h2 mobile-no-br line-height-100">
                    Photography Retreat &amp; Tour in Magical Morocco
                  </div>
                </div>
                <MobileSlider className="retreat-page-intro__photos" preset="photos">
                  <img
                    src="/images/morocco-photo-photo-1.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/morocco-photo-photo-2.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/morocco-photo-photo-3.webp"
                    loading="lazy"
                    alt=""
                    className="retreat-page-intro__photo"
                  />
                  <img
                    src="/images/morocco-photo-photo-4.webp"
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
                      Calling all photographers, this retreat will give plenty of opportunity for
                      landscape, street, still life, and wildlife, and so much more. It's an
                      opportunity to make memories that are life lasting. <br />
                      Please join me on this magical photography adventure through Morocco.
                    </div>
                  </div>
                  <div className="retreat-page-content-item">
                    <div className="h4">What's Included In This Package</div>
                    <div className="retreat-page-content-item__included mobile-column-1">
                      <div className="retreat-page-content-item__included-column">
                        <div className="retreat-page-content-item__advantages-item accomodation">
                          <div className="body-md">
                            <span className="body-md">14 Nights Accommodation</span>
                          </div>
                        </div>
                        <div className="retreat-page-content-item__advantages-item meals">
                          <div className="body-md">
                            <span className="body-md">15 daily delicious and nutritious meals</span>
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
                      Take this opportunity to grow as a photographer and take time to edit and
                      perfect your <br />
                      photos among like-minded people and peers. Your passionate host is here to
                      guide and <br />
                      encourage along the way.
                    </div>
                  </div>
                  <div id="full-program" className="retreat-page-content-item">
                    <div className="h4">Full Program</div>
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
                          Arrival in Casablanca or Marrakech
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 2</div>
                        <div className="body-md color-white-40">Marrakech Guided Tour</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 3</div>
                        <div className="body-md color-white-40">Marrakech Free Day</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 4</div>
                        <div className="body-md color-white-40">Marrakech To Essaouira</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 5</div>
                        <div className="body-md color-white-40">Essaouira back to Marrakech</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 6</div>
                        <div className="body-md color-white-40">
                          Marrakech To Dades Valley via Kasbah Ait Benhaddou
                        </div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 7-8</div>
                        <div className="body-md color-white-40">Dades Valley To Sahara Desert</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 9-10</div>
                        <div className="body-md color-white-40">Sahara Desert To Fes</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 11-12</div>
                        <div className="body-md color-white-40">Fes to Chefchaouen</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 13</div>
                        <div className="body-md color-white-40">Chefchaouen at leisure</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 14</div>
                        <div className="body-md color-white-40">Travel to Casablanca</div>
                      </div>
                      <div className="retreat-page-content-item-calendar__item">
                        <div className="body-lg">Day 15</div>
                        <div className="body-md color-white-40">
                          Transfer to the airport at your flight time.
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
                      Moroccan food is rich, diverse, and packed with bold flavors, influenced by
                      the <br />
                      country's varied landscapes, history, and cultures.
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
                        src="/images/photo-1-5.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-2-4.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-3-4.webp"
                        loading="lazy"
                        alt=""
                        className="retreat-page-content-item__photo"
                      />
                      <img
                        src="/images/photo-4-4.webp"
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
                          <div className="body-lg">Matteo Conti</div>
                          <div className="body-sm">Transformational Retreat Guide</div>
                        </div>
                        <div className="retreat-page-team__body">
                          <div className="body-md-regular color-white-60">
                            I guide retreats focused on personal clarity, reflection, and
                            intentional change. My work combines structured sessions, nature-based
                            practices, and group processes. I support participants in slowing down,
                            reassessing <br />
                            priorities, and reconnecting with their inner direction.
                          </div>
                        </div>
                      </div>
                      <div className="retreat-page-team__column">
                        <div className="retreat-page-team__visual">
                          <img
                            src="/images/coach-3.webp"
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
                      <div className="body-md-regular">Morocco</div>
                    </div>
                    <div className="width-625">
                      <div className="body-md-regular color-white-60">
                        Morocco is a country in North Africa with a mountainous interior, Atlantic
                        and Mediterranean coastlines, and a rich history and culture. <br />
                        Beautiful landscape, friendly inviting people and a great place to
                        experience a diverse culture.
                      </div>
                    </div>
                    <img
                      src="/images/photo-location.webp"
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
                        <div className="h4">$5,575</div>
                      </div>
                    </div>
                    <div className="retreat-page-info__details">
                      <div className="retreat-page-info-detail location">
                        <div className="body-sm">Province of Grosseto, Tuscany, Italy</div>
                      </div>
                      <div className="retreat-page-info-detail calendar">
                        <div className="body-sm">
                          March 06 - 20, 2026{" "}
                          <span className="color-white-60">(15 days, 14 nights)</span>
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
          <FeaturedSection seeAll title="You may also like" retreats={["morocco", "portugal"]} />
        </div>
      </SectionSpyProvider>
    </>
  );
}
