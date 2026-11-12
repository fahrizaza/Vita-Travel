import { Fragment } from "react";
import Button from "../ui/Button";

function Property({ icon, iconClassName = "opacity-20", children }) {
  return (
    <div data-animation="featured-item-property" className="featured-item-property">
      <div className="featured-item-property__title">
        <div className="title-xs">{children}</div>
      </div>
      <img
        src={icon}
        loading="lazy"
        alt=""
        className={`featured-item-property__icon ${iconClassName}`}
      />
    </div>
  );
}

/** Splits "line one\nline two" into lines separated by <br />. */
function MultilineText({ text }) {
  return text.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 && (
        <>
          {" "}
          <br />
        </>
      )}
      {line}
    </Fragment>
  ));
}

/** @param {{ retreat: import("../../data/retreats").retreats[number] }} props */
export default function RetreatCard({ retreat }) {
  const mobileVisual = (
    <div className="featured-item__visual mobile-visible">
      <img src={retreat.image} loading="lazy" alt="" className="featured-item__illustration" />
    </div>
  );

  return (
    <div className="featured-item">
      <div className="featured-item__text">
        <div className="featured-item__head">
          <div data-animation="featured-item-head" className="h4">
            <MultilineText text={retreat.title} />
          </div>
          <div data-animation="featured-item-cost" className="featured-item__cost">
            <div className="body-md color-white-60">from</div>
            <div className="body-lg-semibold">{retreat.price}</div>
          </div>
        </div>
        {!retreat.mobileImageInBody && mobileVisual}
        <div className="featured-item__body">
          {retreat.mobileImageInBody && mobileVisual}
          <div className="featured-item__properties">
            <Property icon="/icons/pin.svg">{retreat.location}</Property>
            <Property icon="/icons/calendar.svg">
              {retreat.dates} <span className="color-white-60">{retreat.duration}</span>
            </Property>
            <Property icon="/icons/users.svg">{retreat.guests}</Property>
            <Property icon="/icons/stars.svg" iconClassName="size-l">
              Trusted by {retreat.trustedBy}{" "}
              <span className="color-white-60">clients worldwide</span>
            </Property>
          </div>
          <div data-animation="featured-item-button" className="featured-item__button">
            <Button kind="secondary" variant="full-width" to={retreat.path}>
              Explore Retreat
            </Button>
          </div>
        </div>
      </div>
      <div className="featured-item__visual mobile-hidden">
        <img
          src={retreat.image}
          loading="lazy"
          data-animation="featured-item-illustration"
          alt=""
          className="featured-item__illustration"
        />
      </div>
    </div>
  );
}
