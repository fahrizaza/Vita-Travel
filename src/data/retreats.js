/**
 * Retreats shown in the "Featured Retreats" / "You may also like" grids.
 * A "\n" in a title marks a forced line break.
 */
export const retreats = [
  {
    slug: "romania",
    path: "/romania",
    title: "7 Day Mystic Mountain Retreat in Romania",
    price: "$1,000",
    location: "Gura Humorului, Romania",
    dates: "Feb 15 - 21, 2026",
    duration: "(7 days, 6 nights)",
    guests: "12 guests",
    trustedBy: "190+",
    image: "/images/featured-1.webp",
  },
  {
    slug: "tuscany",
    path: "/retreat",
    title: "Yoga & Outdoor Retreat\nin Tuscany, Italy",
    price: "$1,328",
    location: "Province of Grosseto, Tuscany, Italy",
    dates: "Jan 15 - 21, 2026",
    duration: "(7 days, 6 nights)",
    guests: "6 guests",
    trustedBy: "125+",
    image: "/images/featured-2.webp",
  },
  {
    slug: "morocco-photo",
    path: "/morocco-photo",
    title: "Photography Retreat & Tour in Magical Morocco",
    price: "$5,575",
    location: "Morocco",
    dates: "March 06 - 20, 2026",
    duration: "(15 days, 14 nights)",
    guests: "18 guests",
    trustedBy: "312+",
    image: "/images/featured-3.webp",
    mobileImageInBody: true,
  },
  {
    slug: "morocco",
    path: "/morocco",
    title: "Morocco Holiday & Desert Moon",
    price: "$3,829",
    location: "Marrakesh, Marrakesh-Safi, Morocco",
    dates: "April 12 - 20, 2026",
    duration: "(8 days, 7 nights)",
    guests: "6 guests",
    trustedBy: "412+",
    image: "/images/featured-4.webp",
  },
  {
    slug: "portugal",
    path: "/portugal",
    title: "8 Day Juice Detox, Retreat in Portugal",
    price: "$1,294",
    location: "Portugal",
    dates: "Feb 06 - 14, 2026",
    duration: "(8 days, 7 nights)",
    guests: "12 guests",
    trustedBy: "112+",
    image: "/images/featured-5.webp",
  },
  {
    slug: "bali",
    path: "/bali",
    title: "7 Day Solo Travelers Retreat: Fun in Bali",
    price: "$406",
    location: "Ubud, Bali, Indonesia",
    dates: "Jan | Feb | Mar | Apr | May",
    duration: "(7 days, 6 nights)",
    guests: "Solo",
    trustedBy: "287+",
    image: "/images/featured-6.webp",
  },
];

export function getRetreat(slug) {
  const retreat = retreats.find((item) => item.slug === slug);
  if (!retreat) throw new Error(`Unknown retreat: ${slug}`);
  return retreat;
}
