import { Fragment } from "react";

function NameAndRole({ coach }) {
  return (
    <>
      <div className="body-lg">{coach.name}</div>
      <div className="body-sm">{coach.role}</div>
    </>
  );
}

function Stat({ label, icon, value }) {
  return (
    <div className="coaches-person-info__item">
      <div className="body-sm">{label}</div>
      <div className={`coaches-person-info__item-icon ${icon}`}>
        <div className="body-sm">{value}</div>
      </div>
    </div>
  );
}

/** @param {{ coach: import("../../data/coaches").coaches[number] }} props */
export default function CoachCard({ coach }) {
  return (
    <div className="coaches-person">
      <div className="coaches-person__visual">
        <img src={coach.photo} loading="lazy" alt="" className="coaches-person__photo" />
        <div className="coaches-person__head">
          <NameAndRole coach={coach} />
        </div>
      </div>
      <div className="coaches-person-info">
        <div className="coaches-person-info__location">
          <div className="body-sm">{coach.location}</div>
        </div>
        <div className="coaches-person-info__body">
          <div className="coaches-person-info__head">
            <div className="coaches-person-info__headline">
              <NameAndRole coach={coach} />
            </div>
            <div className="body-sm color-white-60">
              {coach.bio.map((paragraph, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <>
                      {" "}
                      <br />
                      <br />
                    </>
                  )}
                  {paragraph}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="coaches-person-info__footer">
            <div className="coaches-person-info__items">
              <Stat label="Countries travelled:" icon="earth" value={coach.countriesTravelled} />
              <Stat label="Retreats attended:" icon="yoga" value={coach.retreatsAttended} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
