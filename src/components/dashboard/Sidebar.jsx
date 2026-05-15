"use client";

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, Video, FileText, Bot, 
  GraduationCap, Users, Briefcase, CreditCard, MessageSquare, 
  User, Settings, LogOut, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export const Sidebar = ({ activeTab, setActiveTab, userData, unreadNotifications, handleLogout }) => {
  const initials = userData?.name ? userData.name.substring(0, 2).toUpperCase() : "ST";

  const sidebarItems = [
    { key: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { key: 'courses', icon: BookOpen, label: 'My Courses' },
    { key: 'live', icon: Video, label: 'Live Classes' },
    { key: 'assignments', icon: FileText, label: 'Assignments' },
    { key: 'ai-assistant', icon: Bot, label: 'AI Assistant', glow: true },
    { key: 'exams', icon: GraduationCap, label: 'Examination' },
    { key: 'community', icon: Users, label: 'Community' },
    { key: 'career', icon: Briefcase, label: 'Career Hub' },
    { key: 'fees', icon: CreditCard, label: 'Fees & Payments' },
    { key: 'admin', icon: MessageSquare, label: 'Admin Connect' },
    { key: 'profile', icon: User, label: 'My Profile' },
    { key: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-full md:w-72 bg-background/80 backdrop-blur-3xl border-r border-card-border shrink-0 md:h-screen md:sticky md:top-0 hidden md:flex flex-col z-50 overflow-y-auto custom-scrollbar">
      <div className="p-8 border-b border-card-border">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="w-10 h-10 transition-transform group-hover:rotate-[360deg] duration-1000" />
          <span className="text-xl font-bold tracking-tighter">
            BITSOL<span className="text-primary">.</span>
          </span>
        </Link>
      </div>

      <div className="p-6">
        <div className="p-4 rounded-2xl bg-card border border-card-border flex items-center gap-4 group hover:border-primary/30 transition-all">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-background font-bold text-sm shadow-[0_0_20px_var(--primary)]">
              {initials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background shadow-lg" />
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-xs truncate">{userData?.name || "Student"}</h3>
            <span className="text-[9px] text-primary uppercase tracking-widest font-bold opacity-60">ID: BIT-2024-001</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 py-2 px-4 space-y-1">
        {sidebarItems.map(item => (
          <button 
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden ${activeTab === item.key ? 'text-primary bg-card' : 'text-foreground/40 hover:text-foreground hover:bg-card'}`}
          >
            {activeTab === item.key && (
              <motion.div 
                layoutId="activeTab"
                className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_15px_var(--primary)]" 
              />
            )}
            
            <item.icon className={`w-4 h-4 transition-all duration-500 ${activeTab === item.key ? 'text-primary scale-110' : 'group-hover:scale-110'} ${item.glow ? 'animate-pulse text-cyan-400' : ''}`} />
            <span className={`font-bold text-[11px] uppercase tracking-wider transition-all duration-300 ${activeTab === item.key ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
              {item.label}
            </span>
            
            {item.key === 'notifications' && unreadNotifications > 0 && (
              <span className="ml-auto px-1.5 py-0.5 text-[9px] bg-primary text-background rounded-full font-black shadow-[0_0_10px_var(--primary)]">
                {unreadNotifications}
              </span>
            )}
            
            {item.glow && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            )}
          </button>
        ))}
      </nav>
      
      <div className="p-6 border-t border-card-border mt-auto">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/60 hover:text-red-400 hover:bg-red-400/5 transition-all group"
        >
          <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-bold text-[11px] uppercase tracking-wider">Log Out</span>
        </button>
      </div>
    </aside>
  );
};
