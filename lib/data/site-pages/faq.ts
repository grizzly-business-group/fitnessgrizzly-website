/**
 * FAQ — the seven Q&As from the Wix /faqs page (Phase 1 Website Inventory §1.11), plus (Nov 2026 audit) answers
 * built only from facts already confirmed elsewhere on the site. Wording is preserved; only formatting is cleaned (the Wix answer showed literal ** marks).
 * Answers are arrays of blocks so numbered steps stay numbered.
 */
import { pricing } from "../site";

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
          { label: "Join online", href: "https://grizzlyfitness.gymmasteronline.com/portal/signup?utm_source=fitnessgrizzly.com&utm_medium=website&utm_campaign=join" },
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
        id: "three-day-cancel",
        q: "Can I change my mind right after signing up?",
        a: [{ p: "Yes. You can cancel your membership contract until midnight of the 3rd operating day after you sign it, by notifying us in writing (mailed or delivered to the gym address on your contract). Any payments are refunded within 21 days, less a user fee of no more than $3 for each day you actually used the gym." }],
      },
      {
        id: "how-to-cancel",
        q: "How do I cancel my membership?",
        a: [{ p: "Use the cancellation link at the bottom of our Members page, or call or text 920-990-2795. A 30-day notice applies: you keep full access for 30 days from your cancellation date, and charges during that time remain due. Any outstanding balance needs to be paid before a membership can be reactivated later." }],
        links: [{ label: "Members page", href: "/members#member-faq" }],
      },
      {
        id: "freeze",
        q: "Can I freeze my membership?",
        a: [{ p: "Not on your own — memberships can't be paused or frozen online. Call or text 920-990-2795 and we'll go over your options." }],
        // Owner, 24 Nov 2026: members can't freeze on their own.
      },
      {
        id: "waiver",
        q: "Do I have to sign a waiver?",
        a: [{ p: "Yes. Every member signs our Waiver, Release and Hold Harmless Agreement and our Rules and Regulations when joining — online during sign-up or in person. Members under 18 need a parent or guardian to sign with them." }],
      },
      {
        id: "discounts",
        q: "Are there discounts for students, military, or seniors?",
        a: [{ p: "Yes, we offer discounts for students, military, and seniors. These apply to both recurring and most prepaid memberships." }],
        links: [{ label: "Memberships", href: "/memberships" }],
      },
      {
        id: "price",
        q: "How much is a membership?",
        a: [{ p: `Bi-weekly memberships are ${pricing.biweekly.map((x) => `${x.price} for ${x.plan.replace(/ \(.*\)$/, "").toLowerCase()}`).join(", ")}, billed every two weeks, plus a ${pricing.signupFee} sign-up fee. Prices are the same at all five gyms. Prepaid options run from ${pricing.prepaid[0].price} for one month to ${pricing.prepaid[pricing.prepaid.length - 1].price} for two years.` }],
        links: [{ label: "All prices", href: "/memberships" }, { label: "Join", href: "/join" }],
      },
      {
        id: "day-pass",
        q: "Do you have day passes?",
        a: [{ p: `Yes. A 1-day pass is ${pricing.passes[0].price} and a 7-day pass is ${pricing.passes[1].price} (plus a ${pricing.signupFee} sign-up fee), bought online in our sign-up portal — pick the gym you want to visit and choose a pass.` }],
        links: [{ label: "Join or buy a pass", href: "/join" }],
      },
      {
        id: "insurance",
        q: "Which insurance fitness programs do you accept?",
        a: [{ p: "We accept Silver Sneakers, Renew Active, Prime Active, Active & Fit and Silver & Fit. Insurance members can use all five Grizzly Fitness gyms." }],
        links: [{ label: "Insurance programs", href: "/memberships#insurance" }],
      },
      {
        id: "wellhub",
        q: "Do you take Wellhub?",
        a: [{ p: "Yes. Grizzly Fitness accepts Wellhub (formerly Gympass). Check your Wellhub app to see your plan and which Grizzly gyms it includes." }],
      },
      {
        id: "switch-gym",
        q: "Can I switch my home gym?",
        a: [{ p: "Yes. Your membership is for the gym you signed up at, but if you'd like to switch your home location, just let us know and we'll take care of it." }],
        links: [{ label: "Contact us", href: "/contact" }],
      },
    ],
  },
  {
    id: "gyms",
    title: "Gyms and access",
    items: [
      {
        id: "open-24-7",
        q: "Are the gyms really open 24 hours?",
        a: [{ p: "Yes. Every Grizzly Fitness gym is open 24 hours a day, 365 days a year with your key fob. Staffed hours are different at each gym — that's when you can pick up a fob or talk to us in person." }],
        links: [{ label: "Staffed hours by gym", href: "/locations" }],
      },
      {
        id: "locked-out",
        q: "What if I need help when the gym isn't staffed?",
        a: [{ p: "Call or text 920-990-2795. If you're having trouble getting in, we can unlock the door remotely." }],
      },
      {
        id: "equipment-brands",
        q: "What equipment do your gyms have?",
        a: [{ p: "Our gyms have an old-school feel, with Hammer Strength, Precor, Matrix, Cybex, Nautilus and Magnum equipment — plate-loaded and selectorized machines, racks, dumbbells and cardio. Each gym's page shows its own floor and equipment." }],
        links: [{ label: "Our five gyms", href: "/locations" }],
      },
      {
        id: "broken-machine",
        q: "A machine is broken. How do I let you know?",
        a: [{ p: "Use our equipment repair form and tell us which gym and which machine, or call or text us." }],
        links: [{ label: "Report an equipment problem", href: "/equipment-repair" }],
      },
    ],
  },
  {
    id: "rules",
    title: "Gym rules",
    items: [
      {
        id: "guests",
        q: "Can I bring a guest?",
        a: [{ p: "Every member enters with their own key fob, and members can't let anyone else in. Allowing an unauthorized guest can mean a $50 fee per occurrence and suspension or termination of the membership. Friends are welcome with their own pass: a 1-day pass is $15 and a 7-day pass is $25, both bought online." }],
        links: [{ label: "Buy a pass or join", href: "/join" }],
      },
      {
        id: "age",
        q: "Is there a minimum age?",
        a: [{ p: "Children under 8 aren't allowed in the equipment areas. From age 8, kids need their own membership to use the equipment areas, and anyone under 14 must have a parent or guardian with them in the gym. Members under 18 need a parent or guardian to sign the waiver." }],
      },
      {
        id: "safety-24-7",
        q: "How do you keep the gym safe 24/7?",
        a: [{ p: "Every member swipes their own key fob to get in, no one may share their fob, and members never open the door for anyone except emergency personnel. The facility is on camera at all times. Please report anything suspicious right away — call or text 920-990-2795." }],
      },
      {
        id: "attire",
        q: "What should I wear?",
        a: [{ p: "A shirt, pants or shorts, and closed-toe athletic shoes. No sandals or open-toe shoes, and no street shoes on the equipment." }],
      },
      {
        id: "bags",
        q: "Where do I put my bag?",
        a: [{ p: "Gym bags aren't allowed on the training floor or on equipment — use the cubby area or leave them in your vehicle. Grizzly Fitness isn't responsible for lost or stolen items." }],
      },
      {
        id: "phones",
        q: "Can I use my phone in the gym?",
        a: [{ p: "Yes, with headphones or earbuds for any audio. Voice and video calls are for the lobby only, and please don't view content others might find offensive or inappropriate." }],
      },
      {
        id: "equipment-etiquette",
        q: "What are the equipment rules?",
        a: [{ p: "Put benches, weights and accessories back after use; don't drop or slam weights; spray and wipe down equipment with the bottles and towels provided; and use the safety bars on squat and bench racks. If something needs repair, let us know." }],
        links: [{ label: "Report an equipment problem", href: "/equipment-repair" }],
      },
      {
        id: "not-allowed",
        q: "What isn't allowed in the gym?",
        a: [{ p: "Alcohol, drugs (including steroids), smoking and weapons of any kind are prohibited, and no one may work out while impaired by alcohol, drugs or medication. We may limit food, drinks or outside equipment in the gym. Breaking the rules can lead to suspension or termination of a membership." }],
      },
    ],
  },
  {
    id: "training",
    title: "Training and classes",
    items: [
      {
        id: "personal-training",
        q: "Do you offer personal training?",
        a: [{ p: "Yes — semi-private personal training: a small group of 2–6 people with the personal attention of a coach, customized workouts and accountability. Call, text or email us to set up a consult." }],
        links: [{ label: "Personal training", href: "/personal-training" }],
      },
      {
        id: "classes",
        q: "Do you have group classes?",
        a: [{ p: "Group Fit and Senior Fit (Silver Sneakers) classes run at our Wautoma gym. Call or text 920-990-2795 for current class times." }],
        links: [{ label: "Classes", href: "/classes" }],
      },
      {
        id: "inbody",
        q: "What is an InBody scan?",
        a: [{ p: "A specialized scale that gives an accurate measurement of your water weight, muscle mass, skeletal weight and fat. InBody scans are available at our Princeton, Berlin and Wautoma gyms." }],
        links: [{ label: "Training services", href: "/training" }],
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
