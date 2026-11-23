/**
 * Terms & Privacy — rewritten (Nov 2026) for the new website, replacing the Wix text (Last Updated 5/6/2025,
 * kept in the project history). Changes requested by the owner: correct phone (920-990-2795), the legal entity
 * named, memberships/payments via GymMaster (this site takes no payments), an SMS Terms section (A2P), an
 * assumption-of-risk line, named processors, accurate cookie/analytics description with opt-outs, children's
 * privacy, retention and the standard carrier SMS clause.
 *
 * Approved by the owner as written on 19 Nov 2026 (legal entity: Grizzly Fitness LLC, lib/data/site.ts). Any
 * later change to these texts needs a new owner/legal sign-off and a new "updated" date.
 */
import { site } from "../site";

export type LegalBlock = { p: string } | { ul: string[] } | { h3: string } | { contact: [string, string] };
export type LegalDoc = { title: string; updated: string; intro: LegalBlock[]; sections: { h: string; blocks: LegalBlock[] }[] };
export const legalReview = { status: "approved", approvedOn: "2026-11-19", by: "owner, as written" };

const ENTITY = site.legalEntity.value || "Grizzly Fitness";
const UPDATED = "November 19, 2026";
const PHONE = site.phone.value.display;
const EMAIL = site.email;
const contact: LegalBlock[] = [
  { p: ENTITY === "Grizzly Fitness" ? "Grizzly Fitness" : `${ENTITY}, doing business as Grizzly Fitness` },
  { contact: ["Email", EMAIL] },
  { contact: ["Phone", PHONE] },
  { contact: ["Mail", "230 E Main St, Wautoma, WI 54982"] },
];

export const terms: LegalDoc = {
  title: "Terms & Conditions",
  updated: UPDATED,
  intro: [
    { p: `These Terms & Conditions ("Terms") govern your use of the Grizzly Fitness website at https://www.fitnessgrizzly.com (the "Site"). The Site is operated by ${ENTITY} ("Grizzly Fitness," "we," "us"). By using the Site you agree to these Terms. If you don't agree, please don't use the Site.` },
  ],
  sections: [
    { h: "1. Eligibility", blocks: [{ p: "You must be at least 18 years old, or have the consent of a parent or legal guardian, to use the Site or submit information through it." }] },
    {
      h: "2. Memberships and payments",
      blocks: [
        { p: "Memberships, passes and add-ons are purchased through our membership software provider, GymMaster, and are governed by the membership agreement you accept when you sign up — including pricing, minimum terms, billing, cancellation and refunds. Personal training and other services may have their own agreements." },
        { p: "This Site does not take payments or store payment information. Links to “Join” open GymMaster's sign-up portal." },
      ],
    },
    {
      h: "3. Assumption of risk",
      blocks: [
        { p: "Exercise involves a risk of injury. Consult a physician before starting any exercise program, especially if you have a medical condition, are pregnant, or have not exercised recently. Participation in any workout, class or training program is voluntary and at your own risk." },
        { p: "Information on this Site is general and is not medical advice. Fitness results vary from person to person, and we don't guarantee any specific result." },
      ],
    },
    {
      h: "4. Consultations and services",
      blocks: [
        { p: "When you request a consultation or service, please give accurate information and let us know if you need to reschedule. Programs, classes, services and staffed hours may change or be discontinued without notice." },
      ],
    },
    {
      h: "5. SMS / text message terms",
      blocks: [
        { p: "If you opt in to text messages from Grizzly Fitness (for example by checking the SMS consent box on one of our forms), you agree to receive text messages at the number you provide. Messages may include replies to your inquiries, consultation and appointment scheduling and reminders, membership and account updates and, if you opt in to them, offers and promotions." },
        { ul: [
          "Message frequency varies.",
          "Msg & data rates may apply.",
          "Reply STOP to opt out at any time. Reply HELP for help, or contact us at " + PHONE + " or " + EMAIL + ".",
          "Consent to receive text messages is not a condition of any purchase.",
          "Carriers are not liable for delayed or undelivered messages.",
        ] },
        { p: "How we handle your mobile information is described in our Privacy Policy." },
      ],
    },
    {
      h: "6. Your information",
      blocks: [{ p: "Information you submit through the Site is handled as described in our Privacy Policy." }],
    },
    {
      h: "7. Third-party services and links",
      blocks: [
        { p: "The Site links to and embeds services run by other companies — for example GymMaster (memberships and the member portal), GoHighLevel/LeadConnector (forms and booking), Google Forms, Google Maps, YouTube, podcast platforms, social networks and our apparel shop. Their own terms and privacy policies apply, and we're not responsible for their content or practices." },
      ],
    },
    {
      h: "8. Testimonials",
      blocks: [{ p: "If you send us a review or testimonial, you allow us to publish it on the Site or in our marketing. You can ask us to remove it at any time." }],
    },
    {
      h: "9. Intellectual property",
      blocks: [{ p: "The Site's content — including text, photos, graphics, logos and design — belongs to Grizzly Fitness or its licensors. Please don't copy, reuse or distribute it without our written permission." }],
    },
    {
      h: "10. Acceptable use",
      blocks: [
        { p: "You agree not to:" },
        { ul: ["Use the Site for any unlawful, fraudulent or harmful purpose", "Misrepresent your identity", "Interfere with the Site or upload malicious code", "Copy or commercially exploit Site content without permission"] },
      ],
    },
    {
      h: "11. Disclaimers and limitation of liability",
      blocks: [
        { p: "The Site is provided “as is” and “as available,” without warranties of any kind. We don't guarantee that the Site will always be available, error-free or completely up to date." },
        { p: `To the fullest extent permitted by law, ${ENTITY} and its owners, employees and representatives are not liable for any indirect, incidental, special or consequential damages arising from your use of, or inability to use, the Site.` },
      ],
    },
    {
      h: "12. Changes to these Terms",
      blocks: [{ p: "We may update these Terms from time to time. Changes take effect when posted on this page with a new “Last updated” date." }],
    },
    {
      h: "13. Governing law",
      blocks: [{ p: "These Terms are governed by the laws of the State of Wisconsin. Any dispute will be resolved in the state or federal courts located in Wisconsin." }],
    },
    { h: "14. Contact us", blocks: [{ p: "Questions about these Terms:" }, ...contact] },
  ],
};

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  updated: UPDATED,
  intro: [
    { p: `This Privacy Policy explains how ${ENTITY} ("Grizzly Fitness," "we," "us") collects, uses and protects information when you use https://www.fitnessgrizzly.com (the "Site"), contact us, or submit a form or booking through it.` },
  ],
  sections: [
    {
      h: "1. Information we collect",
      blocks: [
        { h3: "Information you give us" },
        { p: "When you fill out a form, book a consultation, or call, text or email us, we collect what you provide — such as your name, email address, phone number, preferred gym, your fitness goals and your message." },
        { h3: "Memberships and payments" },
        { p: "Memberships are purchased through GymMaster. GymMaster collects your sign-up and payment details under its own policies; this Site does not collect or store payment card information." },
        { h3: "Information collected automatically" },
        { p: "Like most websites, the Site and its hosting provider receive technical information such as your IP address, browser and device type, the pages you visit and the referring page. The analytics and advertising tools described in section 4 also use cookies or similar technologies to measure visits and the effectiveness of our ads." },
      ],
    },
    {
      h: "2. How we use information",
      blocks: [
        { ul: [
          "To respond to your questions and requests",
          "To schedule consultations and services and send reminders",
          "To send updates and, if you've agreed, offers and promotions by email or text",
          "To understand how the Site is used and improve it",
          "To measure and improve our advertising",
          "To comply with legal obligations and protect our business",
        ] },
        { p: "We do not sell your personal information." },
      ],
    },
    {
      h: "3. Text messages",
      blocks: [
        { p: "If you opt in to text messages, we use your mobile number to send the messages described in our Terms (section 5). You can stop at any time by replying STOP, or by contacting us. Reply HELP for help. Msg & data rates may apply; message frequency varies." },
        { p: "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties." },
      ],
    },
    {
      h: "4. Cookies, analytics and advertising",
      blocks: [
        { p: "The Site itself doesn't set cookies to identify you; it only keeps small, temporary settings in your browser (for example, whether the homepage intro has already played). We use these third-party tools, which can set cookies or similar identifiers:" },
        { ul: [
          "Google Analytics 4 — to understand how visitors use the Site",
          "Meta Pixel (Facebook/Instagram) — to measure and improve our ads on Meta platforms",
        ] },
        { p: "If we add other advertising measurement tools in the future (for example, for search advertising), we will update this policy." },
        { p: "You can control these choices:" },
        { ul: [
          "Block or delete cookies in your browser settings",
          "Google Analytics opt-out: https://tools.google.com/dlpage/gaoptout",
          "Google My Ad Center: https://myadcenter.google.com",
          "Meta ad preferences: https://www.facebook.com/adpreferences",
          "Interest-based advertising opt-out (Digital Advertising Alliance): https://optout.aboutads.info",
        ] },
      ],
    },
    {
      h: "5. Service providers we use",
      blocks: [
        { p: "We share information only with providers that help us run our business, and only as needed for that purpose:" },
        { ul: [
          "GymMaster — memberships, the member portal and app, and payments",
          "GoHighLevel / LeadConnector — our contact database, website forms, booking calendar, email and text messaging",
          "Google — Google Analytics 4, and Google Forms (used for equipment-repair, podcast-guest and membership-cancellation forms)",
          "Meta — Meta Pixel advertising measurement",
          "GitHub — website hosting (GitHub Pages), which processes technical information such as IP addresses",
        ] },
        { p: "Links to Google Maps, YouTube, podcast platforms, social networks and our apparel shop take you to those services, whose own privacy policies apply." },
        { p: "We may also disclose information if required by law, to protect our rights or safety, or as part of a sale or transfer of our business." },
      ],
    },
    {
      h: "6. Data retention",
      blocks: [{ p: "We keep personal information for as long as we need it for the purposes above — for example, while you're a member or prospect and for a reasonable period afterward — or as required by law. Then we delete it or keep it in a form that no longer identifies you." }],
    },
    {
      h: "7. Security",
      blocks: [{ p: "The Site uses HTTPS, and we limit access to personal information to people and providers who need it. No method of transmission or storage is completely secure, so we can't guarantee absolute security." }],
    },
    {
      h: "8. Children's privacy",
      blocks: [{ p: "The Site is not directed to children under 13, and we don't knowingly collect personal information from them. If you believe a child under 13 has given us information, contact us and we'll delete it." }],
    },
    {
      h: "9. Your choices",
      blocks: [
        { ul: [
          "Unsubscribe from emails using the link in any email",
          "Stop text messages by replying STOP",
          "Ask us to access, correct or delete your information",
        ] },
        { p: "To make a request, contact us using the details below." },
      ],
    },
    {
      h: "10. Testimonials",
      blocks: [{ p: "With your permission, we may publish your review or testimonial. To have it removed, contact us." }],
    },
    {
      h: "11. Changes to this policy",
      blocks: [{ p: "We may update this Privacy Policy from time to time. Changes take effect when posted on this page with a new “Last updated” date." }],
    },
    { h: "12. Contact us", blocks: [{ p: "Questions about this policy or your information:" }, ...contact] },
  ],
};
