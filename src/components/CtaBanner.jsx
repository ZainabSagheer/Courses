"use client";
import { WordsPullUp } from './ui/typography';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CtaBanner() {
  return (
    <section className="py-32 relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="relative p-12 md:p-24 rounded-[3rem] glass text-center overflow-hidden group shadow-2xl">
          {/* Animated Background Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D9FF]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#00D9FF]/10 transition-colors duration-1000" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7C3AED]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <WordsPullUp 
              text="Ready to Transform Your Career?" 
              className="text-4xl md:text-7xl font-medium tracking-tighter mb-8 justify-center text-glow"
              style={{ color: "#00D9FF" }}
              showAsterisk
            />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-foreground/60 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-16"
            >
              Join thousands of successful students who have mastered digital skills with BITSOL Marketing Institute. Your journey to financial freedom starts here.
            </motion.p>
            
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link 
                href="/courses" 
                className="group inline-flex items-center gap-4 py-5 px-12 rounded-full bg-primary text-background font-bold uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-all duration-500 shadow-2xl"
              >
                Start Learning Today 
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
