import { useEffect, useRef, useState } from "react";
import { getHeaderHeight, getScrollOffset, scrollToElement } from "../../lib/scroll";

/**
 * Table of contents of the Privacy / Terms pages. Highlights the last heading that has passed
 * 20% of the viewport height and scrolls to a heading on click.
 *
 * @param {{ className: string, sections: { id: string, label: string }[] }} props
 */
export default function LegalNav({ className, sections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cancelScrollRef = useRef(null);

  useEffect(() => () => cancelScrollRef.current?.(), []);

  useEffect(() => {
    const update = () => {
      const threshold = 0.2 * window.innerHeight;
      let index = 0;
      sections.forEach(({ id }, i) => {
        const heading = document.getElementById(id);
        if (heading && getScrollOffset(heading) - window.scrollY <= threshold) index = i;
      });
      setActiveIndex(index);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [sections]);

  const scrollToHeading = (event, id) => {
    event.preventDefault();
    const heading = document.getElementById(id);
    if (!heading) return;
    cancelScrollRef.current?.();
    cancelScrollRef.current = scrollToElement(heading, { offsetY: getHeaderHeight() + 20 });
  };

  return (
    <div className={className}>
      {sections.map(({ id, label }, index) => (
        <div key={id} className="legal-nav__item">
          <a
            href={`#${id}`}
            className={index === activeIndex ? "legal-nav__link is-active" : "legal-nav__link"}
            onClick={(event) => scrollToHeading(event, id)}
          >
            {label}
          </a>
        </div>
      ))}
    </div>
  );
}
