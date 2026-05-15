"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { WordsPullUp } from "./typography";

/* ---------------- Hero ---------------- */
const navItems = ["Courses", "Mentorship", "Workshops", "Bootcamps", "Enroll Now"];

const PrismaHero = () => {
  return (
    <section className="h-screen w-full p-4 md:p-6 bg-transparent">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] shadow-2xl">
        
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
        />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Navbar */}
        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14 shadow-lg border border-white/10 border-t-0">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] transition-colors sm:text-xs md:text-sm font-medium tracking-wide"
                style={{ color: "rgba(0, 217, 255, 0.8)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00D9FF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0, 217, 255, 0.8)")}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-8 md:px-12">
          <div className="grid grid-cols-12 items-end gap-6">
            
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                style={{ color: "#00D9FF" }}
              >
                <WordsPullUp text="BITSOL" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-6 lg:col-span-4 lg:pb-12">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-white/80 sm:text-base md:text-lg font-light tracking-wide drop-shadow-sm"
                style={{ lineHeight: 1.4 }}
              >
                BITSOL Marketing is Pakistan's premier institute for Digital Media Marketing, AI Training, and Stock Exchange Trading. Join us to unlock your true potential.
              </motion.p>

              <motion.a
                href="#courses"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-3 self-start rounded-full bg-[#00D9FF] py-1.5 pl-6 pr-1.5 text-sm font-semibold text-black shadow-xl hover:shadow-2xl transition-all hover:gap-4 sm:text-base hover:bg-white"
              >
                Explore Courses
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-12 sm:w-12 shadow-inner">
                  <ArrowRight className="h-5 w-5" style={{ color: "#00D9FF" }} />
                </span>
              </motion.a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
