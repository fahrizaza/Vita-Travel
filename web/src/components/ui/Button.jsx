import { cx } from "../../lib/cx";
import AppLink from "./AppLink";
import StarIcon from "./StarIcon";

const KINDS = {
  primary: {
    className: "btn-primary",
    labelClassName: "button-sm color-brand-green",
    iconFill: "#0D2E37",
  },
  secondary: {
    className: "btn-secondary",
    labelClassName: "button-sm color-white",
    iconFill: "white",
  },
};

/** Webflow component variants, mapped to the classes the exported CSS expects. */
const VARIANTS = {
  "full-width-mobile": "w-variant-a8690625-644e-5667-ae83-53408c6b0c16",
  "full-width": "w-variant-28eadc15-d435-4480-c473-16eb53816cbc",
  "mobile-big": "w-variant-f7e9c850-7422-a4eb-fa39-b6136f9844ac",
  "size-m": "w-variant-7fdcd745-b64b-83ed-0d58-b72f69613568",
};

/**
 * Site button with the star icon. Pass `to` for an internal route, otherwise it renders a plain
 * anchor (`href`, defaulting to "#", typically combined with `onClick`).
 */
export default function Button({
  kind = "primary",
  variant,
  to,
  href = "#",
  className,
  children,
  ...props
}) {
  const { className: kindClassName, labelClassName, iconFill } = KINDS[kind];
  const classes = cx(kindClassName, VARIANTS[variant], "w-inline-block", className);
  const content = (
    <>
      <div className={labelClassName}>{children}</div>
      <div className="btn-icon w-embed">
        <StarIcon fill={iconFill} />
      </div>
    </>
  );

  if (to) {
    return (
      <AppLink to={to} className={classes} {...props}>
        {content}
      </AppLink>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}
