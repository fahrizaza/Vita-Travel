export default function AboutSection() {
  return (
    <section className="about-section padding-global">
      <div className="container">
        <div className="head">
          <div className="row mobile-column">
            <div className="column column-3">
              <div data-anim="about-section-head" className="head__title mobile-margin-bottom-24">
                <img src="/icons/logo-mini.svg" loading="lazy" alt="" className="logo-mini" />
                <div className="body-md">About Us</div>
              </div>
            </div>
            <div className="column column-9">
              <div className="head__description">
                <div
                  data-anim="about-head-description"
                  className="h2 mobile-font-size-36 mobile-no-br"
                >
                  Not just trips experiences that <br />
                  nurture body and soul
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about">
          <div className="about__visual">
            <img
              src="/images/illustration-about.jpg"
              loading="lazy"
              data-animation="about-illustration"
              alt=""
              className="about__illustration"
            />
          </div>
          <div className="about__content">
            <div className="about__head">
              <div data-animation="about-head" className="body-xl mobile-font-size-22 mobile-no-br">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vita Travel &nbsp;is a
                premium wellness travel marketplace <br />
                that blends the ease of booking with the feel of an editorial <br />
                magazine. Discover curated programs, match them with <br />
                exceptional stays, and book seamlessly.
              </div>
            </div>
            <div className="about__items">
              <div className="about-item">
                <div className="about-item__head">
                  <div data-animation="about-item-head-1" className="h3">
                    100+
                  </div>
                  <div data-animation="about-item-description-1" className="body-l">
                    Total countries <br />
                    travelled
                  </div>
                </div>
                <div className="about-item__footer">
                  <div data-animation="about-item-footer" className="body-md color-white-60">
                    Trusted by travelers looking for more than ordinary vacations.
                  </div>
                </div>
              </div>
              <div className="about-item">
                <div className="about-item__head">
                  <div data-animation="about-item-head-2" className="h3">
                    1 472+
                  </div>
                  <div data-animation="about-item-description-2" className="body-l">
                    Total retreats <br />
                    attended
                  </div>
                </div>
                <div className="about-item__footer">
                  <div data-animation="about-item-footer-logos" className="about-item__logos">
                    <img
                      src="/icons/logo-1.svg"
                      loading="lazy"
                      alt=""
                      className="about-item__logo"
                    />
                    <img
                      src="/icons/logo-2.svg"
                      loading="lazy"
                      alt=""
                      className="about-item__logo"
                    />
                    <img
                      src="/icons/logo-3.svg"
                      loading="lazy"
                      alt=""
                      className="about-item__logo mobile-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
