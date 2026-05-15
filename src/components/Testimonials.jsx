"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordsPullUp } from './ui/typography';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TiltCard } from "./ui/tilt-card";

const testimonials = [
  {
    id: 1,
    name: "Ahmad Raza",
    role: "Freelance Marketer",
    content: "The Digital Media Marketing course changed my life. Within 2 months of completing the course, I secured my first international client. The practical approach at BITSOL is unmatched.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "AI Developer",
    content: "I started with zero coding knowledge. The AI & Prompt Engineering bootcamp gave me the confidence to build my own applications. The trainers are incredibly supportive.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Usman Ali",
    role: "Day Trader",
    content: "The PSX Trading course provided the exact roadmap I needed to understand the market. I'm now trading profitably and managing my own portfolio thanks to the live sessions.",
    image: "https://randomuser.me/api/portraits/men/86.jpg"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 relative bg-transparent overflow-hidden" id="testimonials">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <WordsPullUp 
            text="Success Stories" 
            className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 text-glow"
            style={{ color: "#00D9FF" }}
            showAsterisk
          />
        </div>

        <div className="max-w-5xl mx-auto relative px-12">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 z-20">
            <button 
              onClick={prev}
              className="p-4 rounded-full border border-card-border bg-white/5 text-primary hover:bg-primary hover:text-background transition-all duration-500 shadow-2xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 z-20">
            <button 
              onClick={next}
              className="p-4 rounded-full border border-card-border bg-white/5 text-primary hover:bg-primary hover:text-background transition-all duration-500 shadow-2xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="relative aspect-[16/9] md:aspect-[21/9] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex items-center justify-center"
              >
                <TiltCard 
                    className="w-full max-w-4xl p-12 md:p-20 rounded-[3rem] glass shadow-2xl"
                    tiltLimit={5}
                    perspective={2000}
                    spotlight={true}
                >
                    <div className="relative z-10 text-center">
                        <Quote className="w-12 h-12 text-[#00D9FF]/10 mx-auto mb-12" />
                        
                        <p className="text-2xl md:text-4xl font-light text-foreground leading-[1.3] tracking-tight mb-12">
                        "{testimonials[currentIndex].content}"
                        </p>
                        
                        <div className="flex items-center justify-center gap-6 text-left">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#00D9FF]/20 blur-xl rounded-full" />
                            <img 
                            src={testimonials[currentIndex].image} 
                            alt={testimonials[currentIndex].name} 
                            className="w-14 h-14 rounded-full border border-white/20 relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <div>
                            <h4 className="font-medium text-lg text-foreground">{testimonials[currentIndex].name}</h4>
                            <span className="text-primary text-xs uppercase tracking-[0.2em] font-bold">{testimonials[currentIndex].role}</span>
                        </div>
                        </div>
                    </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-16">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-0.5 transition-all duration-700 ${
                  idx === currentIndex ? 'w-12 bg-primary' : 'w-4 bg-card-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
