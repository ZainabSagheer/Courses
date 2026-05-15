"use client";

import { motion } from 'framer-motion';
import { 
  Zap, Trophy, Target, Clock, Calendar, 
  ArrowUpRight, Play, CheckCircle2, AlertCircle,
  TrendingUp, Star, Flame, FileText, Users, User
} from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';

const StatCard = ({ icon: Icon, label, value, subValue, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <TiltCard className="p-6 rounded-3xl bg-card border border-card-border overflow-hidden group relative h-full">
      <div className={`absolute top-0 right-0 w-24 h-24 blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity`} style={{ backgroundColor: color }} />
      
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="p-3 rounded-2xl bg-card border border-card-border shrink-0" style={{ color }}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest mb-0.5 truncate">{label}</h4>
            <p className="text-2xl font-bold tracking-tight truncate">{value}</p>
          </div>
        </div>
        <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-1 rounded-full self-start shrink-0">
          <TrendingUp className="w-3 h-3" />
          {subValue}
        </div>
      </div>
    </TiltCard>
  </motion.div>
);

export const Overview = ({ userData, enrolledCourses }) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Flame} 
          label="Learning Streak" 
          value="12 Days" 
          subValue="+2" 
          color="#FF5733" 
          delay={0.1}
        />
        <StatCard 
          icon={Star} 
          label="Reward Points" 
          value="2,450 XP" 
          subValue="Top 5%" 
          color="#00D9FF" 
          delay={0.2}
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Course Progress" 
          value="68%" 
          subValue="+5%" 
          color="#10B981" 
          delay={0.3}
        />
        <StatCard 
          icon={Clock} 
          label="Avg. Attendance" 
          value="94%" 
          subValue="Elite" 
          color="#7C3AED" 
          delay={0.4}
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
                <h2 className="text-4xl font-bold tracking-tight mb-2">DASHBOARD OVERVIEW</h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">System Active</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">Session Study Time</p>
                    <p className="text-sm font-bold tracking-widest">04:22:15</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-card border border-card-border flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                </div>
            </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TiltCard className="p-8 rounded-[2.5rem] bg-card border border-card-border relative overflow-hidden h-[400px]">
             <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Academic Performance
                    </h3>
                    <p className="text-foreground/40 text-xs mt-1">Real-time data sync from educational nodes</p>
                </div>
                <div className="flex gap-2">
                    {['W', 'M', 'Y'].map(t => (
                        <button key={t} className={`w-8 h-8 rounded-lg text-[10px] font-bold border transition-all ${t === 'M' ? 'bg-primary text-background border-primary' : 'bg-card border-card-border text-foreground/40 hover:text-foreground'}`}>
                            {t}
                        </button>
                    ))}
                </div>
             </div>

             <div className="absolute inset-x-8 bottom-8 top-32 flex items-end justify-between gap-4">
                {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3">
                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: 0.5 + (i * 0.1), duration: 1, ease: "easeOut" }}
                            className="w-full rounded-t-xl bg-gradient-to-t from-primary/10 to-primary relative group"
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                {h}%
                            </div>
                        </motion.div>
                        <span className="text-[9px] font-bold text-foreground/20 uppercase">Day {i+1}</span>
                    </div>
                ))}
             </div>
          </TiltCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
                { label: 'Active Courses', value: enrolledCourses.length, icon: BookOpen, color: 'var(--primary)' },
                { label: 'Total Progress', value: '78%', icon: TrendingUp, color: '#10B981' },
                { label: 'Assignments', value: '04', icon: FileText, color: '#F59E0B' },
                { label: 'Study Streak', value: '12 Days', icon: Zap, color: '#7C3AED' },
            ].map((stat, i) => (
                <button key={i} className="p-4 rounded-2xl bg-card border border-card-border hover:border-primary/30 hover:bg-card/80 transition-all flex flex-col items-center gap-3 group min-w-0">
                    <div className="p-3 rounded-xl bg-card text-foreground/40 group-hover:text-foreground transition-colors shrink-0">
                        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{stat.label}</p>
                      <p className="text-sm font-bold">{stat.value}</p>
                    </div>
                </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
            <TiltCard className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Timeline
                    </h3>
                    <span className="text-[9px] font-bold text-primary animate-pulse">LIVE NOW</span>
                </div>

                <div className="space-y-4">
                    {[
                        { title: 'UI/UX Masterclass', time: '10:00 AM', status: 'Live', instructor: 'Zainab Sagheer' },
                        { title: 'Full Stack Dev', time: '02:00 PM', status: 'Upcoming', instructor: 'Arsalan Khalid' },
                    ].map((item, i) => (
                        <div key={i} className="p-4 rounded-xl bg-card border border-card-border group hover:border-primary/30 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-xs font-bold truncate pr-2">{item.title}</h4>
                                <span className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase ${item.status === 'Live' ? 'bg-primary text-background shadow-[0_0_10px_var(--primary)]' : 'bg-card border border-card-border text-foreground/40'}`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-foreground/40">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {item.time}
                                </div>
                                <span>{item.instructor}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-6 py-3 rounded-xl bg-card border border-card-border text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-all">
                    View Full Timetable
                </button>
            </TiltCard>

            <div className="p-6 rounded-[2rem] bg-gradient-to-br from-purple-600/20 to-primary/20 border border-card-border relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-card-border">
                            <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">AI Mentor</span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed italic text-foreground/80">
                        "Great work on the React modules! You're in the top 2% of learners today. Keep that streak alive."
                    </p>
                    <div className="mt-6 h-1 w-full bg-card rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            className="h-full bg-gradient-to-r from-purple-600 to-primary" 
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
