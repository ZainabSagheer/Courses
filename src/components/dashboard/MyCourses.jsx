"use client";

import { motion } from 'framer-motion';
import { 
  PlayCircle, Clock, BookOpen, Search, 
  Filter, Star, ArrowUpRight, GraduationCap
} from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';
import Link from 'next/link';

export const MyCourses = ({ enrolledCourses }) => {
  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2">MY COURSES</h2>
            <p className="text-foreground/40 text-sm font-light">Access your curriculum and track progress.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/20" />
            <input 
              type="text" 
              placeholder="Filter courses..." 
              className="bg-card border border-card-border rounded-xl py-2 pl-9 pr-4 text-[10px] focus:outline-none focus:border-primary/30 transition-all"
            />
          </div>
          <button className="p-2 rounded-xl bg-card border border-card-border hover:bg-card/80 transition-all">
            <Filter className="w-4 h-4 text-foreground/40" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {enrolledCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <TiltCard className="group rounded-[2rem] bg-card border border-card-border overflow-hidden flex flex-col h-full">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/60 backdrop-blur-md border border-card-border text-[10px] font-bold text-primary">
                  {course.category || 'Architecture'}
                </div>
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-2 border-primary p-0.5">
                            <img src="/placeholder-avatar.jpg" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/80">Dr. Smith</span>
                    </div>
                   <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[10px] font-black">4.9</span>
                   </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-4 line-clamp-1 group-hover:text-primary transition-colors">{course.title}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-8 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    24h Total
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    12 Modules
                  </div>
                </div>

                <div className="mt-auto space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                      <span className="text-primary">Progress: {course.progress}%</span>
                      <span className="text-foreground/20">4 Days Remaining</span>
                    </div>
                    <div className="h-1 w-full bg-card rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-purple-600 shadow-[0_0_10px_var(--primary)]" 
                      />
                    </div>
                  </div>

                  <Link href={`/dashboard/course/${course.id}`} className="block">
                    <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-card border border-card-border group-hover:bg-primary group-hover:text-background transition-all font-bold text-[10px] uppercase tracking-[0.2em]">
                      <PlayCircle className="w-4 h-4" />
                      Continue Learning
                    </button>
                  </Link>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
        
        {/* Recommended Card */}
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
        >
            <div className="h-full rounded-[2rem] border border-dashed border-card-border flex flex-col items-center justify-center p-8 text-center group hover:border-primary/30 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-card border border-card-border flex items-center justify-center text-foreground/20 mb-6 group-hover:scale-110 group-hover:text-primary transition-all">
                    <Search className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Explore Courses</h3>
                <p className="text-xs text-foreground/40 mb-6 font-light">Recommended based on your interests</p>
                <button className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                    Browse All <ArrowUpRight className="w-3 h-3" />
                </button>
            </div>
        </motion.div>
      </div>
    </div>
  );
};
