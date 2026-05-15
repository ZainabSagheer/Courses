"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Logo } from '@/components/ui/Logo';

export default function SetupTestUser() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const createAccount = async () => {
    setStatus('loading');
    setError(null);
    try {
      const email = "test@bitsol.marketing";
      const password = "password123";
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: "Test Scholar",
        email: email,
        phone: "03001234567",
        role: "student",
        enrolledCourses: ["dmm-001", "ai-002"], // Give them some courses
        createdAt: new Date()
      });

      setStatus('success');
    } catch (err) {
      console.error(err);
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 text-white font-sans">
      <div className="max-w-md w-full p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl text-center shadow-2xl">
        <Logo className="w-16 h-16 mx-auto mb-8" />
        <h1 className="text-3xl font-medium tracking-tighter mb-4">Account Provisioning</h1>
        <p className="text-white/40 mb-10 font-light">Generate test credentials for the BITSOL neural interface.</p>
        
        {status === 'idle' && (
          <button 
            onClick={createAccount}
            className="w-full py-5 rounded-full bg-[#00D9FF] text-black font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-all"
          >
            Create Test Account
          </button>
        )}

        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#00D9FF]/20 border-t-[#00D9FF] rounded-full animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D9FF]">Syncing with Database...</span>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <p className="text-sm font-medium">Account Successfully Provisioned</p>
            </div>
            <div className="text-left space-y-4 bg-black/40 p-6 rounded-2xl border border-white/5">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Email Node</p>
                    <p className="font-mono text-[#00D9FF]">test@bitsol.marketing</p>
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Access Key</p>
                    <p className="font-mono text-[#00D9FF]">password123</p>
                </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">You can now proceed to login.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs leading-relaxed">
                {error}
            </div>
            <button 
                onClick={() => setStatus('idle')}
                className="text-[10px] font-bold uppercase tracking-widest text-[#00D9FF] hover:underline"
            >
                Retry Connection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
