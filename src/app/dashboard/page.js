"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, LogOut, LayoutDashboard, BookOpen, Video, 
  FileText, Bot, GraduationCap, Users, Briefcase, 
  CreditCard, MessageSquare, User, Settings
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { courses as allCourses } from '@/lib/data';
import ProtectedRoute from '@/components/ProtectedRoute';

// Modular Components
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { Overview } from '@/components/dashboard/Overview';
import { MyCourses } from '@/components/dashboard/MyCourses';
import { AIAssistant } from '@/components/dashboard/AIAssistant';
import { LiveClasses } from '@/components/dashboard/LiveClasses';
import { Assignments } from '@/components/dashboard/Assignments';
import { ProfileSystem } from '@/components/dashboard/ProfileSystem';
import { ExaminationPortal } from '@/components/dashboard/Examination';
import { FeesAndPayments } from '@/components/dashboard/Fees';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userData, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Sync active tab from URL if present
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // Sync user data
  useEffect(() => {
    if (userData) {
      setProfileForm({
        name: userData.name || '',
        phone: userData.phone || ''
      });

      if (userData.enrolledCourses && userData.enrolledCourses.length > 0) {
        const filteredCourses = allCourses.filter(c => userData.enrolledCourses.includes(c.id)).map(course => ({
          ...course,
          progress: Math.floor(Math.random() * 60) + 20, // Demo progress
          totalModules: 12,
          completedModules: 4,
          nextLesson: "Module 05: Interface Design"
        }));
        setEnrolledCourses(filteredCourses);
      }
    }
  }, [userData]);

  // Notifications listener
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "notifications"),
      where("targetUserId", "in", [user.uid, "all"]),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const notifs = [];
      snapshot.forEach(doc => notifs.push({ id: doc.id, ...doc.data() }));
      setNotifications(notifs);
    });
    return () => unsub();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSavingProfile(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: profileForm.name,
        phone: profileForm.phone
      });
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const unreadNotifications = notifications.filter(n => !n.readBy?.includes(user?.uid)).length;

  const renderModule = () => {
    switch (activeTab) {
      case 'overview': return <Overview userData={userData} enrolledCourses={enrolledCourses} />;
      case 'courses': return <MyCourses enrolledCourses={enrolledCourses} />;
      case 'ai-assistant': return <AIAssistant />;
      case 'live': return <LiveClasses />;
      case 'assignments': return <Assignments />;
      case 'exams': return <ExaminationPortal />;
      case 'profile': return <ProfileSystem 
                                userData={userData} 
                                profileForm={profileForm} 
                                setProfileForm={setProfileForm} 
                                handleSaveProfile={handleSaveProfile} 
                                isSavingProfile={isSavingProfile} 
                                profileSaved={profileSaved} 
                             />;
      case 'fees': return <FeesAndPayments />;
      default: return (
        <div className="flex flex-col items-center justify-center py-40 border border-dashed border-card-border rounded-[3rem] bg-card">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
            <h3 className="text-xl font-bold uppercase tracking-widest text-foreground/40">Initializing {activeTab} Module...</h3>
            <p className="text-xs text-foreground/20 mt-2 font-light">Secure connection in progress</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground font-sans selection:bg-primary selection:text-background overflow-hidden">
      
      {/* Premium Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userData={userData} 
        unreadNotifications={unreadNotifications} 
        handleLogout={handleLogout} 
      />

      {/* Main Dynamic Workspace */}
      <main className="flex-1 relative h-screen overflow-y-auto custom-scrollbar p-6 md:p-12 lg:p-16">
        {/* Environmental Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] -z-10 pointer-events-none animate-pulse dark:bg-primary/5" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] -z-10 pointer-events-none dark:bg-purple-500/5" />

        {/* Dynamic Header */}
        <Header 
          userData={userData} 
          unreadNotifications={unreadNotifications} 
          setActiveTab={setActiveTab} 
        />

        {/* Content Transition System */}
        <AnimatePresence mode="wait">
            <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                {renderModule()}
            </motion.div>
        </AnimatePresence>

        {/* Mobile App Navigation (Bottom Bar) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-2xl border-t border-card-border flex items-center justify-around px-6 z-[100]">
            {[
                { key: 'overview', icon: LayoutDashboard },
                { key: 'courses', icon: BookOpen },
                { key: 'ai-assistant', icon: Bot, glow: true },
                { key: 'live', icon: Video },
                { key: 'profile', icon: User },
            ].map(item => (
                <button 
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`p-3 rounded-2xl relative ${activeTab === item.key ? 'text-primary bg-card' : 'text-foreground/40'}`}
                >
                    <item.icon className="w-6 h-6" />
                    {item.glow && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />}
                </button>
            ))}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 217, 255, 0.2);
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
