/**
 * Memberships. Sources: Wix /faqs (terms, discounts, all-location access — verbatim meaning), homepage
 * insurance line, and the GymMaster sign-up portal's product list as observed in the Phase 1 audit
 * (Website Inventory §2). Prices stay in GymMaster (Phase 2 decision) — none are shown here.
 */
export const memberships = {
  options: [
    { title: "Bi-weekly memberships", body: "Recurring bi-weekly memberships with full 24/7 access at your home gym — adult, military, senior and student options." },
    { title: "Prepaid memberships", body: "Pay up front for a set term — 1-month, 4-month, 1-year and 2-year options." },
    { title: "Day & 7-day passes", body: "Visiting, or want to try us first? 1-day and 7-day passes are available online." },
  ],
  // Product list confirmed current by the owner, 19 Nov 2026 (originally read from the GymMaster sign-up portal).
  terms: [
    "We aim for longer-term memberships for locals, so the minimum term for a biweekly membership is 3 months.",
    "There is a 30-day cancellation notice. After you request to cancel, you will be billed for two more biweekly cycles. During this time, you will still have full access to the gym.",
    "We offer discounts for students, military, and seniors. These apply to both recurring and most prepaid memberships.",
  ],
  access:
    "Your membership gives you access to the gym you signed up at. Insurance members can use all five Grizzly Fitness gyms. Want to switch your home gym? Just let us know.",
  insurance: ["Silver Sneakers", "Renew Active", "Prime Active", "Active & Fit", "Silver & Fit"],
  // Insurance programs and all-gym access for insurance members: owner-confirmed current content, 19 Nov 2026.
};
