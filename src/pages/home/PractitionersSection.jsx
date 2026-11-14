import CoachCard from "../../components/coaches/CoachCard";
import MobileSlider from "../../components/ui/MobileSlider";
import { getCoach } from "../../data/coaches";

export default function PractitionersSection() {
  return (
    <section className="practitioners-section padding-global">
      <div className="practitioners">
        <div className="practitioners__list mobile-hidden">
          <CoachCard coach={getCoach("lauren-thompson")} />
          <CoachCard coach={getCoach("michael-wilson")} />
          <CoachCard coach={getCoach("sarah-johnson")} />
          <CoachCard coach={getCoach("isabelle-martin")} />
          <div className="practitioners-person is-hidden">
            <div
              data-animation="practitioners-illustration-1"
              className="practitioners-person__visual"
            >
              <img
                src="/images/coach-1.webp"
                loading="lazy"
                alt=""
                className="practitioners-person__photo"
              />
              <div className="practitioners-person__text">
                <div data-animation="practitioners-person-title-1" className="body-lg">
                  Lauren Thompson
                </div>
                <div data-animation="practitioners-person-description-1" className="body-sm">
                  Yoga Couch
                </div>
              </div>
            </div>
          </div>
          <div className="practitioners-person is-hidden">
            <div
              data-animation="practitioners-illustration-2"
              className="practitioners-person__visual"
            >
              <img
                src="/images/coach-12.webp"
                loading="lazy"
                alt=""
                className="practitioners-person__photo"
              />
              <div className="practitioners-person__text">
                <div data-animation="practitioners-person-title-2" className="body-lg">
                  Michael Wilson
                </div>
                <div data-animation="practitioners-person-description-2" className="body-sm">
                  Meditation Coach
                </div>
              </div>
            </div>
          </div>
          <div className="practitioners-person is-hidden">
            <div
              data-animation="practitioners-illustration-3"
              className="practitioners-person__visual"
            >
              <img
                src="/images/coach-10.webp"
                loading="lazy"
                alt=""
                className="practitioners-person__photo"
              />
              <div className="practitioners-person__text">
                <div data-animation="practitioners-person-title-3" className="body-lg">
                  Sarah Johnson
                </div>
                <div data-animation="practitioners-person-description-3" className="body-sm">
                  Nutrition Specialist
                </div>
              </div>
            </div>
          </div>
          <div className="practitioners-person is-hidden">
            <div
              data-animation="practitioners-illustration-4"
              className="practitioners-person__visual"
            >
              <img
                src="/images/coach-9.webp"
                loading="lazy"
                alt=""
                className="practitioners-person__photo"
              />
              <div className="practitioners-person__text">
                <div data-animation="practitioners-person-title-4" className="body-lg">
                  Isabelle Martin
                </div>
                <div data-animation="practitioners-person-description-4" className="body-sm">
                  Stress-Relief Guide
                </div>
              </div>
            </div>
          </div>
          <div className="practitioners__dec practitioners__dec--4" />
          <div className="practitioners__dec practitioners__dec--5" />
          <div className="practitioners__dec practitioners__dec--6 is-hidden" />
        </div>
        <MobileSlider className="practitioners__list mobile-visible" preset="cards">
          <div className="practitioners-person">
            <div
              data-animation="practitioners-illustration-1"
              className="practitioners-person__visual"
            >
              <img
                src="/images/coach-1.webp"
                loading="lazy"
                alt=""
                className="practitioners-person__photo"
              />
              <div className="practitioners-person__text">
                <div data-animation="practitioners-person-title-1" className="body-lg">
                  Lauren Thompson
                </div>
                <div data-animation="practitioners-person-description-1" className="body-sm">
                  Yoga Couch
                </div>
              </div>
            </div>
          </div>
          <div className="practitioners-person">
            <div
              data-animation="practitioners-illustration-2"
              className="practitioners-person__visual"
            >
              <img
                src="/images/coach-12.webp"
                loading="lazy"
                alt=""
                className="practitioners-person__photo"
              />
              <div className="practitioners-person__text">
                <div data-animation="practitioners-person-title-2" className="body-lg">
                  Michael Wilson
                </div>
                <div data-animation="practitioners-person-description-2" className="body-sm">
                  Meditation Coach
                </div>
              </div>
            </div>
          </div>
          <div className="practitioners-person">
            <div
              data-animation="practitioners-illustration-3"
              className="practitioners-person__visual"
            >
              <img
                src="/images/coach-10.webp"
                loading="lazy"
                alt=""
                className="practitioners-person__photo"
              />
              <div className="practitioners-person__text">
                <div data-animation="practitioners-person-title-3" className="body-lg">
                  Sarah Johnson
                </div>
                <div data-animation="practitioners-person-description-3" className="body-sm">
                  Nutrition Specialist
                </div>
              </div>
            </div>
          </div>
          <div className="practitioners-person">
            <div
              data-animation="practitioners-illustration-4"
              className="practitioners-person__visual"
            >
              <img
                src="/images/coach-9.webp"
                loading="lazy"
                alt=""
                className="practitioners-person__photo"
              />
              <div className="practitioners-person__text">
                <div data-animation="practitioners-person-title-4" className="body-lg">
                  Isabelle Martin
                </div>
                <div data-animation="practitioners-person-description-4" className="body-sm">
                  Stress-Relief Guide
                </div>
              </div>
            </div>
          </div>
        </MobileSlider>
        <div className="practitioners__text">
          <div className="practitioners__row">
            <div className="head head--column">
              <div data-animation="practitioners-title" className="head__title">
                <img src="/icons/logo-mini.svg" loading="lazy" alt="" className="logo-mini" />
                <div className="body-md">Practitioners &amp; Coaches</div>
              </div>
              <div className="head__description">
                <div data-animation="practitioners-headline" className="h2 mobile-font-size-36">
                  The 200+ faces <br />
                  behind Vita Travel
                </div>
              </div>
            </div>
          </div>
          <div className="practitioners__row padding-top-0">
            <div className="practitioners__items">
              <div className="practitioners-item">
                <img
                  src="/icons/plus.svg"
                  loading="lazy"
                  data-animation="practitioners-plus-1"
                  alt=""
                  className="practitioners-item__icon"
                />
                <div className="practitioners-item__content">
                  <div data-animation="practitioners-item-title-1" className="body-lg">
                    Your Retreat, Our Experts
                  </div>
                  <div
                    data-animation="practitioners-item-description-1"
                    className="body-md color-white-60"
                  >
                    Each coach is carefully selected to <br />
                    deliver the highest quality guidance <br />
                    in yoga, meditation, fitness, and <br />
                    holistic well-being.
                  </div>
                </div>
              </div>
              <div className="practitioners-item">
                <img
                  src="/icons/plus.svg"
                  loading="lazy"
                  data-animation="practitioners-plus-2"
                  alt=""
                  className="practitioners-item__icon"
                />
                <div className="practitioners-item__content">
                  <div
                    data-animation="practitioners-item-description-2"
                    className="body-xl mobile-font-size-22"
                  >
                    At Vita Travel we’ve brought <br />
                    together a global network of <br />
                    200+ certified coaches, <br />
                    practitioners, and wellness <br />
                    experts.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="practitioners__dec practitioners__dec--1" />
        <div className="practitioners__dec practitioners__dec--2" />
        <div className="practitioners__dec practitioners__dec--3" />
      </div>
    </section>
  );
}
