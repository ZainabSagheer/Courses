"use client";

import { motion } from 'framer-motion';
import { Bell, Search, Clock, Zap, Menu } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

export const Header = ({ userData, unreadNotifications, setActiveTab }) => {
  const firstName = userData?.name?.split(' ')[0] || "Scholar";

  return (
    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 relative z-20">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 min-w-0"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary bg-primary/10 px-2 py-0.5 rounded">Neural Interface v4.0</span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--primary)]" />
        </div>
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tighter truncate">
            Welcome back, <span className="text-primary text-glow">{firstName}</span>.
        </h1>
        <p className="text-foreground/30 text-sm font-medium tracking-wide mt-2 italic flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-primary" />
            "The best way to predict the future is to create it."
        </p>
      </motion.div>
      
      <div className="flex items-center gap-4 shrink-0 flex-wrap sm:flex-nowrap">
        {/* Search Bar - More Robust */}
        <div className="relative hidden xl:block group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
            <input 
                type="text" 
                placeholder="Search modules..." 
                className="bg-card border border-card-border rounded-2xl py-3 pl-12 pr-6 text-xs focus:outline-none focus:border-primary/50 focus:bg-card/80 transition-all w-64"
            />
        </div>

        <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="p-1 px-4 h-12 rounded-2xl bg-card border border-card-border hidden sm:flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">System Uptime: 2.4k hrs</span>
            </div>
            
            <button 
                onClick={() => setActiveTab('notifications')}
                className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-card border border-card-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-lg bg-primary text-background text-[10px] flex items-center justify-center font-black shadow-[0_0_15px_var(--primary)]">
                        {unreadNotifications}
                    </span>
                )}
            </button>

            {/* Mobile Sidebar Toggle Button (Visible when Sidebar is hidden) */}
            <button className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-card border border-card-border">
                <Menu className="w-5 h-5" />
            </button>
        </div>
      </div>
    </header>
  );
};
