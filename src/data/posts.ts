// Sample Pupdates. Replace with real posts, or load them from your API later.
export interface Post { id: string; title: { en: string; si: string }; excerpt: { en: string; si: string } }

export const posts: Post[] = [
  {
    id: "welcome",
    title: { en: "Welcome to Pupdates", si: "Pupdates වෙත සාදරයෙන් පිළිගනිමු" },
    excerpt: {
      en: "Rescue stories, adoption news and tips from the StrayCare team will appear here.",
      si: "StrayCare කණ්ඩායමෙන් ගලවා ගැනීම් කතා, හදාවඩා ගැනීම් පුවත් සහ උපදෙස් මෙහි පළ වේ.",
    },
  },
  {
    id: "neuter",
    title: { en: "Why we vaccinate and neuter", si: "අපි එන්නත් කරන්නේ සහ වන්ධ්‍යාකරණය කරන්නේ ඇයි?" },
    excerpt: {
      en: "Vaccination protects animals and people. Neutering keeps street populations healthy and stable.",
      si: "එන්නත් මගින් සතුන් සහ මිනිසුන් ආරක්ෂා වේ. වන්ධ්‍යාකරණය මගින් වීදි සත්ව ගහනය සෞඛ්‍ය සම්පන්නව පවතී.",
    },
  },
  {
    id: "prepare",
    title: { en: "Getting your home ready for a new pet", si: "නව සුරතලෙකු සඳහා ඔබේ නිවස සූදානම් කරන ආකාරය" },
    excerpt: {
      en: "A quiet corner, fresh water and patience go a long way in the first week.",
      si: "නිහඬ කොනක්, පිරිසිදු ජලය සහ ඉවසීම පළමු සතියේදී ඉතා වැදගත් වේ.",
    },
  },
];
