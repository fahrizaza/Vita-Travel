import { getRetreat } from "../../data/retreats";
import Button from "../ui/Button";
import RetreatCard from "./RetreatCard";

/**
 * Grid of retreat cards ("Featured Retreats" on the home page, "You may also like" on retreat
 * pages). The grid lines depend on the number of rows.
 *
 * @param {{
 *   title: import("react").ReactNode,
 *   retreats: string[],
 *   seeAll?: boolean,
 * }} props `retreats` are slugs, in order; `seeAll` adds a link to the full list on the home page
 */
export default function FeaturedSection({ title, retreats, seeAll = false }) {
  const decorations = retreats.length > 2 ? [1, 2, 3, 4, 5] : [1, 4, 5];

  return (
    <section id="retreats" className="featured-section padding-global">
      <div className="container">
        <div className="head">
          <div className="row align-end mobile-column">
            <div className="column column-6">
              <div className="head__description mobile-margin-bottom-16">
                <div data-animation="featured-head" className="h2 mobile-h3">
                  {title}
                </div>
              </div>
            </div>
            <div className="column column-6">
              <div className="featured-section__head">
                <div
                  data-animation="featured-head-description"
                  className="body-md color-white-60 mobile-no-br"
                >
                  Discover unique locations, engaging activities, and expert- <br />
                  led workshops designed to inspire and refresh your spirit.
                </div>
                {seeAll && (
                  <Button kind="secondary" variant="size-m" to="/#retreats">
                    See all
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="featured">
          <div className="featured__items">
            {retreats.map((slug) => (
              <RetreatCard key={slug} retreat={getRetreat(slug)} />
            ))}
            {decorations.map((n) => (
              <div key={n} className={`featured__dec featured__dec--${n}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
