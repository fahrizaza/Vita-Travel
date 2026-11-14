import { useId, useState } from "react";
import { cx } from "../../lib/cx";
import Button from "../ui/Button";
import StarIcon from "../ui/StarIcon";
import { submitContactForm } from "./submitContactForm";

const EMPTY_FORM = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Names of the required fields that are empty or invalid. */
function validate(values) {
  const invalid = new Set();
  if (!values.name.trim()) invalid.add("name");
  if (!EMAIL_PATTERN.test(values.email.trim())) invalid.add("email");
  return invalid;
}

function ContactsHead({ children }) {
  return (
    <div className="contact-us__head">
      <div className="head head--column-gap-24">{children}</div>
    </div>
  );
}

function ContactsLabel(props) {
  return (
    <div className="head__title" {...props}>
      <img src="/icons/logo-mini.svg" loading="lazy" alt="" className="logo-mini" />
      <div className="body-md">Contacts</div>
    </div>
  );
}

/** Contact form; after a successful submission it is swapped for a thank-you message. */
export default function ContactPanel() {
  const id = useId();
  const [values, setValues] = useState(EMPTY_FORM);
  const [invalid, setInvalid] = useState(() => new Set());
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setInvalid((current) => {
      if (!current.has(name)) return current;
      const next = new Set(current);
      next.delete(name);
      return next;
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    const errors = validate(values);
    setInvalid(errors);
    if (errors.size) return;

    setStatus("sending");
    try {
      await submitContactForm(values);
      setValues(EMPTY_FORM);
      setStatus("sent");
    } catch {
      setStatus("idle"); // the original site also failed silently
    }
  };

  const groupClass = (field) => cx("inp-group", invalid.has(field) && "is-error");

  return (
    <div className={cx("contact-us__content", status === "sent" && "is-sended")}>
      <ContactsHead>
        <ContactsLabel data-anim="contacts-head" />
        <div data-anim="contacts-title" className="h2 mobile-font-size-36">
          Get in touch
        </div>
        <div className="mobile-margin-top-minus-8">
          <div data-anim="contacts-description" className="body-lg color-white-60">
            Contact the Vita Travel team today!
          </div>
        </div>
      </ContactsHead>
      <div className="contact-us-form w-form">
        <div className="w-embed">
          <form
            className={cx("form", status === "sending" && "is-sending")}
            data-anim="contacts-form"
            noValidate
            onSubmit={submit}
          >
            <div className="form__row">
              <div className={groupClass("name")}>
                <label htmlFor={`${id}-name`} className="body-sm inp-group__title">
                  Name
                </label>
                <input
                  id={`${id}-name`}
                  className="inp-group__input w-input"
                  maxLength={256}
                  name="name"
                  placeholder="Name"
                  type="text"
                  required
                  value={values.name}
                  onChange={update}
                />
              </div>
              <div className={groupClass("email")}>
                <label htmlFor={`${id}-email`} className="body-sm inp-group__title">
                  Email
                </label>
                <input
                  id={`${id}-email`}
                  className="inp-group__input w-input"
                  maxLength={256}
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                  value={values.email}
                  onChange={update}
                />
              </div>
            </div>
            <div className="form__row">
              <div className="inp-group">
                <label htmlFor={`${id}-message`} className="body-sm inp-group__title">
                  Message
                </label>
                <textarea
                  id={`${id}-message`}
                  placeholder="Message"
                  maxLength={5000}
                  name="message"
                  className="inp-group__textarea"
                  value={values.message}
                  onChange={update}
                />
              </div>
            </div>
            <div className="form__button">
              {/* Kept as a styled anchor (not <button>) so the exported button CSS applies unchanged. */}
              <a
                href="#"
                role="button"
                className="btn-primary w-variant-a8690625-644e-5667-ae83-53408c6b0c16"
                onClick={submit}
              >
                <div className="button-sm color-brand-green">Submit</div>
                <div className="btn-icon w-embed">
                  <StarIcon fill="#0D2E37" />
                </div>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="contact-us-success">
        <ContactsHead>
          <ContactsLabel />
          <div className="h2 mobile-font-size-36">Thank you!</div>
          <div className="body-lg color-white-60">
            Your form has been successfully submitted.
            <br />
            Please check your email our manager will contact you shortly.
          </div>
        </ContactsHead>
        <Button kind="primary" variant="full-width-mobile" to="/">
          Go Home
        </Button>
      </div>
    </div>
  );
}
