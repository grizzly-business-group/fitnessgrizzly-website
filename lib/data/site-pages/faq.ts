/**
 * FAQ — all seven Q&As from the Wix /faqs page (Phase 1 Website Inventory §1.11), in the original two
 * categories. Wording is preserved; only formatting is cleaned (the Wix answer showed literal ** marks).
 * Answers are arrays of blocks so numbered steps stay numbered.
 */
export type FaqBlock = { p: string } | { ol: string[] };
export type Faq = {
  id: string;
  q: string;
  a: FaqBlock[];
  /** Related on-site / verified destinations. */
  links?: { label: string; href: string }[];
  /** Awaiting owner confirmation — shown to visitors as a short note, and listed by the launch check. */
  note?: string;
  public?: string;
};

export const faqCategories: { id: string; title: string; items: Faq[] }[] = [
  {
    id: "membership",
    title: "Membership and billing",
    items: [
      {
        id: "sign-up",
        q: "How can I sign up for a gym membership online?",
        a: [
          {
            ol: [
              "Go to our signup portal (Join online, below).",
              "Select your Grizzly Fitness location under “Filter by Club”.",
              "Pick the membership option that suits your goals.",
              "Enter your personal details.",
              "Read and sign the terms & conditions/waiver.",
              "Enter your payment info to complete registration.",
            ],
          },
        ],
        links: [
          { label: "Join online", href: "https://grizzlyfitness.gymmasteronline.com/portal/signup" },
          { label: "Memberships", href: "/memberships" },
        ],
      },
      {
        id: "key-fob",
        q: "How can I get my key fob?",
        a: [
          {
            p: "After you sign up, we'll prepare your key fob and email you when it's ready for pickup at your chosen gym. Come in during staffed hours to grab it. If the gym is unstaffed when you arrive, call us at 920-990-2795 and we'll unlock the door remotely.",
          },
        ],
        links: [{ label: "Staffed hours at each gym", href: "/locations" }],
      },
      {
        id: "all-locations",
        q: "If I purchased a gym membership do I get access to all locations?",
        a: [
          {
            p: "If you're an insurance member, yes — you have access to all five Grizzly Fitness locations. Otherwise, your membership gives you access to the location you signed up for. If you'd like to switch your home location, just let us know and we'll take care of it for you.",
          },
        ],
        links: [{ label: "Insurance programs", href: "/memberships#insurance" }],
      },
      {
        id: "minimum-term",
        q: "What's the minimum term for a biweekly membership?",
        a: [{ p: "We aim for longer-term memberships for locals, so the minimum term for a biweekly membership is 3 months." }],
        // 3-month minimum confirmed current by the owner, 19 Nov 2026.
      },
      {
        id: "cancellation",
        q: "Is there a cancellation notice on biweekly memberships?",
        a: [
          {
            p: "Yes, there is a 30-day cancellation notice. After you request to cancel, you will be billed for two more biweekly cycles. During this time, you will still have full access to the gym.",
          },
        ],
      },
      {
        id: "discounts",
        q: "Are there discounts for students, military, or seniors?",
        a: [{ p: "Yes, we offer discounts for students, military, and seniors. These apply to both recurring and most prepaid memberships." }],
        links: [{ label: "Memberships", href: "/memberships" }],
      },
    ],
  },
  {
    id: "app",
    title: "Mobile app",
    items: [
      {
        id: "app",
        q: "Is there an app to access my account? How do I use it?",
        a: [
          {
            ol: [
              "Download the GymMaster Member app from the App Store or Google Play.",
              "If you signed up online, use your login email and password to sign in. (Skip to step 7 if successful.)",
              "If you signed up in person, tap “Get My Login” in the app.",
              "Enter the email you used at signup.",
              "Check your email for a link to set up your password.",
              "Create your password and log in.",
              "Manage everything in one place — renew membership, update billing, book classes, and more.",
            ],
          },
        ],
        links: [
          { label: "App Store", href: "https://apps.apple.com/us/app/gymmaster-member/id1297093746" },
          { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.treshna.memberportal" },
          { label: "Renew & member support", href: "/members" },
        ],
      },
    ],
  },
];
