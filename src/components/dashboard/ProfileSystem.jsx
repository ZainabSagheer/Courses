"use client";

import { motion } from 'framer-motion';
import { 
  User, Shield, Mail, Phone, MapPin, 
  Camera, Award, QrCode, Download, Edit2,
  CheckCircle2, Loader2, Save
} from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';
import { useState } from 'react';

export const ProfileSystem = ({ userData, profileForm, setProfileForm, handleSaveProfile, isSavingProfile, profileSaved }) => {
  const initials = userData?.name ? userData.name.substring(0, 2).toUpperCase() : "ST";

  return (
    <div className="space-y-12 pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        
        {/* Left Column - ID Card & Stats */}
        <div className="space-y-8">
            {/* Student ID Card - Premium Glass Design */}
            <TiltCard className="aspect-[1.6/1] rounded-[2.5rem] bg-card border border-card-border p-8 relative overflow-hidden group shadow-2xl">
                {/* Background Patterns */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[60px] rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-600/5 blur-[60px] rounded-full" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center p-2">
                                <img src="/logo-icon.png" className="w-full grayscale opacity-50" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black tracking-widest text-primary">BITSOL INSTITUTE</h3>
                                <p className="text-[8px] font-bold text-foreground/20 uppercase tracking-[0.3em]">STUDENT IDENTITY CARD</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[8px] font-black text-primary tracking-widest uppercase">Verified</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 my-6">
                        <div className="w-20 h-20 rounded-2xl border-2 border-primary/30 p-1 bg-card">
                            <div className="w-full h-full rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-background font-black text-2xl shadow-inner">
                                {initials}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight mb-1">{userData?.name || "Architect"}</h2>
                            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Advanced Full Stack Student</p>
                            <p className="text-[9px] font-medium text-primary mt-2 font-mono">ID: BIT-2024-8892</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[8px] font-bold text-foreground/20 uppercase tracking-widest">Status</p>
                            <p className="text-[10px] font-bold">Active Student</p>
                        </div>
                        <QrCode className="w-12 h-12 text-foreground/10 group-hover:text-primary/40 transition-colors" />
                    </div>
                </div>
            </TiltCard>

            {/* Achievements */}
            <div className="p-8 rounded-[2.5rem] bg-card border border-card-border">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-8">
                    <Award className="w-4 h-4 text-yellow-500" />
                    Skill Badges
                </h3>
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-square rounded-2xl bg-card border border-card-border flex items-center justify-center group cursor-help relative">
                            <div className={`w-8 h-8 rounded-full ${i === 1 ? 'bg-primary' : 'bg-card'} opacity-20 blur-xl absolute`} />
                            <Shield className={`w-6 h-6 ${i === 1 ? 'text-primary' : 'text-foreground/10'} group-hover:scale-110 transition-transform`} />
                        </div>
                    ))}
                </div>
                <button className="w-full mt-8 py-3 rounded-xl border border-card-border text-[9px] font-bold uppercase tracking-widest hover:bg-card/80 transition-all">
                    View Achievement Gallery
                </button>
            </div>
        </div>

        {/* Right Column - Profile Form */}
        <div className="xl:col-span-2 space-y-8">
            <TiltCard className="p-10 rounded-[3rem] bg-card border border-card-border relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                    <button className="p-3 rounded-2xl bg-card border border-card-border hover:border-primary/30 transition-all">
                        <Download className="w-4 h-4 text-foreground/40" />
                    </button>
                </div>

                <h2 className="text-2xl font-bold tracking-tight mb-12 flex items-center gap-4">
                    <User className="w-6 h-6 text-primary" />
                    MY PROFILE
                </h2>

                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 ml-4 flex items-center gap-2">
                                <User className="w-3 h-3" /> Full Name
                            </label>
                            <input 
                                type="text" 
                                value={profileForm.name} 
                                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                                className="w-full bg-card border border-card-border rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-all font-medium text-sm"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 ml-4 flex items-center gap-2">
                                <Phone className="w-3 h-3" /> Phone Number
                            </label>
                            <input 
                                type="text" 
                                value={profileForm.phone} 
                                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                                className="w-full bg-card border border-card-border rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-all font-medium text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 ml-4 flex items-center gap-2">
                            <Mail className="w-3 h-3" /> Email Address
                        </label>
                        <input 
                            type="text" 
                            value={userData?.email} 
                            disabled
                            className="w-full bg-card border border-card-border rounded-2xl px-6 py-4 opacity-40 cursor-not-allowed font-medium text-sm"
                        />
                    </div>

                    <div className="pt-6 border-t border-card-border flex flex-col sm:flex-row items-center gap-6">
                        <button 
                            onClick={handleSaveProfile}
                            disabled={isSavingProfile}
                            className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-primary text-background font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_30px_var(--primary)]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            {isSavingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Profile
                        </button>
                        
                        {profileSaved && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Profile Updated Successfully
                            </motion.div>
                        )}
                    </div>
                </div>
            </TiltCard>

            {/* Security Section */}
            <div className="p-8 rounded-[2.5rem] bg-red-500/5 border border-red-500/10">
                 <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-4 h-4 text-red-500" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Security Settings</h3>
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold mb-1">Change Password</p>
                        <p className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest">Last changed 3 months ago</p>
                    </div>
                    <button className="px-6 py-3 rounded-xl border border-red-500/20 text-red-500/60 hover:bg-red-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest">
                        Reset
                    </button>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};
