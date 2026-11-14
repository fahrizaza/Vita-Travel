/**
 * Posts the contact form to Webflow's form endpoint, exactly like the original site did.
 * The ids identify the Webflow site, page and form element that receive the submission.
 */
const WEBFLOW_SITE_ID = "696eeb61714a6c90a5f18c9e";
const WEBFLOW_PAGE_ID = "6989ddddca88694aeab411d6";
const WEBFLOW_ELEMENT_ID = "16aecc29-1748-d34c-d9a9-cfe9e3f15204";
const FORM_NAME = "Email Form";

/** @param {Record<string, string>} fields */
export async function submitContactForm(fields) {
  const body = new URLSearchParams({
    name: FORM_NAME,
    source: window.location.href,
    test: "false",
    dolphin: "false",
    pageId: WEBFLOW_PAGE_ID,
    elementId: WEBFLOW_ELEMENT_ID,
    domain: window.location.hostname,
  });
  Object.entries(fields).forEach(([key, value]) => body.append(`fields[${key}]`, value.trim()));
  body.append("fields[submit_url]", window.location.href);

  const response = await fetch(`https://webflow.com/api/v1/form/${WEBFLOW_SITE_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error(`Form submission failed (${response.status})`);
}
