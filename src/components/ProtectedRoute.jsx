"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, userData, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }
      if (requiredRole === 'admin' && !isAdmin) {
        router.push('/dashboard');
        return;
      }
    }
  }, [user, userData, loading, requiredRole, isAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-foreground/60 font-medium animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!user) return null;
  if (requiredRole === 'admin' && !isAdmin) return null;

  return children;
}
