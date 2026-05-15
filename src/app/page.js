import FeaturedCourses from '@/components/FeaturedCourses';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import CtaBanner from '@/components/CtaBanner';
import FAQ from '@/components/FAQ';

export const metadata = {
  title: "BITSOL Marketing Institute - Master Digital Skills & Financial Freedom",
  description: "Join Pakistan's premier institute for Digital Media Marketing, AI Training, and Stock Exchange Trading. Learn from industry experts and transform your career with BITSOL Marketing Institute.",
  alternates: { canonical: "/" },
};

import { TubesCursor } from '@/components/ui/tube-cursor';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <TubesCursor 
        title="BITSOL"
        subtitle="Institute"
        caption="Pakistan's Premier Digital Institute"
        initialColors={["#00D9FF", "#7C3AED", "#0077FF"]}
        lightColors={["#00D9FF", "#7C3AED", "#FFFFFF", "#00D9FF"]}
        lightIntensity={250}
        titleSize="text-[12vw] md:text-[10vw]"
        subtitleSize="text-[6vw] md:text-[5vw]"
        captionSize="text-sm md:text-base uppercase tracking-[0.3em] font-bold opacity-60"
      />

      {/* Other Sections */}
      <FeaturedCourses />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </>
  );
}
