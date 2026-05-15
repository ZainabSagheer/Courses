"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck, Zap } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/ui/Logo';
import { TiltCard } from '@/components/ui/tilt-card';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        enrolledCourses: [],
        role: "student",
        createdAt: new Date().toISOString()
      });

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsProcessing(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName || 'Google User',
          email: user.email,
          phone: user.phoneNumber || '',
          enrolledCourses: [],
          role: "student",
          createdAt: new Date().toISOString()
        });
      }
      
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setIsProcessing(false);
    }
  };

  if (!loading && user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#00D9FF]/5 blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#7C3AED]/5 blur-[150px] -z-10" />
      
      <div className="container mx-auto px-6 relative z-10 flex justify-center py-20">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[600px]"
        >
          <TiltCard 
            className="p-12 rounded-[3.5rem] bg-[#0F172A]/40 backdrop-blur-3xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-visible"
            tiltLimit={5}
            perspective={2000}
          >
            <div className="text-center mb-12">
              <div className="relative inline-block mb-8 group">
                <div className="absolute inset-0 bg-[#00D9FF]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Logo className="w-16 h-16 relative z-10 transition-transform group-hover:rotate-180 duration-1000" />
              </div>
              <h1 className="text-4xl font-medium tracking-tighter mb-3">
                Create <span className="text-primary text-glow">Account</span>
              </h1>
              <p className="text-foreground/40 text-sm font-light tracking-wide">Join the BITSOL Marketing Institute community.</p>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8"
                    >
                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-3">
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 pl-2">Full Name</label>
                    <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        className="w-full bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 py-4 focus:outline-none focus:border-[#00D9FF]/30 transition-all text-sm font-medium placeholder:text-white/10" 
                        placeholder="John Doe" 
                    />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 pl-2">Email Address</label>
                    <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        className="w-full bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 py-4 focus:outline-none focus:border-[#00D9FF]/30 transition-all text-sm font-medium placeholder:text-white/10" 
                        placeholder="email@node.com" 
                    />
                    </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 pl-2">Phone Number</label>
                    <div className="relative group">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="tel" 
                        required 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                        className="w-full bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 py-4 focus:outline-none focus:border-[#00D9FF]/30 transition-all text-sm font-medium placeholder:text-white/10" 
                        placeholder="+92 300..." 
                    />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 pl-2">Password</label>
                    <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        required 
                        value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        className="w-full bg-white/5 border border-white/5 rounded-2xl pl-16 pr-16 py-4 focus:outline-none focus:border-[#00D9FF]/30 transition-all text-sm font-medium placeholder:text-white/10" 
                        placeholder="••••••••" 
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full py-5 rounded-2xl bg-primary text-background font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:shadow-[0_0_30px_var(--primary)]/40 transition-all disabled:opacity-50 group"
              >
                {isProcessing ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</>
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                )}
              </button>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-foreground/20">
                  <span className="px-4 bg-card/40">Or continue with</span>
                </div>
              </div>

              <button 
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isProcessing}
                className="w-full py-5 rounded-2xl bg-white/5 border border-white/5 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-white/10 transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>
            </form>

            <div className="mt-12 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/20 mb-4">Already have an account?</p>
                <Link href="/login">
                    <button className="flex items-center gap-2 mx-auto text-primary text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all group">
                        Sign In <Zap className="w-3 h-3 transition-transform group-hover:scale-125" />
                    </button>
                </Link>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}
