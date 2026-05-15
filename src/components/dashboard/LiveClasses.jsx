"use client";

import { motion } from 'framer-motion';
import { 
  Video, Clock, Calendar, Users, 
  Play, ExternalLink, Bell, Info
} from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';

export const LiveClasses = () => {
  const classes = [
    { 
        id: 1, 
        title: 'Full Stack Development (Node.js)', 
        instructor: 'Arsalan Khalid', 
        time: 'Today, 02:00 PM', 
        status: 'live',
        students: 42,
        thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80'
    },
    { 
        id: 2, 
        title: 'UI/UX Design Patterns', 
        instructor: 'Zainab Sagheer', 
        time: 'Tomorrow, 11:00 AM', 
        status: 'upcoming',
        students: 28,
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <Video className="w-6 h-6 text-primary" />
          VIRTUAL CLASSROOM
        </h2>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-card-border text-[10px] font-bold uppercase tracking-widest hover:bg-card/80 transition-all">
            <Calendar className="w-4 h-4 text-primary" />
            Full Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {classes.map((cls, i) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <TiltCard className="p-6 rounded-[2.5rem] bg-card border border-card-border group relative overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-48 h-48 rounded-3xl overflow-hidden relative group/img">
                        <img src={cls.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                        <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-background">
                                <Play className="w-5 h-5 fill-current" />
                            </div>
                        </div>
                        {cls.status === 'live' && (
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-background text-[9px] font-black uppercase shadow-[0_0_15px_var(--primary)] animate-pulse">
                                LIVE
                            </div>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[9px] font-black uppercase tracking-widest text-primary opacity-60">Session {cls.id < 10 ? `0${cls.id}` : cls.id}</span>
                                <div className="w-1 h-1 rounded-full bg-foreground/20" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-foreground/40">2.5 Hours</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{cls.title}</h3>
                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[10px] font-bold text-foreground/60">{cls.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[10px] font-bold text-foreground/60">{cls.students} Students</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-card-border">
                                <div className="w-8 h-8 rounded-full border border-card-border p-0.5">
                                    <img src={`https://ui-avatars.com/api/?name=${cls.instructor}&background=random`} className="w-full h-full rounded-full" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Instructor</p>
                                    <p className="text-[10px] font-bold text-foreground/80">{cls.instructor}</p>
                                </div>
                                <button className="ml-auto p-2 rounded-lg hover:bg-card/80 text-foreground/20 hover:text-primary transition-all">
                                    <Info className="w-4 h-4" />
                                </button>
                            </div>

                            <button className={`w-full py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${cls.status === 'live' ? 'bg-primary text-background shadow-[0_0_20px_var(--primary)]/30' : 'bg-card border border-card-border text-foreground/40 hover:bg-card/80'}`}>
                                {cls.status === 'live' ? (
                                    <>
                                        <Play className="w-4 h-4 fill-current" />
                                        Join Class
                                    </>
                                ) : (
                                    <>
                                        <Bell className="w-4 h-4" />
                                        Set Reminder
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Classroom Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            { title: 'Interactive Board', desc: 'Real-time collaborative workspace', icon: ExternalLink },
            { title: 'Recorded Archive', desc: 'Access 250+ past session nodes', icon: Video },
            { title: 'Peer Sync', desc: 'Connect with 1.2k active architects', icon: Users },
        ].map((feat, i) => (
            <div key={i} className="p-6 rounded-3xl bg-card border border-card-border hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-card border border-card-border flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <feat.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm mb-2">{feat.title}</h4>
                <p className="text-xs text-foreground/40 font-light leading-relaxed">{feat.desc.replace('session nodes', 'sessions').replace('active architects', 'active students')}</p>
            </div>
        ))}
      </div>
    </div>
  );
};
