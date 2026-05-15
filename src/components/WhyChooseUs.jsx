"use client";
import { motion } from "framer-motion";
import { WordsPullUp } from './ui/typography';
import { Award, BookOpen, HeadphonesIcon, TrendingUp, ArrowUpRight } from 'lucide-react';
import { TiltCard } from "./ui/tilt-card";

const features = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Expert Trainers",
    description: "Learn from industry professionals with years of real-world experience."
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Practical Learning",
    description: "Focus on hands-on projects and case studies that prepare you for the job market."
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: "Lifetime Support",
    description: "Get access to our exclusive community and lifetime support for your queries."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Career Growth",
    description: "Dedicated placement assistance and freelance guidance for top students."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 relative bg-transparent overflow-hidden" id="why-us">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-24">
          <div className="lg:w-1/2">
            <div className="mb-16">
              <WordsPullUp 
                text="Why Choose BITSOL?" 
                className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 text-glow"
                style={{ color: "#00D9FF" }}
                showAsterisk
              />
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-foreground/60 max-w-lg text-lg font-light leading-relaxed mb-12"
              >
                We don't just teach theory; we build careers. Our curriculum is designed around the latest industry trends, ensuring you gain skills that are immediately applicable.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard 
                    className="h-full rounded-[2.5rem] glass"
                    tiltLimit={8}
                    scale={1.03}
                    perspective={1000}
                  >
                    <div className="group p-8 h-full flex flex-col cursor-default">
                      <div className="mb-6 p-3 w-fit rounded-full bg-white/5 border border-white/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-medium mb-3 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-sm text-foreground/40 group-hover:text-foreground/60 transition-colors leading-relaxed">{feature.description}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 sticky top-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard 
                className="relative aspect-square md:aspect-[4/5] lg:aspect-square overflow-hidden rounded-[3rem] border border-card-border shadow-2xl"
                tiltLimit={5}
                perspective={2000}
              >
                <div className="absolute inset-0 bg-black/40 z-10 hover:bg-transparent transition-colors duration-700" />
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Students learning" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105"
                />
                <div className="absolute bottom-12 left-12 z-20">
                    <div className="flex items-center gap-4 py-3 px-6 rounded-full bg-background/90 backdrop-blur-xl border border-card-border text-primary shadow-2xl">
                      <span className="text-xs font-bold uppercase tracking-widest">Join our community</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
