"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSent(true);
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-10 rounded-3xl border border-card-border/50 shadow-2xl relative overflow-hidden">
            
            {/* Inner Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/30 rounded-full blur-[60px]" />
            
            <div className="relative z-10">
              <Link href="/login" className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-6 text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>

              {!isSent ? (
                <>
                  <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black mb-3">Forgot Password?</h1>
                    <p className="text-foreground/60">Enter your email and we'll send you a reset link.</p>
                  </div>

                  {error && (
                    <div className="p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80 pl-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                        <input 
                          type="email" 
                          required 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          className="w-full bg-background/50 border border-card-border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/30" 
                          placeholder="john@example.com" 
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isProcessing ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-3">Email Sent!</h2>
                  <p className="text-foreground/60 mb-8">
                    We've sent a password reset link to <strong className="text-foreground">{email}</strong>. Please check your inbox and spam folder.
                  </p>
                  <Link 
                    href="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-xl font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
