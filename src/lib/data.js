import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Static course catalog — used as immediate fallback while Firestore loads
// and for SSG (generateStaticParams). Keep in sync with Firestore via admin panel.
export const courses = [
  {
    id: 1,
    title: "Digital Media Marketing Masterclass",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Marketing",
    rating: 4.9,
    students: "2.4k",
    duration: "8 Weeks",
    price: "Rs 15,000",
    numericPrice: 15000,
    level: "Beginner to Pro",
    description: "Master Facebook, Instagram, Google Ads, and SEO. Learn to build high-converting campaigns from scratch and start your own agency.",
    instructor: "Ahmed Ali",
    lessons: 48
  },
  {
    id: 2,
    title: "Complete AI & Prompt Engineering",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "AI",
    rating: 5.0,
    students: "1.8k",
    duration: "6 Weeks",
    price: "Rs 20,000",
    numericPrice: 20000,
    level: "All Levels",
    description: "Unlock the power of ChatGPT, Midjourney, and AI automation. Learn to integrate AI into your workflow and 10x your productivity.",
    instructor: "Sarah Khan",
    lessons: 35
  },
  {
    id: 3,
    title: "Pakistan Stock Exchange Trading",
    image: "/images/psx_trading.png",
    category: "Trading",
    rating: 4.8,
    students: "3.1k",
    duration: "10 Weeks",
    price: "Rs 25,000",
    numericPrice: 25000,
    level: "Intermediate",
    description: "A complete guide to investing in the PSX. Learn technical analysis, fundamental analysis, and risk management strategies to build wealth.",
    instructor: "Usman Tariq",
    lessons: 60
  },
  {
    id: 4,
    title: "Advanced SEO & Growth Hacking",
    image: "/images/seo_growth.png",
    category: "Marketing",
    rating: 4.7,
    students: "1.2k",
    duration: "4 Weeks",
    price: "Rs 12,000",
    numericPrice: 12000,
    level: "Advanced",
    description: "Learn advanced technical SEO, link-building strategies, and viral growth hacking techniques to dominate search engine rankings.",
    instructor: "Ahmed Ali",
    lessons: 25
  },
  {
    id: 5,
    title: "Crypto Trading Masterclass",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Trading",
    rating: 4.9,
    students: "4.5k",
    duration: "8 Weeks",
    price: "Rs 30,000",
    numericPrice: 30000,
    level: "Beginner",
    description: "Master Bitcoin and Altcoin trading. Understand blockchain technology, DeFi, and how to read crypto charts like a professional.",
    instructor: "Usman Tariq",
    lessons: 50
  },
  {
    id: 6,
    title: "AI Agents & Automation",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "AI",
    rating: 4.9,
    students: "800",
    duration: "6 Weeks",
    price: "Rs 22,000",
    numericPrice: 22000,
    level: "Advanced",
    description: "Build autonomous AI agents using LangChain and AutoGPT. Automate complex business tasks and create scalable AI software solutions.",
    instructor: "Sarah Khan",
    lessons: 40
  }
];

// Synchronous static lookup — used for SSG metadata generation
export function getCourseById(id) {
  return courses.find(course => course.id === parseInt(id)) || null;
}

// ── Firestore helpers (synced with admin.bitsolmarketing.com) ─────────────────

function normalizeCourse(data, docId) {
  return {
    ...data,
    id: typeof data.id === 'number' ? data.id : parseInt(docId) || docId,
  };
}

// Fetch all courses from Firestore; falls back to static data if unavailable
export async function fetchCourses() {
  try {
    const snapshot = await getDocs(collection(db, 'courses'));
    if (snapshot.empty) return courses;
    return snapshot.docs.map(d => normalizeCourse(d.data(), d.id));
  } catch {
    return courses;
  }
}

// Fetch a single course by numeric ID from Firestore; falls back to static data
export async function fetchCourseById(id) {
  try {
    const docRef = doc(db, 'courses', String(id));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return normalizeCourse(docSnap.data(), docSnap.id);
  } catch {}
  return getCourseById(id);
}
