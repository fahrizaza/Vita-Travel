import { Link, NavLink } from "react-router";
import { cx } from "../../lib/cx";

/**
 * Internal link. Like Webflow, a link to the current page gets the `w--current` class
 * (and `aria-current="page"`). Links to an in-page anchor (e.g. "/#retreats") never do.
 */
export default function AppLink({ to, className, ...props }) {
  if (to.includes("#")) {
    return <Link to={to} className={className} {...props} />;
  }
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => cx(className, isActive && "w--current")}
      {...props}
    />
  );
}
