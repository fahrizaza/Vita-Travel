/**
 * Coaches listed on the Coaches page and in the home page "Practitioners" section.
 * Each entry of `bio` is a paragraph.
 */
export const coaches = [
  {
    id: "lauren-thompson",
    name: "Lauren Thompson",
    role: "Yoga Couch",
    photo: "/images/coach-1.webp",
    location: "USA",
    bio: [
      "I work with yoga as a practical tool for improving mobility, balance, and body awareness. My sessions focus on breath, alignment, and calm strength, without pressure or competition. I support people who want to build a steady practice that fits real life and long-term wellbeing.",
      "My approach is grounded, structured, and accessible for different experience levels.",
    ],
    countriesTravelled: "14",
    retreatsAttended: "18",
  },
  {
    id: "elena-rossi",
    name: "Elena Rossi",
    role: "Wellbeing & Balance Coach",
    photo: "/images/coach-2.webp",
    location: "Europe",
    bio: [
      "I believe that health and fitness are built through sustainable lifestyle changes — and that is exactly what I offer my clients.I focus on teaching real, whole-food nutrition, practical meal preparation, effective resistance and cardiovascular training, and, most importantly, consistency.",
      "I believe that anyone can achieve their health and fitness goals with the right approach and support.",
    ],
    countriesTravelled: "14",
    retreatsAttended: "12",
  },
  {
    id: "matteo-conti",
    name: "Matteo Conti",
    role: "Transformational Retreat Guide",
    photo: "/images/coach-3.webp",
    location: "Africa",
    bio: [
      "I guide retreats focused on personal clarity, reflection, and intentional change. My work combines structured sessions, nature-based practices, and group processes. I support participants in slowing down, reassessing priorities, and reconnecting with their inner direction.",
      "I value clarity, presence, and honest self-observation as tools for long-term change.",
    ],
    countriesTravelled: "22",
    retreatsAttended: "123",
  },
  {
    id: "clara-hoffmann",
    name: "Clara Hoffmann",
    role: "Holistic Wellness Coach",
    photo: "/images/coach-4.webp",
    location: "Asia",
    bio: [
      "I work with people who want to improve their overall wellbeing by aligning mental, emotional, and physical health. My approach is holistic and supportive, focusing on balance rather than extremes.",
      "I help clients build routines that support stability, energy, and self-awareness in daily life.",
    ],
    countriesTravelled: "28",
    retreatsAttended: "45",
  },
  {
    id: "julien-lef-vre",
    name: "Julien Lefèvre",
    role: "Meditation Teacher",
    photo: "/images/coach-5.webp",
    location: "Europe",
    bio: [
      "I teach meditation as a practical skill for focus, emotional regulation, and mental clarity. My sessions are simple and structured, suitable for both beginners and experienced practitioners.",
      "I focus on techniques that can be integrated into daily routines and professional life without isolating meditation from reality.",
    ],
    countriesTravelled: "16",
    retreatsAttended: "21",
  },
  {
    id: "david-schneider",
    name: "David Schneider",
    role: "Nature Retreat Guide",
    photo: "/images/coach-6.webp",
    location: "Asia",
    bio: [
      "I design and guide retreats centered around nature, walking practices, and quiet observation.",
      "My work uses natural environments as a space for reflection and mental reset. I support participants in reconnecting with simplicity, presence, and physical awareness through structured outdoor experiences.",
    ],
    countriesTravelled: "32",
    retreatsAttended: "68",
  },
  {
    id: "anna-kowalska",
    name: "Anna Kowalska",
    role: "Conscious Movement Instructor",
    photo: "/images/coach-7.webp",
    location: "Europe",
    bio: [
      "I work with conscious movement practices that improve mobility, coordination, and body awareness. My sessions help participants understand how they move and how movement affects emotional state.",
      "I focus on clarity, control, and ease, supporting sustainable physical health without strain.",
    ],
    countriesTravelled: "15",
    retreatsAttended: "32",
  },
  {
    id: "thomas-weber",
    name: "Thomas Weber",
    role: "Silent Retreat Guide",
    photo: "/images/coach-8.webp",
    location: "USA",
    bio: [
      "I facilitate silent retreats focused on rest, mental clarity, and deep reflection. My work creates a structured and safe environment where participants can step away from constant input and reconnect with their inner processes. Silence is used as a practical tool for awareness and insight.",
    ],
    countriesTravelled: "22",
    retreatsAttended: "124",
  },
  {
    id: "isabelle-martin",
    name: "Isabelle Martin",
    role: "Stress-Relief Guide",
    photo: "/images/coach-9.webp",
    location: "Europe",
    bio: [
      "I work with stress reduction through structured breathing practices, gentle movement, and nervous system regulation. My sessions focus on restoring balance, improving emotional stability, and reducing physical tension. I support people who experience long-term stress and want practical, repeatable tools they can use in everyday life. My approach is calm, grounded, and focused on sustainable recovery rather than quick fixes.",
    ],
    countriesTravelled: "14",
    retreatsAttended: "18",
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    role: "Nutrition Specialist",
    photo: "/images/coach-10.webp",
    location: "Europe",
    bio: [
      "I support retreat participants with nutrition that is simple, nourishing, and adapted to real needs. My work focuses on whole foods, energy balance, and practical eating habits that support focus and recovery. I help people understand how nutrition affects their physical and mental state, without strict rules or unnecessary restrictions, and with respect for individual lifestyles.",
    ],
    countriesTravelled: "17",
    retreatsAttended: "89",
  },
  {
    id: "laura-s-nchez",
    name: "Laura Sánchez",
    role: "Yoga Couch",
    photo: "/images/coach-11.webp",
    location: "Europe",
    bio: [
      "I teach yoga as a consistent daily practice that supports strength, flexibility, and mental clarity. My sessions are structured, calm, and focused on breath, alignment, and body awareness. I work with people who want to integrate yoga into their routine in a realistic and sustainable way, without pressure or performance-based expectations.",
    ],
    countriesTravelled: "26",
    retreatsAttended: "224",
  },
  {
    id: "michael-wilson",
    name: "Michael Wilson",
    role: "Meditation Coach",
    photo: "/images/coach-12.webp",
    location: "Europe",
    bio: [
      "I work with meditation as a practical tool for emotional stability, focus, and self-discipline. My approach is structured and accessible, helping people build a consistent practice that fits into real life.",
      "I support participants in developing awareness and resilience through techniques that can be applied both during retreats and in everyday situations.",
    ],
    countriesTravelled: "19",
    retreatsAttended: "56",
  },
];

export function getCoach(id) {
  const coach = coaches.find((item) => item.id === id);
  if (!coach) throw new Error(`Unknown coach: ${id}`);
  return coach;
}
