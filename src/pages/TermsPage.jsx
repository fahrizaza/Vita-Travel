/**
 * Route: /terms
 */

import LegalNav from "../components/legal/LegalNav";
import AppLink from "../components/ui/AppLink";

const LEGAL_SECTIONS = [
  { id: "interpretation", label: "Interpretation" },
  { id: "definitions", label: "Definitions" },
  { id: "acknowledgment", label: "Acknowledgment" },
  { id: "links-to-other-websites", label: "Links to Other Websites" },
  {
    id: "links-from-a-third-party-social-media-service",
    label: "Links from a Third-Party Social Media Service",
  },
  { id: "termination", label: "Termination" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "as-is-and-as-available-disclaimer", label: '"AS IS" and "AS AVAILABLE" Disclaimer' },
  { id: "governing-law", label: "Governing Law" },
  { id: "disputes-resolution", label: "Disputes Resolution" },
  { id: "for-european-union-eu-users", label: "For European Union (EU) Users" },
  { id: "united-states-legal-compliance", label: "United States Legal Compliance" },
  { id: "severability-and-waiver", label: "Severability and Waiver" },
];

export default function TermsPage() {
  return (
    <>
      <title>Terms and Conditions</title>
      <div className="page-padding">
        <div className="legal-intro padding-global">
          <div className="container">
            <div className="legal-intro__in">
              <div className="margin-bottom-16">
                <div data-anim="fade-up" className="h2 line-height-100">
                  Terms and Conditions
                </div>
              </div>
              <div className="margin-bottom-24">
                <div data-anim-delay="0.1" data-anim="fade-up" className="body-xl color-white-60">
                  Last updated: February 10, 2026
                </div>
              </div>
              <div className="width-785">
                <div
                  data-anim-delay="0.2"
                  data-anim="fade-up"
                  className="body-md-regular color-white-60"
                >
                  Please read these terms and conditions carefully before using Our Service.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-anim-delay="0.3" data-anim="fade-up" className="legal-content">
          <div className="container">
            <div className="legal-content__in">
              <div className="legal-content__text">
                <div className="legal-content__section">
                  <div className="h4 line-height-100">Interpretation and Definitions</div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="interpretation">
                      Interpretation
                    </div>
                    <div className="body-md-regular color-white-60">
                      The words whose initial letters are capitalized have meanings defined under
                      the <br />
                      following conditions. The following definitions shall have the same meaning
                      regardless <br />
                      of whether they appear in singular or in plural.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="definitions">
                      Definitions
                    </div>
                    <div className="body-md-regular color-white-60">
                      For the purposes of this Privacy Policy:
                    </div>
                    <ul role="list" className="list">
                      <li className="list__item">
                        <strong>Affiliate means</strong> an entity that controls, is controlled by,
                        or is under common control with <br />a party, where "control" means
                        ownership of 50% or more of the shares, equity interest <br />
                        or other securities entitled to vote for election of directors or other
                        managing authority.
                      </li>
                      <li className="list__item">
                        <strong>Company</strong> (referred to as either "the Company", "We", "Us" or
                        "Our" in this Privacy Policy) <br />
                        refers to Vita Travel.
                      </li>
                      <li className="list__item">
                        <strong>Device</strong> means any device that can access the Service such as
                        a computer, a cell phone <br />
                        or a digital tablet.
                      </li>
                      <li className="list__item">
                        <strong>Country</strong> refers to: Florida, United States
                      </li>
                      <li className="list__item">
                        <strong>Terms and Conditions</strong> (also referred to as "Terms") means
                        these Terms and Conditions, <br />
                        including any documents expressly incorporated by reference, which govern
                        Your <br />
                        access to and use of the Service and form the entire agreement between You
                        and the <br />
                        Company regarding the Service.
                      </li>
                      <li className="list__item">
                        <strong>Personal Data</strong> (or "Personal Information") is any
                        information that relates to an identified <br />
                        or identifiable individual. <br />
                        We use "Personal Data" and "Personal Information" interchangeably unless a
                        law uses a <br />
                        specific term.
                      </li>
                      <li className="list__item">
                        <strong>Third-Party Social Media</strong> Service means any services or
                        content (including data, <br />
                        information, products or services) provided by a third party that is
                        displayed, included, <br />
                        made available, or linked to through the Service.
                      </li>
                      <li className="list__item">
                        <strong>Website</strong> refers to Vita Travel, accessible from{" "}
                        <AppLink to="/" className="link">
                          https://vita-travel.webflow.io/
                        </AppLink>
                        .
                      </li>
                      <li className="list__item">
                        <strong>You</strong> means the individual accessing or using the Service, or
                        the company, or other legal <br />
                        entity on behalf of which such individual is accessing or using the Service,
                        as applicable.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="legal-content__section">
                  <div className="body-xl" id="acknowledgment">
                    Acknowledgment
                  </div>
                  <div className="legal-content__item">
                    <div className="body-md-regular color-white-60">
                      These are the Terms and Conditions governing the use of this Service and the{" "}
                      <br />
                      agreement between You and the Company. These Terms and Conditions set out the{" "}
                      <br />
                      rights and obligations of all users regarding the use of the Service.
                      <br />
                      <br />
                      Your access to and use of the Service is conditioned on Your acceptance of and{" "}
                      <br />
                      compliance with these Terms and Conditions. These Terms and Conditions apply
                      to all <br />
                      visitors, users and others who access or use the Service.
                      <br />
                      <br />
                      By accessing or using the Service You agree to be bound by these Terms and{" "}
                      <br />
                      Conditions. If You disagree with any part of these Terms and Conditions then
                      You may <br />
                      not access the Service.
                      <br />
                      <br />
                      You represent that you are over the age of 18. The Company does not permit
                      those <br />
                      under 18 to use the Service. <br />
                      Your access to and use of the Service is also subject to Our Privacy Policy,
                      which <br />
                      describes how We collect, use, and disclose personal information. Please read
                      Our <br />
                      Privacy Policy carefully before using Our Service.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="links-to-other-websites">
                      Links to Other Websites
                    </div>
                    <div className="body-md-regular color-white-60">
                      Our Service may contain links to third-party websites or services that are not
                      owned or <br />
                      controlled by the Company.
                      <br />
                      <br />
                      The Company has no control over, and assumes no responsibility for, the
                      content, <br />
                      privacy policies, or practices of any third-party websites or services. You
                      further <br />
                      acknowledge and agree that the Company shall not be responsible or liable,
                      directly or <br />
                      indirectly, for any damage or loss caused or alleged to be caused by or in
                      connection <br />
                      with the use of or reliance on any such content, goods or services available
                      on or <br />
                      through any such websites or services.
                      <br />
                      <br />
                      We strongly advise You to read the terms and conditions and privacy policies
                      of any <br />
                      third-party websites or services that You visit.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="links-from-a-third-party-social-media-service">
                      Links from a Third-Party Social Media Service
                    </div>
                    <div className="body-md-regular color-white-60">
                      The Service may display, include, make available, or link to content or
                      services provided <br />
                      by a Third-Party Social Media Service. A Third-Party Social Media Service is
                      not owned <br />
                      or controlled by the Company, and the Company does not endorse or assume{" "}
                      <br />
                      responsibility for any Third-Party Social Media Service. <br />
                      <br />
                      You acknowledge and agree that the Company shall not be responsible or liable,
                      directly <br />
                      or indirectly, for any damage or loss caused or alleged to be caused by or in
                      connection <br />
                      with Your access to or use of any Third-Party Social Media Service, including
                      any <br />
                      content, goods, or services made available through them. Your use of any
                      Third-Party <br />
                      Social Media Service is governed by that Third-Party Social Media Service's
                      terms and <br />
                      privacy policies.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="termination">
                      Termination
                    </div>
                    <div className="body-md-regular color-white-60">
                      We may terminate or suspend Your access immediately, without prior notice or
                      liability, <br />
                      for any reason whatsoever, including without limitation if You breach these
                      Terms and <br />
                      Conditions. <br />
                      Upon termination, Your right to use the Service will cease immediately.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="limitation-of-liability">
                      Limitation of Liability
                    </div>
                    <div className="body-md-regular color-white-60">
                      Notwithstanding any damages that You might incur, the entire liability of the
                      Company <br />
                      and any of its suppliers under any provision of these Terms and Your exclusive
                      remedy <br />
                      for all of the foregoing shall be limited to the amount actually paid by You
                      through the <br />
                      Service or 100 USD if You haven't purchased anything through the Service.{" "}
                      <br />
                      <br />
                      To the maximum extent permitted by applicable law, in no event shall the
                      Company or its <br />
                      suppliers be liable for any special, incidental, indirect, or consequential
                      damages <br />
                      whatsoever (including, but not limited to, damages for loss of profits, loss
                      of data or <br />
                      other information, for business interruption, for personal injury, loss of
                      privacy arising out <br />
                      of or in any way related to the use of or inability to use the Service,
                      third-party software <br />
                      and/or third-party hardware used with the Service, or otherwise in connection
                      with any <br />
                      provision of these Terms), even if the Company or any supplier has been
                      advised of the <br />
                      possibility of such damages and even if the remedy fails of its essential
                      purpose. <br />
                      <br />
                      Some states do not allow the exclusion of implied warranties or limitation of
                      liability for <br />
                      incidental or consequential damages, which means that some of the above
                      limitations <br />
                      may not apply. In these states, each party's liability will be limited to the
                      greatest extent <br />
                      permitted by law.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="as-is-and-as-available-disclaimer">
                      "AS IS" and "AS AVAILABLE" Disclaimer
                    </div>
                    <div className="body-md-regular color-white-60">
                      The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults
                      and <br />
                      defects without warranty of any kind. To the maximum extent permitted under{" "}
                      <br />
                      applicable law, the Company, on its own behalf and on behalf of its Affiliates
                      and its and <br />
                      their respective licensors and service providers, expressly disclaims all
                      warranties, <br />
                      whether express, implied, statutory or otherwise, with respect to the Service,
                      including <br />
                      all implied warranties of merchantability, fitness for a particular purpose,
                      title and non-
                      <br />
                      infringement, and warranties that may arise out of course of dealing, course
                      of <br />
                      performance, usage or trade practice.
                      <br />
                      <br />
                      Without limitation to the foregoing, the Company provides no warranty or
                      undertaking, <br />
                      and makes no representation of any kind that the Service will meet Your
                      requirements, <br />
                      achieve any intended results, be compatible or work with any other software,{" "}
                      <br />
                      applications, systems or services, operate without interruption, meet any
                      performance <br />
                      or reliability standards or be error free or that any errors or defects can or
                      will be <br />
                      corrected.
                      <br />
                      <br />
                      Without limiting the foregoing, neither the Company nor any of the company's
                      provider <br />
                      makes any representation or warranty of any kind, express or implied: (i) as
                      to the <br />
                      operation or availability of the Service, or the information, content, and
                      materials or <br />
                      products included thereon; (ii) that the Service will be uninterrupted or
                      error-free; (iii) as <br />
                      to the accuracy, reliability, or currency of any information or content
                      provided through <br />
                      the Service; or (iv) that the Service, its servers, the content, or e-mails
                      sent from or on <br />
                      behalf of the Company are free of viruses, scripts, trojan horses, worms,
                      malware, <br />
                      timebombs or other harmful components.
                      <br />
                      <br />
                      Some jurisdictions do not allow the exclusion of certain types of warranties
                      or limitations <br />
                      on applicable statutory rights of a consumer, so some or all of the above
                      exclusions and <br />
                      limitations may not apply to You. But in such a case the exclusions and
                      limitations set <br />
                      forth in this section shall be applied to the greatest extent enforceable
                      under applicable <br />
                      law.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="governing-law">
                      Governing Law
                    </div>
                    <div className="body-md-regular color-white-60">
                      The laws of the Country, excluding its conflicts of law rules, shall govern
                      these Terms <br />
                      and Your use of the Service. Your use of the Application may also be subject
                      to other <br />
                      local, state, national, or international laws.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="disputes-resolution">
                      Disputes Resolution
                    </div>
                    <div className="body-md-regular color-white-60">
                      If You have any concern or dispute about the Service, You agree to first try
                      to resolve <br />
                      the dispute informally by contacting the Company.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="for-european-union-eu-users">
                      For European Union (EU) Users
                    </div>
                    <div className="body-md-regular color-white-60">
                      If You are a European Union consumer, you will benefit from any mandatory
                      provisions <br />
                      of the law of the country in which You are resident.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl" id="united-states-legal-compliance">
                      United States Legal Compliance
                    </div>
                    <div className="body-md-regular color-white-60">
                      You represent and warrant that (i) You are not located in a country that is
                      subject to the <br />
                      United States government embargo, or that has been designated by the United
                      States <br />
                      government as a "terrorist supporting" country, and (ii) You are not listed on
                      any United <br />
                      States government list of prohibited or restricted parties.
                    </div>
                  </div>
                </div>
                <div className="legal-content__section">
                  <div className="h4 line-height-100" id="severability-and-waiver">
                    Severability and Waiver
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Severability</div>
                    <div className="body-md-regular color-white-60">
                      If any provision of these Terms is held to be unenforceable or invalid, such
                      provision will <br />
                      be changed and interpreted to accomplish the objectives of such provision to
                      the <br />
                      greatest extent possible under applicable law and the remaining provisions
                      will continue <br />
                      in full force and effect.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Waiver</div>
                    <div className="body-md-regular color-white-60">
                      Except as provided herein, the failure to exercise a right or to require
                      performance of an <br />
                      obligation under these Terms shall not affect a party's ability to exercise
                      such right or <br />
                      require such performance at any time thereafter nor shall the waiver of a
                      breach <br />
                      constitute a waiver of any subsequent breach.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Translation Interpretation</div>
                    <div className="body-md-regular color-white-60">
                      These Terms and Conditions may have been translated if We have made them
                      available <br />
                      to You on our Service. You agree that the original English text shall prevail
                      in the case of <br />a dispute.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Changes to These Terms and Conditions</div>
                    <div className="body-md-regular color-white-60">
                      We reserve the right, at Our sole discretion, to modify or replace these Terms
                      at any <br />
                      time. If a revision is material We will make reasonable efforts to provide at
                      least 30 days' <br />
                      notice prior to any new terms taking effect. What constitutes a material
                      change will be <br />
                      determined at Our sole discretion.
                      <br />
                      <br />
                      By continuing to access or use Our Service after those revisions become
                      effective, You <br />
                      agree to be bound by the revised terms. If You do not agree to the new terms,
                      in whole <br />
                      or in part, please stop using the Service.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Contact Us</div>
                    <div className="body-md-regular color-white-60">
                      If you have any questions about this Privacy Policy, You can contact us by
                      visiting this <br />
                      page on our website:{" "}
                      <AppLink to="/contacts" className="link">
                        https://vita-travel.webflow.io/contacts
                      </AppLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="legal-content__sidebar">
                <div className="legal-nav">
                  <div className="body-md color-white-40">Table of contents</div>
                  <LegalNav className="legal-nav__items" sections={LEGAL_SECTIONS} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
