export default function HowWorksSection() {
  return (
    <section className="how-works-section padding-global">
      <div className="container">
        <div className="head">
          <div className="row align-end mobile-column">
            <div className="column column-6">
              <div className="head__description mobile-margin-bottom-16">
                <div data-animation="how-works-headline" className="h2 mobile-h3">
                  How Vita Works
                </div>
              </div>
            </div>
            <div className="column column-6">
              <div className="featured-section__head">
                <div data-animation="how-works-description" className="body-md color-white-60">
                  Browse certified experts with verified <br />
                  credentials and guest testimonials.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="how-works">
          <div data-animation="how-works-item-1" className="how-works-item">
            <div data-animation="how-works-item-head-1" className="how-works-item__head">
              <img
                src="/icons/home-icon-1.svg"
                loading="lazy"
                alt=""
                className="how-works-item__icon"
              />
              <div className="how-works-item__count">01</div>
            </div>
            <div className="how-works-item__body">
              <div data-animation="how-works-item-title-1" className="body-md">
                <span className="mobile-fw">Tell us your </span>
                goals
              </div>
              <div
                data-animation="how-works-item-description-1"
                className="body-md color-white-50 mobile-no-br"
              >
                Trusted by travelers looking for <br />
                more than ordinary vacations.
              </div>
            </div>
          </div>
          <div data-animation="how-works-item-2" className="how-works-item">
            <div data-animation="how-works-item-head-2" className="how-works-item__head">
              <img
                src="/icons/home-icon-2.svg"
                loading="lazy"
                alt=""
                className="how-works-item__icon"
              />
              <div className="how-works-item__count">02</div>
            </div>
            <div className="how-works-item__body">
              <div data-animation="how-works-item-title-2" className="body-md">
                <span className="mobile-fw">Get curated</span> matches
              </div>
              <div
                data-animation="how-works-item-description-2"
                className="body-md color-white-50 mobile-no-br"
              >
                We recommend retreats and <br />
                stays that fit.
              </div>
            </div>
          </div>
          <div data-animation="how-works-item-3" className="how-works-item">
            <div data-animation="how-works-item-head-3" className="how-works-item__head">
              <img
                src="/icons/home-icon-3.svg"
                loading="lazy"
                alt=""
                className="how-works-item__icon"
              />
              <div className="how-works-item__count">03</div>
            </div>
            <div className="how-works-item__body">
              <div data-animation="how-works-item-title-3" className="body-md">
                <span className="mobile-fw">Customize your</span> package
              </div>
              <div
                data-animation="how-works-item-description-3"
                className="body-md color-white-50 mobile-no-br"
              >
                Add transfers, spa, and <br />
                extras in one checkout.
              </div>
            </div>
          </div>
          <div data-animation="how-works-item-4" className="how-works-item">
            <div data-animation="how-works-item-head-4" className="how-works-item__head">
              <img
                src="/icons/home-icon-4.svg"
                loading="lazy"
                alt=""
                className="how-works-item__icon"
              />
              <div className="how-works-item__count">04</div>
            </div>
            <div className="how-works-item__body">
              <div data-animation="how-works-item-title-4" className="body-md">
                <span className="mobile-fw">Travel &amp; track</span> progress
              </div>
              <div
                data-animation="how-works-item-description-4"
                className="body-md color-white-50 mobile-no-br"
              >
                Use VITA Journal to reflect <br />
                and rebook.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
