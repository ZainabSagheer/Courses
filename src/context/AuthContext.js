"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubFirestore = null;

    const unsubAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Real-time listener for user document
        unsubFirestore = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
          if (docSnap.exists()) {
            setUserData({ id: docSnap.id, ...docSnap.data() });
          }
          setLoading(false);
        }, (error) => {
          console.error("Firestore listener error:", error);
          setLoading(false);
        });
      } else {
        setUser(null);
        setUserData(null);
        setLoading(false);
        if (unsubFirestore) {
          unsubFirestore();
          unsubFirestore = null;
        }
      }
    });

    return () => {
      unsubAuth();
      if (unsubFirestore) unsubFirestore();
    };
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const isAdmin = userData?.role === 'admin';
  const isStudent = !isAdmin;

  return (
    <AuthContext.Provider value={{ user, userData, loading, logout, isAdmin, isStudent }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
