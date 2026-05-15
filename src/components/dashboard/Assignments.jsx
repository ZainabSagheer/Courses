"use client";

import { motion } from 'framer-motion';
import { 
  FileText, Upload, CheckCircle2, Clock, 
  AlertCircle, ChevronRight, FileDown, MessageSquare, Zap, Rocket
} from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';

export const Assignments = () => {
  const assignments = [
    { 
        id: 'BIT-AS-402', 
        title: 'Modern UI Components with Tailwind', 
        course: 'Advanced UI/UX Design', 
        deadline: '24 May, 2024', 
        status: 'pending',
        points: 100
    },
    { 
        id: 'BIT-AS-401', 
        title: 'React State Management Architecture', 
        course: 'Full Stack Web Dev', 
        deadline: '18 May, 2024', 
        status: 'submitted',
        points: 150,
        grade: 'A+'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary" />
          ASSIGNMENTS
        </h2>
        
        <div className="flex gap-4">
            <div className="px-6 py-3 rounded-xl bg-card border border-card-border flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">3 Pending Tasks</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Assignment List */}
        <div className="xl:col-span-2 space-y-6">
            {assignments.map((as, i) => (
                <motion.div
                    key={as.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <TiltCard className="p-8 rounded-[2rem] bg-card border border-card-border group relative overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">{as.id}</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-foreground/20">{as.course}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-4 group-hover:text-primary transition-colors">{as.title}</h3>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-foreground/40">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Due: {as.deadline}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground/40">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{as.points} Points</span>
                                    </div>
                                </div>
                            </div>

                            <div className="shrink-0 flex items-center gap-4">
                                {as.status === 'submitted' ? (
                                    <div className="text-right">
                                        <div className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-1">Submitted</div>
                                        <div className="text-2xl font-black text-emerald-500">{as.grade}</div>
                                    </div>
                                ) : (
                                    <button className="px-8 py-4 rounded-2xl bg-primary text-background font-bold text-[10px] uppercase tracking-widest shadow-[0_0_20px_var(--primary)]/20 hover:scale-105 transition-all flex items-center gap-2">
                                        <Upload className="w-4 h-4" />
                                        Submit
                                    </button>
                                )}
                                <button className="p-4 rounded-2xl bg-card border border-card-border hover:bg-card/80 transition-all text-foreground/20 hover:text-foreground">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>
            ))}
        </div>

        {/* Sidebar - Recent Feedback / Quiz System */}
        <div className="space-y-8">
            <div className="p-8 rounded-[2.5rem] bg-card border border-card-border">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-8">
                    <Rocket className="w-4 h-4 text-primary" />
                    Submit Assignment
                </h3>
                <div className="aspect-square rounded-[2rem] border-2 border-dashed border-card-border flex flex-col items-center justify-center p-8 group cursor-pointer hover:border-primary/50 transition-all">
                    <div className="w-16 h-16 rounded-full bg-card border border-card-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-xs font-bold mb-2">Upload Files</p>
                    <p className="text-[8px] text-foreground/20 font-bold uppercase tracking-widest">PDF, ZIP or GitHub Link</p>
                </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-card border border-card-border">
                 <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-6">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Expert Feedback
                </h3>
                <div className="space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="p-4 rounded-2xl bg-card border border-card-border relative group">
                            <p className="text-[10px] text-foreground/60 leading-relaxed italic mb-3">"Excellent use of CSS variables and custom animations. Focus on accessibility in the next module."</p>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-foreground/10" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-foreground/20">Arch. Zainab • BIT-401</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
