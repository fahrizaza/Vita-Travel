/**
 * Route: /privacy
 */

import LegalNav from "../components/legal/LegalNav";
import AppLink from "../components/ui/AppLink";

const LEGAL_SECTIONS = [
  { id: "interpretation-and-definitions", label: "Interpretation and Definitions" },
  {
    id: "collecting-and-using-your-personal-data",
    label: "Collecting and Using Your Personal Data",
  },
  { id: "disclosure-of-your-personal-data", label: "Disclosure of Your Personal Data" },
];

export default function PrivacyPage() {
  return (
    <>
      <title>Privacy Policy</title>
      <div className="page-padding">
        <div className="legal-intro padding-global">
          <div className="container">
            <div className="legal-intro__in">
              <div className="margin-bottom-16 mobile-margin-bottom-8">
                <div data-anim="fade-up" className="h2 line-height-100">
                  Privacy Policy
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
                  This Privacy Policy describes Our policies and procedures on the collection, use
                  and disclosure of Your information when You use the Service and tells You about
                  Your privacy rights and how the law protects You.We use Your Personal Data to
                  provide and improve the Service. By using the Service, You agree to the collection
                  and use of information in accordance with this Privacy Policy.
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
                  <div className="h4 line-height-100" id="interpretation-and-definitions">
                    Interpretation and Definitions
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl">Interpretation</div>
                    <div className="body-md-regular color-white-60">
                      The words whose initial letters are capitalized have meanings defined under
                      the <br />
                      following conditions. The following definitions shall have the same meaning
                      regardless <br />
                      of whether they appear in singular or in plural.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-xl">Definitions</div>
                    <div className="body-md-regular color-white-60">
                      For the purposes of this Privacy Policy:
                    </div>
                    <ul role="list" className="list">
                      <li className="list__item">
                        <strong>Account means</strong> a unique account created for You to access
                        our Service or parts of our <br />
                        Service.
                      </li>
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
                        <strong>Cookies</strong> are small files that are placed on Your computer,
                        mobile device or any other <br />
                        device by a website, containing the details of Your browsing history on that
                        website <br />
                        among its many uses.
                      </li>
                      <li className="list__item">
                        <strong>Country</strong> refers to: Florida, United States
                      </li>
                      <li className="list__item">
                        <strong>Device</strong> means any device that can access the Service such as
                        a computer, a cell phone <br />
                        or a digital tablet.
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
                        <strong>Service</strong> refers to the Website.
                      </li>
                      <li className="list__item">
                        <strong>Usage Data</strong> refers to data collected automatically, either
                        generated by the use of the <br />
                        Service or from the Service infrastructure itself (for example, the duration
                        of a page <br />
                        visit).
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
                  <div className="h4 line-height-100" id="collecting-and-using-your-personal-data">
                    Collecting and Using Your Personal Data
                  </div>
                  <div className="body-xl">Types of Data Collected</div>
                  <div className="legal-content__item">
                    <div className="body-lg">Personal Data</div>
                    <div className="body-md-regular color-white-60">
                      While using Our Service, We may ask You to provide Us with certain personally{" "}
                      <br />
                      identifiable information that can be used to contact or identify You.
                      Personally <br />
                      identifiable information may include, but is not limited to:
                    </div>
                    <ul role="list" className="list">
                      <li className="list__item">Email address</li>
                      <li className="list__item">First name and last name</li>
                    </ul>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Usage Data</div>
                    <div className="body-md-regular color-white-60">
                      Usage Data is collected automatically when using the Service. <br />
                      Usage Data may include information such as Your Device's Internet Protocol
                      address <br />
                      (e.g. IP address), browser type, browser version, the pages of our Service
                      that You visit, <br />
                      the time and date of Your visit, the time spent on those pages, unique device
                      identifiers <br />
                      and other diagnostic data. <br />
                      When You access the Service by or through a mobile device, We may collect
                      certain <br />
                      information automatically, including, but not limited to, the type of mobile
                      device You <br />
                      use, Your mobile device's unique ID, the IP address of Your mobile device,
                      Your mobile <br />
                      operating system, the type of mobile Internet browser You use, unique device
                      identifiers <br />
                      and other diagnostic data. <br />
                      We may also collect information that Your browser sends whenever You visit Our{" "}
                      <br />
                      Service or when You access the Service by or through a mobile device.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Tracking Technologies and Cookies</div>
                    <div className="body-md-regular color-white-60">
                      We use Cookies and similar tracking technologies to track the activity on Our
                      Service <br />
                      and store certain information. Tracking technologies We use include beacons,
                      tags, and <br />
                      scripts to collect and track information and to improve and analyze Our
                      Service. The <br />
                      technologies We use may include:
                    </div>
                    <ul role="list" className="list">
                      <li className="list__item">
                        <strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed
                        on Your Device. You can <br />
                        instruct Your browser to refuse all Cookies or to indicate when a Cookie is
                        being sent. <br />
                        However, if You do not accept Cookies, You may not be able to use some parts
                        of our <br />
                        Service.
                      </li>
                      <li className="list__item">
                        <strong>Web Beacons.</strong> Certain sections of our Service and our emails
                        may contain small <br />
                        electronic files known as web beacons (also referred to as clear gifs, pixel
                        tags, and <br />
                        single-pixel gifs) that permit the Company, for example, to count users who
                        have visited <br />
                        those pages or opened an email and for other related website statistics (for
                        example, <br />
                        recording the popularity of a certain section and verifying system and
                        server integrity).
                      </li>
                    </ul>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Use of Your Personal Data</div>
                    <div className="body-md-regular color-white-60">
                      The Company may use Personal Data for the following purposes:
                    </div>
                    <ul role="list" className="list">
                      <li className="list__item">
                        <strong>To provide</strong> and maintain our Service, including to monitor
                        the usage of our Service.
                      </li>
                      <li className="list__item">
                        <strong>To manage Your Account:</strong> to manage Your registration as a
                        user of the Service. The <br />
                        Personal Data You provide can give You access to different functionalities
                        of the Service <br />
                        that are available to You as a registered user.
                      </li>
                      <li className="list__item">
                        <strong>For the performance of a contract:</strong> the development,
                        compliance and undertaking of the <br />
                        purchase contract for the products, items or services You have purchased or
                        of any <br />
                        other contract with Us through the Service.
                      </li>
                      <li className="list__item">
                        <strong>To contact You:</strong> To contact You by email, telephone calls,
                        SMS, or other equivalent <br />
                        forms of electronic communication, such as a mobile application's push
                        notifications <br />
                        regarding updates or informative communications related to the
                        functionalities, products <br />
                        or contracted services, including the security updates, when necessary or
                        reasonable <br />
                        for their implementation.
                      </li>
                      <li className="list__item">
                        <strong>To provide You</strong> with news, special offers, and general
                        information about other goods, <br />
                        services and events which We offer that are similar to those that you have
                        already <br />
                        purchased or inquired about unless You have opted not to receive such
                        information.
                      </li>
                      <li className="list__item">
                        <strong>To manage Your requests:</strong> To attend and manage Your requests
                        to Us.
                      </li>
                      <li className="list__item">
                        <strong>For business transfers:</strong> We may use Your Personal Data to
                        evaluate or conduct a merger, <br />
                        divestiture, restructuring, reorganization, dissolution, or other sale or
                        transfer of some or <br />
                        all of Our assets, whether as a going concern or as part of bankruptcy,
                        liquidation, or <br />
                        similar proceeding, in which Personal Data held by Us about our Service
                        users is among <br />
                        the assets transferred.
                      </li>
                      <li className="list__item">
                        <strong>For other purposes: </strong>
                        We may use Your information for other purposes, such as data <br />
                        analysis, identifying usage trends, determining the effectiveness of our
                        promotional <br />
                        campaigns and to evaluate and improve our Service, products, services,
                        marketing and <br />
                        your experience.
                      </li>
                    </ul>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">
                      We may share Your Personal Data in the following situations:
                    </div>
                    <ul role="list" className="list">
                      <li className="list__item">
                        <strong>With Service Providers: </strong>
                        We may share Your Personal Data with Service Providers to <br />
                        monitor and analyze the use of our Service, to contact You.
                      </li>
                      <li className="list__item">
                        <strong>For business transfers: </strong>
                        We may share or transfer Your Personal Data in connection with, <br />
                        or during negotiations of, any merger, sale of Company assets, financing, or
                        acquisition <br />
                        of all or a portion of Our business to another company.
                      </li>
                      <li className="list__item">
                        <strong>With Affiliates: </strong>
                        We may share Your Personal Data with Our affiliates, in which case we <br />
                        will require those affiliates to honor this Privacy Policy. Affiliates
                        include Our parent <br />
                        company and any other subsidiaries, joint venture partners or other
                        companies that We <br />
                        control or that are under common control with Us.
                      </li>
                      <li className="list__item">
                        <strong>With business partners: </strong>
                        We may share Your Personal Data with Our business partners to <br />
                        offer You certain products, services or promotions.
                      </li>
                      <li className="list__item">
                        <strong>With other users: </strong>
                        If Our Service offers public areas, when You share Personal Data or <br />
                        otherwise interact in the public areas with other users, such information
                        may be viewed <br />
                        by all users and may be publicly distributed outside.
                      </li>
                      <li className="list__item">
                        <strong>With Your consent: </strong>
                        We may disclose Your Personal Data for any other purpose with Your <br />
                        consent.
                      </li>
                    </ul>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Transfer of Your Personal Data</div>
                    <div className="body-md-regular color-white-60">
                      Your information, including Personal Data, is processed at the Company's
                      operating <br />
                      offices and in any other places where the parties involved in the processing
                      are located. <br />
                      It means that this information may be transferred to — and maintained on —
                      computers <br />
                      located outside of Your state, province, country or other governmental
                      jurisdiction <br />
                      where the data protection laws may differ from those from Your jurisdiction.{" "}
                      <br />
                      Where required by applicable law, We will ensure that international transfers
                      of Your <br />
                      Personal Data are subject to appropriate safeguards and supplementary measures{" "}
                      <br />
                      where appropriate. <br />
                      <br />
                      The Company will take all steps reasonably necessary to ensure that Your data
                      is <br />
                      treated securely and in accordance with this Privacy Policy and no transfer of
                      Your <br />
                      Personal Data will take place to an organization or a country unless there are
                      adequate <br />
                      controls in place including the security of Your data and other personal
                      information
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Delete Your Personal Data</div>
                    <div className="body-md-regular color-white-60">
                      You have the right to delete or request that We assist in deleting the
                      Personal Data that <br />
                      We have collected about You. <br />
                      Our Service may give You the ability to delete certain information about You
                      from within <br />
                      the Service. <br />
                      <br />
                      You may update, amend, or delete Your information at any time by signing in to
                      Your <br />
                      Account, if you have one, and visiting the account settings section that
                      allows you to <br />
                      manage Your personal information. You may also contact Us to request access
                      to, <br />
                      correct, or delete any Personal Data that You have provided to Us. <br />
                      Please note, however, that We may need to retain certain information when we
                      have a <br />
                      legal obligation or lawful basis to do so.
                    </div>
                  </div>
                </div>
                <div className="legal-content__section">
                  <div className="h4 line-height-100" id="disclosure-of-your-personal-data">
                    Disclosure of Your Personal Data
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Business Transactions</div>
                    <div className="body-md-regular color-white-60">
                      If the Company is involved in a merger, acquisition or asset sale, Your
                      Personal Data may <br />
                      be transferred. We will provide notice before Your Personal Data is
                      transferred and <br />
                      becomes subject to a different Privacy Policy.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Law enforcement</div>
                    <div className="body-md-regular color-white-60">
                      Under certain circumstances, the Company may be required to disclose Your
                      Personal <br />
                      Data if required to do so by law or in response to valid requests by public
                      authorities <br />
                      (e.g. a court or a government agency).
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Other legal requirements</div>
                    <div className="body-md-regular color-white-60">
                      The Company may disclose Your Personal Data in the good faith belief that such
                      action <br />
                      is necessary to:
                    </div>
                    <ul role="list" className="list">
                      <li className="list__item">
                        <strong>Comply with a legal obligation</strong>
                      </li>
                      <li className="list__item">
                        <strong>Protect and defend the rights or property of the Company</strong>
                      </li>
                      <li className="list__item">
                        <strong>
                          Prevent or investigate possible wrongdoing in connection with the Service
                        </strong>
                      </li>
                      <li className="list__item">
                        <strong>
                          Protect the personal safety of Users of the Service or the public
                        </strong>
                      </li>
                      <li className="list__item">
                        <strong>Protect against legal liability</strong>
                      </li>
                    </ul>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Security of Your Personal Data</div>
                    <div className="body-md-regular color-white-60">
                      The security of Your Personal Data is important to Us, but remember that no
                      method of <br />
                      transmission over the Internet, or method of electronic storage is 100%
                      secure. While <br />
                      We strive to use commercially reasonable means to protect Your Personal Data,
                      We <br />
                      cannot guarantee its absolute security.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Children's Privacy</div>
                    <div className="body-md-regular color-white-60">
                      Our Service does not address anyone under the age of 16. We do not knowingly
                      collect <br />
                      personally identifiable information from anyone under the age of 16. If You
                      are a parent <br />
                      or guardian and You are aware that Your child has provided Us with Personal
                      Data, <br />
                      please contact Us. If We become aware that We have collected Personal Data
                      from <br />
                      anyone under the age of 16 without verification of parental consent, We take
                      steps to <br />
                      remove that information from Our servers. <br />
                      <br />
                      If We need to rely on consent as a legal basis for processing Your information
                      and Your <br />
                      country requires consent from a parent, We may require Your parent's consent
                      before <br />
                      We collect and use that information.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Links to Other Websites</div>
                    <div className="body-md-regular color-white-60">
                      Our Service may contain links to other websites that are not operated by Us.
                      If You click <br />
                      on a third party link, You will be directed to that third party's site. We
                      strongly advise You <br />
                      to review the Privacy Policy of every site You visit. <br />
                      We have no control over and assume no responsibility for the content, privacy
                      policies <br />
                      or practices of any third party sites or services.
                    </div>
                  </div>
                  <div className="legal-content__item">
                    <div className="body-lg">Changes to this Privacy Policy</div>
                    <div className="body-md-regular color-white-60">
                      We may update Our Privacy Policy from time to time. We will notify You of any
                      changes <br />
                      by posting the new Privacy Policy on this page. <br />
                      We will let You know via email and/or a prominent notice on Our Service, prior
                      to the <br />
                      change becoming effective and update the "Last updated" date at the top of
                      this <br />
                      Privacy Policy.
                      <br />
                      You are advised to review this Privacy Policy periodically for any changes.
                      Changes to <br />
                      this Privacy Policy are effective when they are posted on this page.
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
