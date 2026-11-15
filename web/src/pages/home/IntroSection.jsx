import Button from "../../components/ui/Button";

export default function IntroSection() {
  return (
    <section className="intro">
      <div className="container">
        <div className="intro__in">
          <div className="intro__text">
            <div data-anim="fade-up-big" className="h1 mobile-margin-bottom-16 intro__headline">
              Travel
            </div>
            <div className="margin-bottom-32 z-index-3">
              <div data-anim-delay="0.1" data-anim="fade-up" className="body-xxl">
                With purpose. Book retreats, active <br />
                tours, and boutique stays &nbsp;in one place.
              </div>
            </div>
            <div
              data-anim-delay="0.2"
              data-anim="fade-up"
              className="intro__button mobile-hidden z-index-3"
            >
              <Button kind="primary" variant="full-width-mobile" to="/#retreats">
                Explore Retreats
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="intro__button mobile-visible z-index-3">
        <Button kind="primary" variant="full-width-mobile" to="/#retreats">
          Explore Retreats
        </Button>
      </div>
      <img
        src="/images/bg-part-1.webp"
        loading="eager"
        alt=""
        className="intro-bg-part intro-bg-part--1 mobile-hidden"
      />
      <img
        src="/images/mobile-bg-part-1.webp"
        loading="eager"
        alt=""
        className="intro-bg-part intro-bg-part--1 mobile-visible"
      />
      <div className="intro-bg-dark" />
      <img
        src="/images/bg-part-2.webp"
        loading="eager"
        alt=""
        className="intro-bg-part intro-bg-part--2 mobile-hidden"
      />
      <img
        src="/images/mobile-bg-part-2.webp"
        loading="eager"
        alt=""
        className="intro-bg-part intro-bg-part--2 mobile-visible"
      />
    </section>
  );
}
