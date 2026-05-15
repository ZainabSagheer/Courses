"use client";

import { motion } from 'framer-motion';
import { 
  GraduationCap, FileText, Download, TrendingUp, 
  AlertTriangle, Calendar, CheckCircle2, ChevronRight
} from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';

export const ExaminationPortal = () => {
  return (
    <div className="space-y-12 pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* GPA & Results Summary */}
        <div className="xl:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Cumulative GPA', value: '3.85', color: 'var(--primary)' },
                    { label: 'Current Semester', value: '3.92', color: '#7C3AED' },
                    { label: 'Credits Sync', value: '42 / 60', color: '#10B981' },
                ].map((stat, i) => (
                    <TiltCard key={i} className="p-6 rounded-3xl bg-card border border-card-border relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: stat.color }} />
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/20 mb-2">{stat.label}</h4>
                        <p className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                    </TiltCard>
                ))}
            </div>

            <TiltCard className="p-8 rounded-[2.5rem] bg-card border border-card-border">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        Examination History
                    </h3>
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                        <Download className="w-3.5 h-3.5" /> Full Transcript PDF
                    </button>
                </div>

                <div className="space-y-4">
                    {[
                        { code: 'CS-401', title: 'Data Structures & Algorithms', date: 'Dec 2023', grade: 'A', points: '4.0' },
                        { code: 'UI-202', title: 'Interface Architecture', date: 'Nov 2023', grade: 'A-', points: '3.7' },
                        { code: 'DB-105', title: 'Neural Database Design', date: 'Oct 2023', grade: 'B+', points: '3.3' },
                    ].map((res, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-card border border-card-border hover:border-foreground/10 transition-all group">
                            <div className="flex items-center gap-6">
                                <div className="p-4 rounded-xl bg-card border border-card-border text-foreground/20 font-black text-xs group-hover:text-primary transition-colors">
                                    {res.code}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm mb-1">{res.title}</h4>
                                    <p className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest">{res.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <div className="text-lg font-black text-foreground">{res.grade}</div>
                                    <div className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest">{res.points} GP</div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-foreground/10 group-hover:text-foreground transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </TiltCard>
        </div>

        {/* Exam Schedule & Alerts */}
        <div className="space-y-8">
            <TiltCard className="p-8 rounded-[2.5rem] bg-orange-500/5 border border-orange-500/20">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-8 text-orange-500">
                    <AlertTriangle className="w-4 h-4" />
                    Critical Alerts
                </h3>
                
                <div className="p-6 rounded-[2rem] bg-card border border-orange-500/10 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-3xl -z-10" />
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Final Assessment</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Advance React Architecture</h4>
                    <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold mb-6">15 June, 2024 • 10:00 AM</p>
                    <button className="w-full py-4 rounded-2xl bg-orange-500 text-white font-bold text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                        View Admit Card
                    </button>
                </div>
            </TiltCard>

            <div className="p-8 rounded-[2.5rem] bg-card border border-card-border">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-8">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Target Analytics
                </h3>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                            <span className="text-foreground/40">Dean's List Threshold</span>
                            <span className="text-primary">92%</span>
                        </div>
                        <div className="h-1.5 w-full bg-card rounded-full overflow-hidden">
                            <div className="h-full w-[85%] bg-primary shadow-[0_0_10px_var(--primary)]" />
                        </div>
                    </div>
                    <p className="text-[10px] text-foreground/40 leading-relaxed font-light italic">"You need a 3.9 GPA this semester to qualify for the Global Architecture Summit."</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
