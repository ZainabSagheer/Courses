import { BookOpen, Users, Award, Target, GraduationCap, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "About BITSOL Marketing Institute — Pakistan's Premier Digital Skills Institute",
  description: "Learn about BITSOL Marketing Institute, Lahore's leading institute for Digital Marketing, AI Training, and Stock Exchange Trading courses. Founded to empower Pakistan's digital workforce.",
  alternates: { canonical: "/about" },
};

const stats = [
  { value: "13,800+", label: "Students Trained", icon: Users },
  { value: "6", label: "Premium Courses", icon: BookOpen },
  { value: "3", label: "Expert Instructors", icon: Award },
  { value: "95%", label: "Student Satisfaction", icon: Target },
];

const instructors = [
  {
    name: "Ahmed Ali",
    role: "Digital Marketing & SEO Expert",
    bio: "Certified Google Ads & Facebook Blueprint professional with 12+ years of experience running campaigns for Pakistani and international brands. Ahmed has managed over Rs 50M in ad spend and trained 3,000+ students. Specialises in performance marketing, SEO strategy, and social media growth.",
    courses: ["Digital Media Marketing Masterclass", "Advanced SEO & Growth Hacking"],
    initials: "AA",
  },
  {
    name: "Sarah Khan",
    role: "AI & Automation Specialist",
    bio: "Stanford-certified AI practitioner and former lead engineer at a Lahore-based AI startup. Sarah has 8+ years in machine learning, NLP, and prompt engineering. She has published research on LLM applications for business and trained 2,500+ students in leveraging AI tools like ChatGPT, Midjourney, and LangChain.",
    courses: ["Complete AI & Prompt Engineering", "AI Agents & Automation"],
    initials: "SK",
  },
  {
    name: "Usman Tariq",
    role: "Financial Markets & Trading Expert",
    bio: "Licensed PSX trader and SECP-registered investment advisor with 15+ years of experience in Pakistan Stock Exchange and cryptocurrency markets. Usman has managed portfolios worth Rs 200M+ and trained 7,500+ students. His students average 40% higher returns within their first year of trading.",
    courses: ["Pakistan Stock Exchange Trading", "Crypto Trading Masterclass"],
    initials: "UT",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient">BITSOL Marketing Institute</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Founded in Lahore, BITSOL Marketing Institute is Pakistan's premier digital skills institute empowering the next generation of digital marketers, AI professionals, and financial traders. We believe every Pakistani deserves access to world-class, practical education that leads to real-world careers.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="glass-card p-8 rounded-2xl">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Pakistan's digital economy is growing at an unprecedented rate. With over 65 million internet users and a thriving freelance community contributing $400M+ annually to the economy, the demand for skilled digital professionals has never been higher.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              BITSOL Marketing Institute was founded to bridge the skills gap. Our courses are designed by industry practitioners who work in the Pakistani market daily — not theoretical academics. Every curriculum is built around practical, hands-on projects that students can add to their portfolio immediately.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Whether you want to launch a freelancing career, start your own digital agency, invest in the Pakistan Stock Exchange, or build AI-powered solutions, BITSOL Marketing Institute gives you the skills, mentorship, and community to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Meet Our Instructors</h2>
          <p className="text-foreground/60 text-center mb-12 max-w-2xl mx-auto">Industry experts with verified credentials and real-world experience in Pakistan's digital economy.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((inst, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary mx-auto mb-4">
                  {inst.initials}
                </div>
                <h3 className="text-xl font-bold mb-1">{inst.name}</h3>
                <p className="text-primary text-sm font-medium mb-4">{inst.role}</p>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">{inst.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {inst.courses.map((c, j) => (
                    <span key={j} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-8">Visit Us in Lahore</h2>
          <div className="glass-card p-8 rounded-2xl space-y-4">
            <div className="flex items-center justify-center gap-2 text-foreground/80"><MapPin className="w-5 h-5 text-primary" /> 83/3 C KB Colony Airport Road, Lahore, Pakistan</div>
            <div className="flex items-center justify-center gap-2 text-foreground/80"><Phone className="w-5 h-5 text-primary" /> <a href="https://wa.me/923103175175" className="hover:text-primary">0310 3175175 (WhatsApp)</a></div>
            <div className="flex items-center justify-center gap-2 text-foreground/80"><Mail className="w-5 h-5 text-primary" /> <a href="mailto:info@courses.bitsolmarketing.com" className="hover:text-primary">info@courses.bitsolmarketing.com</a></div>
            <div className="pt-4">
              <Link href="/courses" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg">
                <GraduationCap className="w-5 h-5" /> Explore Our Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
