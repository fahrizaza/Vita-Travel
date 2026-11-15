/**
 * Route: /coaches
 */

import CoachCard from "../components/coaches/CoachCard";
import { coaches } from "../data/coaches";

export default function CoachesPage() {
  return (
    <>
      <title>Coaches</title>
      <div className="page-padding">
        <section className="coaches-section padding-global">
          <div className="container">
            <div className="head">
              <div className="row mobile-column">
                <div className="column column-3">
                  <div
                    data-anim="coaches-page-title"
                    className="head__title mobile-margin-bottom-24"
                  >
                    <img src="/icons/logo-mini.svg" loading="lazy" alt="" className="logo-mini" />
                    <div className="body-md">Coaches</div>
                  </div>
                </div>
                <div className="column column-9">
                  <div className="head__description">
                    <div data-anim="coaches-page-headline" className="h2 mobile-font-size-36">
                      Our coaches
                    </div>
                    <div data-anim="coaches-page-description" className="body-xl mobile-no-br">
                      Our fully remote lives, travels, and works all over the world.
                      <br />
                      From India to Indonesia, the Philippines to Portugal, Ukraine to <br />
                      the US; and everywhere else in between.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="coaches">
              {coaches.map((coach) => (
                <CoachCard key={coach.id} coach={coach} />
              ))}
            </div>
          </div>
        </section>
        <section className="how-works-section padding-global">
          <div className="container">
            <div className="head">
              <div className="row align-end mobile-column">
                <div className="column column-6">
                  <div className="head__description mobile-margin-bottom-16">
                    <div data-animation="how-works-headline" className="h2">
                      Our values
                    </div>
                  </div>
                </div>
                <div className="column column-6">
                  <div className="featured-section__head">
                    <div
                      data-animation="how-works-description"
                      className="body-md color-white-60 mobile-no-br"
                    >
                      As a company we’ve been inspired to be a link in the chain of <br />
                      happiness in the world. In order to manifest that inspiration, <br />
                      we strive to embody these
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="how-works">
              <div className="how-works-item size-s">
                <div className="how-works-item__head">
                  <img
                    src="/icons/coaches-icon-5.svg"
                    loading="lazy"
                    alt=""
                    className="how-works-item__icon"
                  />
                  <div className="how-works-item__count">01</div>
                </div>
                <div className="how-works-item__body">
                  <div className="body-md">Honesty</div>
                  <div className="body-md color-white-50 mobile-no-br mobile-body-sm">
                    Having the courage to be <br />
                    transparent in our feelings and <br />
                    what we do
                  </div>
                </div>
              </div>
              <div className="how-works-item size-s">
                <div className="how-works-item__head">
                  <img
                    src="/icons/icon-6.svg"
                    loading="lazy"
                    alt=""
                    className="how-works-item__icon"
                  />
                  <div className="how-works-item__count">02</div>
                </div>
                <div className="how-works-item__body">
                  <div className="body-md">Self-responsibility</div>
                  <div className="body-md color-white-50 mobile-no-br mobile-body-sm">
                    Taking responsibility for our <br />
                    situation in life and not <br />
                    engaging in the blame game
                  </div>
                </div>
              </div>
              <div className="how-works-item size-s">
                <div className="how-works-item__head">
                  <img
                    src="/icons/coaches-icon-7.svg"
                    loading="lazy"
                    alt=""
                    className="how-works-item__icon"
                  />
                  <div className="how-works-item__count">03</div>
                </div>
                <div className="how-works-item__body">
                  <div className="body-md">Kindness</div>
                  <div className="body-md color-white-50 mobile-no-br mobile-body-sm">
                    Show compassion, empathy, <br />
                    and patience to enhance <br />
                    comfort and joy in life.
                  </div>
                </div>
              </div>
              <div className="how-works-item size-s">
                <div className="how-works-item__head">
                  <img
                    src="/icons/coaches-icon-8.svg"
                    loading="lazy"
                    alt=""
                    className="how-works-item__icon"
                  />
                  <div className="how-works-item__count">04</div>
                </div>
                <div className="how-works-item__body">
                  <div className="body-md">Dedication</div>
                  <div className="body-md color-white-50 mobile-no-br mobile-body-sm">
                    Taking on the challenge of the <br />
                    journey and focus upon the <br />
                    vision we want to manifest
                  </div>
                </div>
              </div>
              <div className="how-works-item size-s">
                <div className="how-works-item__head">
                  <img
                    src="/icons/coaches-icon-9.svg"
                    loading="lazy"
                    alt=""
                    className="how-works-item__icon"
                  />
                  <div className="how-works-item__count">05</div>
                </div>
                <div className="how-works-item__body">
                  <div className="body-md">Service</div>
                  <div className="body-md color-white-50 mobile-no-br mobile-body-sm">
                    Placing our gifts and talents at <br />
                    the services of increasing the <br />
                    loving consciousness of the <br />
                    world
                  </div>
                </div>
              </div>
              <div className="how-works-item size-s">
                <div className="how-works-item__head">
                  <img
                    src="/icons/coaches-icon-10.svg"
                    loading="lazy"
                    alt=""
                    className="how-works-item__icon"
                  />
                  <div className="how-works-item__count">06</div>
                </div>
                <div className="how-works-item__body">
                  <div className="body-md">Beauty</div>
                  <div className="body-md color-white-50 mobile-no-br mobile-body-sm">
                    Expressing openly the core <br />
                    essence that inhabits each <br />
                    one of us
                  </div>
                </div>
              </div>
              <div className="how-works-item size-s">
                <div className="how-works-item__head">
                  <img
                    src="/icons/icon-11.svg"
                    loading="lazy"
                    alt=""
                    className="how-works-item__icon"
                  />
                  <div className="how-works-item__count">07</div>
                </div>
                <div className="how-works-item__body">
                  <div className="body-md">
                    <span className="mobile-fw">Human</span> Wellbeing
                  </div>
                  <div className="body-md color-white-50 mobile-no-br mobile-body-sm">
                    In the end, we are all in the <br />
                    business of human wellbeing
                  </div>
                </div>
              </div>
              <div className="how-works-item size-s">
                <div className="how-works-item__head">
                  <img
                    src="/icons/icon-12.svg"
                    loading="lazy"
                    alt=""
                    className="how-works-item__icon"
                  />
                  <div className="how-works-item__count">08</div>
                </div>
                <div className="how-works-item__body">
                  <div className="body-md">Travel &amp; track progress</div>
                  <div className="body-md color-white-50 mobile-no-br mobile-body-sm">
                    Use VITA Journal to reflect <br />
                    and rebook.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
