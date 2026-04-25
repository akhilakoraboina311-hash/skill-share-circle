import pottery from "@/assets/course-pottery.jpg";
import writing from "@/assets/course-writing.jpg";
import music from "@/assets/course-music.jpg";
import painting from "@/assets/course-painting.jpg";
import bread from "@/assets/course-bread.jpg";
import code from "@/assets/course-code.jpg";

export type Course = {
  slug: string;
  title: string;
  category: string;
  instructor: string;
  instructorRole: string;
  cover: string;
  rating: number;
  reviews: number;
  students: number;
  hours: number;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  excerpt: string;
  about: string;
  curriculum: { title: string; minutes: number }[];
  testimonials: { name: string; role: string; rating: number; text: string }[];
};

export const courses: Course[] = [
  {
    slug: "throw-your-first-pot",
    title: "Throw Your First Pot",
    category: "Ceramics",
    instructor: "Marisol Vega",
    instructorRole: "Studio potter, Oaxaca",
    cover: pottery,
    rating: 4.9,
    reviews: 1284,
    students: 8240,
    hours: 6,
    lessons: 18,
    level: "Beginner",
    price: 39,
    excerpt: "Center clay, pull walls, and finish a mug you'll actually use — taught hand-over-hand.",
    about:
      "A patient, peer-paced introduction to the wheel. Marisol guides you from wedging clay through your first finished mug, with weekly studio reviews from fellow learners.",
    curriculum: [
      { title: "The studio, your tools, the clay", minutes: 14 },
      { title: "Wedging without bruising the clay", minutes: 22 },
      { title: "Centering — the only skill that matters", minutes: 38 },
      { title: "Opening the floor", minutes: 24 },
      { title: "Pulling your first wall", minutes: 31 },
      { title: "Trimming and the foot ring", minutes: 27 },
      { title: "Handles that feel right", minutes: 19 },
      { title: "Glazing for first-timers", minutes: 33 },
    ],
    testimonials: [
      { name: "Iris L.", role: "Hobbyist", rating: 5, text: "I've watched a dozen pottery videos. This is the first one that made my hands actually understand." },
      { name: "Daniel K.", role: "Architect", rating: 5, text: "The peer reviews kept me coming back. Made three mugs in a month." },
    ],
  },
  {
    slug: "modern-calligraphy",
    title: "Modern Calligraphy, Slowly",
    category: "Lettering",
    instructor: "Hana Park",
    instructorRole: "Letterer & type designer",
    cover: writing,
    rating: 4.8,
    reviews: 902,
    students: 5410,
    hours: 4,
    lessons: 12,
    level: "Beginner",
    price: 29,
    excerpt: "Learn the breath, pressure and rhythm behind lettering that feels alive on the page.",
    about:
      "A meditative course on brush lettering. Hana shares the same warm-up drills she's used for a decade and reviews student work in a weekly class circle.",
    curriculum: [
      { title: "Choosing your first pen", minutes: 9 },
      { title: "Posture, breath, pressure", minutes: 16 },
      { title: "Basic strokes", minutes: 22 },
      { title: "Lowercase letterforms", minutes: 28 },
      { title: "Connections and rhythm", minutes: 24 },
      { title: "Composing a card", minutes: 30 },
    ],
    testimonials: [
      { name: "Yuki T.", role: "Designer", rating: 5, text: "Felt like a quiet Sunday afternoon. I'll be back for her next course." },
    ],
  },
  {
    slug: "fingerstyle-guitar",
    title: "Fingerstyle Guitar from Scratch",
    category: "Music",
    instructor: "Theo Mensah",
    instructorRole: "Touring guitarist",
    cover: music,
    rating: 4.9,
    reviews: 2103,
    students: 12480,
    hours: 9,
    lessons: 26,
    level: "Beginner",
    price: 49,
    excerpt: "Play three full songs by week four. No music theory degree required.",
    about:
      "Theo breaks fingerstyle into the smallest possible pieces. Practice along with the metronome, then share a 30-second clip with the cohort each week.",
    curriculum: [
      { title: "Holding the guitar like you mean it", minutes: 11 },
      { title: "Right hand independence", minutes: 18 },
      { title: "First pattern: Travis picking", minutes: 25 },
      { title: "Chord shapes that sound full", minutes: 22 },
      { title: "Your first song: Landslide", minutes: 34 },
    ],
    testimonials: [
      { name: "Priya S.", role: "Student", rating: 5, text: "Played for my mom on her birthday. She cried. So did I." },
    ],
  },
  {
    slug: "watercolor-everyday",
    title: "Watercolor for the Everyday",
    category: "Painting",
    instructor: "Elena Brandt",
    instructorRole: "Illustrator",
    cover: painting,
    rating: 4.7,
    reviews: 678,
    students: 4120,
    hours: 5,
    lessons: 14,
    level: "Beginner",
    price: 35,
    excerpt: "Loose, joyful watercolors of fruit, mugs, and morning light.",
    about: "A warm intro to watercolor that prizes feeling over precision.",
    curriculum: [
      { title: "Paper, paint, patience", minutes: 12 },
      { title: "Wet on wet", minutes: 20 },
      { title: "A persimmon in three strokes", minutes: 18 },
    ],
    testimonials: [
      { name: "Marco V.", role: "Beginner", rating: 5, text: "Elena's voice alone is worth the price." },
    ],
  },
  {
    slug: "sourdough-from-scratch",
    title: "Sourdough, From Scratch",
    category: "Cooking",
    instructor: "Jonas Albrecht",
    instructorRole: "Bakery owner",
    cover: bread,
    rating: 4.9,
    reviews: 1820,
    students: 9670,
    hours: 7,
    lessons: 16,
    level: "Intermediate",
    price: 45,
    excerpt: "From wild starter to a crackling crust — and the science behind every fold.",
    about:
      "Jonas walks you through a real bakery week: starter, autolyse, bulk ferment, shape, score, bake. Bring questions, leave with bread.",
    curriculum: [
      { title: "Feeding a starter that doesn't quit", minutes: 18 },
      { title: "Autolyse and salt", minutes: 14 },
      { title: "Bulk ferment by feel", minutes: 26 },
      { title: "Shaping a boule", minutes: 22 },
      { title: "Scoring and the bake", minutes: 28 },
    ],
    testimonials: [
      { name: "Aiko F.", role: "Home baker", rating: 5, text: "Best loaf of my life on attempt three. Jonas reads the cohort posts." },
    ],
  },
  {
    slug: "build-your-first-app",
    title: "Build Your First Web App",
    category: "Code",
    instructor: "Sam Okafor",
    instructorRole: "Senior engineer",
    cover: code,
    rating: 4.8,
    reviews: 3402,
    students: 18900,
    hours: 12,
    lessons: 32,
    level: "Beginner",
    price: 59,
    excerpt: "Ship a real app to the internet. No prior coding required, just curiosity.",
    about:
      "A friendly, project-based path from zero to a deployed app. Pair-program with peers in weekly co-working rooms.",
    curriculum: [
      { title: "How the web actually works", minutes: 16 },
      { title: "Your first HTML page", minutes: 22 },
      { title: "Styling with Tailwind", minutes: 30 },
      { title: "A pinch of JavaScript", minutes: 28 },
      { title: "Deploying to the world", minutes: 24 },
    ],
    testimonials: [
      { name: "Lia G.", role: "Career changer", rating: 5, text: "I shipped something. Me. I shipped a real thing on the real internet." },
    ],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
