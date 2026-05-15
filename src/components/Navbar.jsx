// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, LogIn, LogOut, User, ShieldAlert, LayoutDashboard, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { user, userData, loading, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdown && !e.target.closest('#profile-dropdown-wrapper')) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [profileDropdown]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
  ];

  const handleLogout = async () => {
    setProfileDropdown(false);
    setMobileMenuOpen(false);
    await logout();
  };

  const initials = userData?.name ? userData.name.substring(0, 2).toUpperCase() : "U";

  return (
    <header className={clsx(
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'glass py-4' : 'bg-transparent py-6'
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold font-sans tracking-tight text-gradient">
            BITSOL
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {!loading && user ? (
              <div className="flex items-center gap-4 xl:gap-6">
                <Link href="/dashboard" className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5 whitespace-nowrap">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                {isAdmin && (
                  <Link href="/admin" className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    Admin
                  </Link>
                )}

                {/* Profile Dropdown */}
                <div className="relative" id="profile-dropdown-wrapper">
                  <button 
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full glass hover:bg-white/10 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                      {initials}
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate hidden lg:block">
                      {userData?.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className={clsx("w-4 h-4 transition-transform", profileDropdown && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {profileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-56 glass-card rounded-xl p-2 shadow-2xl border border-card-border/50 overflow-hidden"
                      >
                        <div className="px-3 py-3 border-b border-card-border mb-1">
                          <p className="font-semibold text-sm truncate">{userData?.name || 'User'}</p>
                          <p className="text-xs text-foreground/50 truncate">{userData?.email || ''}</p>
                          {isAdmin && (
                            <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 rounded-full font-medium">
                              Admin
                            </span>
                          )}
                        </div>
                        <Link 
                          href="/dashboard" 
                          onClick={() => setProfileDropdown(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-foreground/50" /> My Dashboard
                        </Link>
                        <Link 
                          href="/dashboard?tab=profile" 
                          onClick={() => setProfileDropdown(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors"
                        >
                          <User className="w-4 h-4 text-foreground/50" /> Profile
                        </Link>
                        {isAdmin && (
                          <Link 
                            href="/admin" 
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                          >
                            <ShieldAlert className="w-4 h-4" /> Admin Panel
                          </Link>
                        )}
                        <div className="border-t border-card-border mt-1 pt-1">
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : !loading ? (
              <div className="flex items-center gap-4 ml-4">
                <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link href="/signup" className="px-5 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all text-sm font-medium shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                  Get Started
                </Link>
              </div>
            ) : null}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass border-t border-card-border py-4 px-6 flex flex-col gap-4 lg:hidden"
          >
            <div className="flex items-center justify-between py-2 border-b border-card-border mb-2">
              <span className="text-sm font-medium opacity-50">Interface Theme</span>
              <ThemeToggle />
            </div>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-base font-medium py-2 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!loading && user ? (
              <>
                <Link href="/dashboard" className="text-base font-medium py-2 hover:text-primary flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="text-base font-medium py-2 text-red-400 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <ShieldAlert className="w-4 h-4" /> Admin Panel
                  </Link>
                )}
                <hr className="border-card-border" />
                <div className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {initials}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{userData?.name || 'User'}</p>
                    <p className="text-xs text-foreground/50">{userData?.email || ''}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-base font-medium py-2 text-red-400 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : !loading ? (
              <>
                <hr className="border-card-border" />
                <Link href="/login" className="text-base font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link href="/signup" className="text-base font-medium py-2 text-primary" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
