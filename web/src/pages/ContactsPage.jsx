/**
 * Route: /contacts
 */

import ContactPanel from "../components/contact/ContactPanel";

export default function ContactsPage() {
  return (
    <>
      <title>Contacts</title>
      <div className="page-padding">
        <div className="contact-us">
          <div className="contact-us__in">
            <div className="contact-us__column">
              <div className="contact-us__visual">
                <img
                  src="/images/illustration-contact.webp"
                  loading="lazy"
                  sizes="100vw"
                  srcSet="/images/illustration-contact-p-500.webp 500w, /images/illustration-contact-p-800.webp 800w, /images/illustration-contact-p-1080.webp 1080w, /images/illustration-contact.webp 1280w"
                  alt=""
                  className="contact-us__illustration"
                />
              </div>
              <div className="contact-us__dec contact-us__dec--1" />
            </div>
            <div className="contact-us__column">
              <ContactPanel />
            </div>
            <div className="contact-us__dec contact-us__dec--2" />
          </div>
        </div>
      </div>
    </>
  );
}
