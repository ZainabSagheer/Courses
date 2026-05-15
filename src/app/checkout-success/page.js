"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, PlayCircle, ArrowRight, DownloadCloud } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30"
        >
          <CheckCircle className="w-12 h-12" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
        >
          Payment <span className="text-emerald-400">Successful!</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-foreground/70 mb-10"
        >
          Thank you for enrolling! Your transaction has been completed securely. We've sent a receipt and login details to your email.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 rounded-2xl border border-emerald-500/20 text-left mb-10"
        >
          <h3 className="text-xl font-bold mb-6 text-center">What happens next?</h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-foreground">Check your Email</h4>
                <p className="text-sm text-foreground/60">You'll receive your login credentials and a link to join the student portal.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-foreground">Join the Community</h4>
                <p className="text-sm text-foreground/60">Access the exclusive WhatsApp/Discord groups for 1-on-1 mentorship.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-foreground">Start Learning</h4>
                <p className="text-sm text-foreground/60">Dive into your dashboard and begin watching the course materials.</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-1"
          >
            Go to Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/courses" 
            className="w-full sm:w-auto px-8 py-4 rounded-full glass font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all hover:-translate-y-1"
          >
            Browse More Courses
          </Link>
        </motion.div>
        
      </div>
    </div>
  );
}
