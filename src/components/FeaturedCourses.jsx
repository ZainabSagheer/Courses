"use client";
import { useState, useEffect } from 'react';
import { WordsPullUp } from './ui/typography';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { courses as staticCourses, fetchCourses } from '@/lib/data';
import { TiltCard } from './ui/tilt-card';
import Link from 'next/link';

export default function FeaturedCourses() {
  const [courses, setCourses] = useState(staticCourses.slice(0, 3));

  useEffect(() => {
    fetchCourses().then(data => setCourses(data.slice(0, 3)));
  }, []);

  return (
    <section className="py-32 relative bg-transparent overflow-hidden" id="courses">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          <WordsPullUp
            text="Featured Courses"
            className="text-5xl md:text-7xl font-medium tracking-tighter mb-6 text-glow"
            style={{ color: "#00D9FF" }}
            showAsterisk
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-foreground/60 max-w-xl text-lg font-light leading-relaxed"
          >
            Elevate your skills with our top-rated programs designed for real-world success in Pakistan's growing digital economy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard
                className="h-full rounded-[2.5rem] glass"
                tiltLimit={10}
                perspective={1500}
                scale={1.02}
              >
                <div className="group cursor-pointer p-3 h-full flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 bg-[#0F172A]">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-2 bg-[#00D9FF]/20 backdrop-blur-md text-[#00D9FF] text-[10px] uppercase tracking-widest font-bold rounded-full border border-[#00D9FF]/20">
                        {course.category}
                      </span>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10">
                       <div className="flex items-center gap-4 text-[10px] text-foreground/40 uppercase tracking-widest mb-3 font-medium">
                          <span>{course.duration}</span>
                          <span className="w-1 h-1 bg-foreground/20 rounded-full" />
                          <span>{course.students} Students</span>
                       </div>
                       <h3 className="text-3xl font-medium text-foreground leading-tight line-clamp-2 group-hover:text-[#00D9FF] transition-colors">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-6 pb-6 mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-foreground/20 font-bold mb-1">Tuition</span>
                        <span className="text-2xl font-medium text-[#00D9FF]">{course.price}</span>
                    </div>
                    <Link href={`/courses/${course.id}`} className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                      <div className="p-4 rounded-full bg-white/5 border border-white/10 text-[#00D9FF] group-hover:bg-[#00D9FF] group-hover:text-black transition-all shadow-2xl">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <Link
            href="/courses"
            className="group flex items-center gap-4 py-4 px-10 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/10 text-[#00D9FF] hover:bg-[#00D9FF] hover:text-black transition-all duration-500 shadow-xl"
          >
            <span className="text-sm font-bold uppercase tracking-widest">View All Courses</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
