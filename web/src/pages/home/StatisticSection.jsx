import MobileSlider from "../../components/ui/MobileSlider";

export default function StatisticSection() {
  return (
    <section className="statistic-section padding-global">
      <div className="container">
        <div className="head">
          <div className="row mobile-column">
            <div className="column column-3">
              <div data-anim="statistic-head-title" className="head__title mobile-margin-bottom-24">
                <img src="/icons/logo-mini.svg" loading="lazy" alt="" className="logo-mini" />
                <div className="body-md">Retreats</div>
              </div>
            </div>
            <div className="column column-9">
              <div className="head__description">
                <div data-anim="statistic-h2" className="h2 mobile-font-size-36 mobile-no-br">
                  We've vetted retreats in <br />
                  more than 100 countries <br />
                  See for yourself
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="statistic__wrapper">
        <MobileSlider className="statistic__items" preset="cards">
          <div data-anim="statistic-item-1" className="statistic-item">
            <div className="statistic-item__head">
              <div data-anim="statistic-item-title" className="body-lg-semibold">
                Introvert Retreats
              </div>
              <div data-anim="statistic-item-subtitle" className="body-md color-white-50">
                / 78+ Countries
              </div>
            </div>
            <div className="statistic-item__visual">
              <img
                src="/images/statistic-1.webp"
                loading="lazy"
                data-anim="statistic-item-illustration"
                alt=""
                className="statistic-item__illustration"
              />
            </div>
            <div
              data-anim="statistic-border-right-1"
              className="statistic__border statistic__border--right"
            />
          </div>
          <div data-anim="statistic-item-2" className="statistic-item">
            <div className="statistic-item__head">
              <div data-anim="statistic-item-title" className="body-lg-semibold">
                Yoga Retreats
              </div>
              <div data-anim="statistic-item-subtitle" className="body-md color-white-50">
                / 89+ Countries
              </div>
            </div>
            <div className="statistic-item__visual">
              <img
                src="/images/statistic-2.webp"
                loading="lazy"
                data-anim="statistic-item-illustration"
                alt=""
                className="statistic-item__illustration"
              />
            </div>
            <div
              data-anim="statistic-border-right-2"
              className="statistic__border statistic__border--right"
            />
          </div>
          <div data-anim="statistic-item-3" className="statistic-item">
            <div className="statistic-item__head">
              <div data-anim="statistic-item-title" className="body-lg-semibold">
                Detox
              </div>
              <div data-anim="statistic-item-subtitle" className="body-md color-white-50">
                / 56+ Countries
              </div>
            </div>
            <div className="statistic-item__visual">
              <img
                src="/images/statistic-3.webp"
                loading="lazy"
                data-anim="statistic-item-illustration"
                alt=""
                className="statistic-item__illustration"
              />
            </div>
          </div>
        </MobileSlider>
        <div
          data-anim="statistic-border-top"
          className="statistic__border statistic__border--top"
        />
        <div
          data-anim="statistic-border-bottom"
          className="statistic__border statistic__border--bottom"
        />
      </div>
    </section>
  );
}
