export type Course = {
  id: string;
  title: string;
  instructor: string;
  category: string;
  description: string;
  thumbnail: string;
  videoUrl: string; // YouTube embed URL
  duration: string;
  enrolled: number;
};

export const ALL_COURSES: Course[] = [
  {
    id: "c1",
    title: "Intro to Web Development",
    instructor: "Aarav Mehta",
    category: "Programming",
    description:
      "Learn the fundamentals of HTML, CSS, and JavaScript. Build your first responsive website from scratch with hands-on projects designed for absolute beginners.",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
    videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
    duration: "6h 30m",
    enrolled: 1240,
  },
  {
    id: "c2",
    title: "Python for Data Analysis",
    instructor: "Dr. Priya Sharma",
    category: "Data Science",
    description:
      "Master pandas, NumPy and matplotlib. Analyze real datasets, build clean visualizations, and uncover insights using practical Python.",
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=500&fit=crop",
    videoUrl: "https://www.youtube.com/embed/r-uOLxNrNk8",
    duration: "8h 15m",
    enrolled: 980,
  },
  {
    id: "c3",
    title: "Watercolor Painting Basics",
    instructor: "Sofia Romano",
    category: "Art & Design",
    description:
      "A peaceful, beginner-friendly journey into watercolor. Brush techniques, color mixing, and your first three landscape paintings.",
    thumbnail:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=500&fit=crop",
    videoUrl: "https://www.youtube.com/embed/1Ne1cR5Pg7E",
    duration: "4h 00m",
    enrolled: 612,
  },
  {
    id: "c4",
    title: "Public Speaking Confidence",
    instructor: "Marcus Hill",
    category: "Communication",
    description:
      "Overcome stage fright, structure your message, and deliver talks that move an audience. Practical exercises in every lesson.",
    thumbnail:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=500&fit=crop",
    videoUrl: "https://www.youtube.com/embed/AykYRO5d_lI",
    duration: "3h 45m",
    enrolled: 845,
  },
  {
    id: "c5",
    title: "Guitar for Absolute Beginners",
    instructor: "Leo Park",
    category: "Music",
    description:
      "Your first chords, strumming patterns, and three full songs you can play by the end. No prior experience needed.",
    thumbnail:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=500&fit=crop",
    videoUrl: "https://www.youtube.com/embed/BBz-Jyq23dc",
    duration: "5h 20m",
    enrolled: 1530,
  },
  {
    id: "c6",
    title: "Photography Composition",
    instructor: "Hana Tanaka",
    category: "Photography",
    description:
      "Master the rule of thirds, leading lines, and storytelling through your lens — works on any phone or camera.",
    thumbnail:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=500&fit=crop",
    videoUrl: "https://www.youtube.com/embed/7ZVyNjKSr0M",
    duration: "2h 50m",
    enrolled: 432,
  },
];

// Mock: courses that the student has enrolled in
export const MY_ENROLLED_IDS = ["c1", "c5"];

// Mock: courses created by the professor
export const PROFESSOR_COURSES = ["c2", "c4"];

// Mock activity data
export const ACTIVITY = {
  daily: [
    { label: "Mon", hours: 1.2 },
    { label: "Tue", hours: 0.5 },
    { label: "Wed", hours: 2.1 },
    { label: "Thu", hours: 1.8 },
    { label: "Fri", hours: 0.9 },
    { label: "Sat", hours: 2.6 },
    { label: "Sun", hours: 1.4 },
  ],
  todayHours: 1.4,
  weekHours: 10.5,
  monthHours: 38.2,
};

export const PROFESSOR_ANALYTICS = {
  c2: { views: 4820, engagement: 68, reach: 12400 },
  c4: { views: 3120, engagement: 74, reach: 8800 },
};

export const findCourse = (id: string) => ALL_COURSES.find((c) => c.id === id);
