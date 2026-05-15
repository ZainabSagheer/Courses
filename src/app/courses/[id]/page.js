import { fetchCourseById, courses } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Users, Star, BookOpen, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

// Pre-render known courses at build time; new courses added via admin are rendered dynamically
export function generateStaticParams() {
  return courses.map(course => ({ id: String(course.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const course = await fetchCourseById(id);
  if (!course) return {};
  return {
    title: `${course.title} — ${course.duration} Course in Lahore | BITSOL Marketing`,
    description: `${course.description} ${course.duration} program, ${course.lessons} lessons, ${course.level}. Enroll for ${course.price}. Taught by ${course.instructor} at BITSOL Marketing, Lahore.`,
    alternates: { canonical: `/courses/${course.id}` },
    openGraph: {
      title: `${course.title} | BITSOL Marketing`,
      description: course.description,
      images: [{ url: course.image, alt: course.title }],
    },
  };
}

// Instructor detailed data for E-E-A-T
const instructorBios = {
  "Ahmed Ali": {
    role: "Digital Marketing & SEO Expert",
    bio: "Certified Google Ads & Facebook Blueprint professional with 12+ years of experience. Ahmed has managed over Rs 50M in ad spend and trained 3,000+ students in performance marketing, SEO strategy, and social media growth across Pakistan.",
  },
  "Sarah Khan": {
    role: "AI & Automation Specialist",
    bio: "Stanford-certified AI practitioner with 8+ years in machine learning and prompt engineering. Sarah has published research on LLM applications for business and trained 2,500+ students in ChatGPT, Midjourney, and LangChain.",
  },
  "Usman Tariq": {
    role: "Financial Markets & Trading Expert",
    bio: "Licensed PSX trader and SECP-registered investment advisor with 15+ years of experience. Usman has managed portfolios worth Rs 200M+ and his students average 40% higher returns within their first year.",
  },
};

// Course-specific FAQ data for AEO
const courseFAQs = {
  1: [
    { q: "Is the Digital Marketing course suitable for beginners?", a: "Yes! This course takes you from complete beginner to professional level. No prior marketing experience is needed — we cover everything from scratch including Facebook Ads, Google Ads, and SEO." },
    { q: "Do I get a certificate after completing this course?", a: "Yes, upon completing all modules and assignments, you receive a BITSOL Marketing Certificate of Completion that you can add to your LinkedIn profile and resume." },
    { q: "Can I pay for this course in installments?", a: "Yes, we offer a 2-installment payment plan. Contact us via WhatsApp at 0310-3175175 to arrange installment payments." },
  ],
  2: [
    { q: "What AI tools will I learn in this course?", a: "You'll master ChatGPT, Midjourney, Claude, DALL-E, and various AI automation tools. The course covers practical prompt engineering techniques and how to integrate AI into your daily workflow." },
    { q: "Do I need coding experience for the AI course?", a: "No coding experience is required. The course is designed for all levels — from business professionals to students. We focus on practical usage, not programming." },
    { q: "Will this course help me earn money with AI?", a: "Absolutely. You'll learn to offer AI services as a freelancer, automate business tasks, and create AI-powered content — skills that are in high demand on platforms like Fiverr and Upwork." },
  ],
  3: [
    { q: "Is stock trading legal in Pakistan?", a: "Yes, trading on the Pakistan Stock Exchange (PSX) is fully legal and regulated by the Securities and Exchange Commission of Pakistan (SECP). Our course teaches you how to trade within all legal frameworks." },
    { q: "How much money do I need to start trading on PSX?", a: "You can start with as little as Rs 5,000. Our course teaches you proper risk management so you can grow your portfolio gradually without taking excessive risks." },
    { q: "What is the Pakistan Stock Exchange (PSX)?", a: "The Pakistan Stock Exchange is the country's premier securities exchange, based in Karachi. It lists 500+ companies and is one of Asia's best-performing markets. Our course teaches you to analyse and trade PSX stocks profitably." },
  ],
};

const defaultFAQs = [
  { q: "Is this course right for me?", a: "This course is designed for motivated learners at the stated level. Whether you're a student, professional, or career changer, our practical curriculum will give you real-world skills." },
  { q: "Do I get a certificate?", a: "Yes, all BITSOL Marketing courses include a Certificate of Completion upon finishing all modules." },
  { q: "Can I access the course on mobile?", a: "Yes, our platform is fully responsive. You can learn on desktop, tablet, or mobile from anywhere." },
];

export default async function CourseDetailsPage({ params }) {
  const { id } = await params;
  const course = await fetchCourseById(id);

  if (!course) {
    notFound();
  }

  const instData = instructorBios[course.instructor] || { role: "Expert Instructor", bio: "Industry expert with years of experience." };
  const faqs = courseFAQs[course.id] || defaultFAQs;

  const features = [
    "Lifetime access to course materials",
    "Real-world projects & case studies",
    "1-on-1 mentorship & support",
    "Certificate of completion",
    "Access to exclusive student community",
    "Weekly live Q&A sessions"
  ];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "BITSOL Marketing",
      url: "https://course.bitsolmarketing.com",
      address: { "@type": "PostalAddress", streetAddress: "83/3 C KB Colony Airport Road", addressLocality: "Lahore", addressCountry: "PK" },
    },
    instructor: { "@type": "Person", name: course.instructor, jobTitle: instData.role },
    offers: {
      "@type": "Offer",
      price: course.numericPrice,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `https://course.bitsolmarketing.com/courses/${course.id}/`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: course.rating,
      bestRating: "5",
      ratingCount: String(course.students).replace('k', '000').replace('.', ''),
    },
    timeRequired: `P${String(course.duration).replace(' Weeks', 'W')}`,
    numberOfLessons: course.lessons,
    educationalLevel: course.level,
    inLanguage: "en",
    image: course.image,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://course.bitsolmarketing.com/" },
      { "@type": "ListItem", position: 2, name: "Courses", item: "https://course.bitsolmarketing.com/courses/" },
      { "@type": "ListItem", position: 3, name: course.title, item: `https://course.bitsolmarketing.com/courses/${course.id}/` },
    ],
  };

  return (
    <div className="min-h-screen pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto px-6 pt-4 pb-2" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-foreground/50">
          <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
          <li>/</li>
          <li className="text-foreground/80 font-medium truncate max-w-[200px]">{course.title}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-32 border-b border-card-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent z-20" />
        </div>

        <div className="container mx-auto px-6 relative z-30">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 font-semibold rounded-full text-sm">
                {course.category}
              </span>
              <span className="px-4 py-1.5 glass font-semibold rounded-full text-sm">
                {course.level}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {course.title}
            </h1>

            <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-foreground/70">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-foreground">{course.rating} Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{course.students} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{course.lessons} Lessons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column */}
          <div className="lg:w-2/3 space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 glass-card rounded-xl">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Who Is This Course For?</h2>
              <div className="glass-card p-8 rounded-2xl space-y-3 text-foreground/80">
                <p>This course is ideal for anyone looking to build practical skills in {course.category.toLowerCase()}. Whether you're a:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span>Complete beginner exploring a new career path</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span>Working professional looking to upskill</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span>Freelancer wanting to expand your service offerings</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> <span>Entrepreneur aiming to grow your business</span></li>
                </ul>
                <p className="pt-2">No prerequisites required — our {course.duration} program takes you from fundamentals to advanced concepts.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">About the Instructor</h2>
              <div className="glass-card p-8 rounded-2xl flex flex-col sm:flex-row items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary shrink-0">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{course.instructor}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{instData.role}</p>
                  <p className="text-foreground/70 leading-relaxed">{instData.bio}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="glass-card p-6 rounded-2xl">
                    <h3 className="font-bold text-lg mb-3">{faq.q}</h3>
                    <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Checkout */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 glass-card p-8 rounded-2xl border border-primary/20 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
              <div className="mb-6">
                <span className="text-sm text-foreground/60 font-medium">Full Course Price</span>
                <div className="text-5xl font-black text-gradient mt-1">{course.price}</div>
              </div>

              <Link
                href={`/courses/${course.id}/checkout`}
                className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:-translate-y-1"
              >
                Enroll Now <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="space-y-4 pt-6 border-t border-card-border mt-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium">Secure Payment Processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">Instant Lifetime Access</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium">{course.lessons} Lessons · {course.duration}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
