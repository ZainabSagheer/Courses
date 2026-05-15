"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, BookOpen, DollarSign, TrendingUp, Search, ShieldAlert, Loader2, CheckCircle2, X, Trash2, Send, Bell } from 'lucide-react';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { courses as staticCourses, fetchCourses } from '@/lib/data';

function AdminContent() {
  const router = useRouter();
  const { user, userData } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [availableCourses, setAvailableCourses] = useState(staticCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [notifForm, setNotifForm] = useState({ title: '', message: '', targetUserId: 'all', type: 'info' });
  const [isSendingNotif, setIsSendingNotif] = useState(false);
  const [notifSent, setNotifSent] = useState(false);

  useEffect(() => {
    fetchData();
    fetchCourses().then(setAvailableCourses);
  }, []);

  const fetchData = async () => {
    try {
      const snap = await getDocs(collection(db, "users"));
      const usersData = [];
      snap.forEach(d => {
        const data = d.data();
        if (data.role === 'student' || !data.role) usersData.push({ id: d.id, ...data });
      });
      usersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setStudents(usersData);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleApproveCourse = async () => {
    if (!selectedStudent || !selectedCourse) return;
    setIsApproving(true);
    try {
      const courseId = parseInt(selectedCourse);
      const current = selectedStudent.enrolledCourses || [];
      if (!current.includes(courseId)) {
        const newCourses = [...current, courseId];
        await updateDoc(doc(db, "users", selectedStudent.id), { enrolledCourses: newCourses });
        setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, enrolledCourses: newCourses } : s));
        try {
          await addDoc(collection(db, "notifications"), {
            targetUserId: selectedStudent.id,
            title: "Course Approved! 🎉",
            message: `You now have access to "${availableCourses.find(c => c.id === courseId)?.title}". Go to your dashboard to start learning!`,
            type: "success", readBy: [], createdAt: serverTimestamp()
          });
        } catch(e) { console.log("Notification skipped:", e.message); }
      }
      closeModal();
    } catch (e) { console.error(e); alert("Failed to approve."); }
    setIsApproving(false);
  };

  const handleRevokeCourse = async (student, courseId) => {
    if (!confirm(`Revoke "${getCourseName(courseId)}" from ${student.name}?`)) return;
    try {
      const newCourses = (student.enrolledCourses || []).filter(id => id !== courseId);
      await updateDoc(doc(db, "users", student.id), { enrolledCourses: newCourses });
      setStudents(prev => prev.map(s => s.id === student.id ? { ...s, enrolledCourses: newCourses } : s));
    } catch (e) { console.error(e); }
  };

  const handleDeleteStudent = async (student) => {
    if (!confirm(`Delete ${student.name} from database? This only removes Firestore data.`)) return;
    try {
      await deleteDoc(doc(db, "users", student.id));
      setStudents(prev => prev.filter(s => s.id !== student.id));
    } catch (e) { console.error(e); }
  };

  const handleSendNotification = async () => {
    if (!notifForm.title || !notifForm.message) return;
    setIsSendingNotif(true);
    try {
      await addDoc(collection(db, "notifications"), {
        targetUserId: notifForm.targetUserId,
        title: notifForm.title, message: notifForm.message,
        type: notifForm.type, readBy: [], createdAt: serverTimestamp()
      });
      setNotifSent(true);
      setNotifForm({ title: '', message: '', targetUserId: 'all', type: 'info' });
      setTimeout(() => setNotifSent(false), 3000);
    } catch (e) { console.error(e); alert("Failed to send."); }
    setIsSendingNotif(false);
  };

  const closeModal = () => { setSelectedStudent(null); setSelectedCourse(''); };
  const getCourseName = (id) => availableCourses.find(c => c.id === id)?.title || `Course ${id}`;

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = students.reduce((sum, s) => {
    return sum + (s.enrolledCourses || []).reduce((cSum, cId) => {
      const course = availableCourses.find(c => c.id === cId);
      return cSum + (course?.numericPrice || 0);
    }, 0);
  }, 0);

  const stats = [
    { title: "Total Revenue", value: `Rs ${(totalRevenue/1000).toFixed(0)}K`, icon: <DollarSign className="w-6 h-6 text-green-500" />, color: "emerald" },
    { title: "Total Students", value: students.length, icon: <Users className="w-6 h-6 text-primary" />, color: "blue" },
    { title: "Active Courses", value: availableCourses.length, icon: <BookOpen className="w-6 h-6 text-purple-400" />, color: "purple" },
    { title: "Enrollments", value: students.reduce((s,st) => s + (st.enrolledCourses?.length||0), 0), icon: <TrendingUp className="w-6 h-6 text-cyan-400" />, color: "cyan" },
  ];

  if (loading) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-foreground/60 animate-pulse">Loading Admin Panel...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 glass border-r border-card-border shrink-0 md:h-[calc(100vh-80px)] md:sticky md:top-20 hidden md:flex flex-col z-10">
        <div className="p-6 border-b border-card-border">
          <h3 className="font-bold text-lg text-gradient flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-red-500" />Super Admin</h3>
          <span className="text-xs text-foreground/50">BITSOL Marketing</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {[
            { key: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { key: 'students', icon: Users, label: 'Manage Students' },
            { key: 'notifications', icon: Bell, label: 'Send Alerts' },
          ].map(item => (
            <button key={item.key} onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === item.key ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-white/5'}`}>
              <item.icon className="w-5 h-5" /><span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 relative">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div><h1 className="text-3xl font-bold mb-2">Control Panel</h1><p className="text-foreground/60">Manage students and course access.</p></div>
        </header>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-card border border-card-border">{stat.icon}</div>
                  </div>
                  <h4 className="text-sm text-foreground/60 font-medium mb-1">{stat.title}</h4>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="glass-card overflow-hidden rounded-2xl">
              <div className="p-6 border-b border-card-border flex justify-between items-center">
                <h3 className="text-lg font-bold">Recent Signups</h3>
                <button onClick={() => setActiveTab('students')} className="text-sm text-primary hover:text-primary/80 font-medium">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-card/50 text-foreground/60 text-sm border-b border-card-border">
                    <th className="p-4 font-medium">Name</th><th className="p-4 font-medium">Email</th><th className="p-4 font-medium">Joined</th><th className="p-4 font-medium">Courses</th>
                  </tr></thead>
                  <tbody>
                    {students.slice(0, 5).map(s => (
                      <tr key={s.id} className="border-b border-card-border/50 hover:bg-card/50 transition-colors">
                        <td className="p-4 font-medium">{s.name}</td>
                        <td className="p-4 text-sm text-foreground/80">{s.email}</td>
                        <td className="p-4 text-sm text-foreground/60">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="p-4 text-sm">{s.enrolledCourses?.length || 0}</td>
                      </tr>
                    ))}
                    {students.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-foreground/50">No students yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* STUDENTS */}
        {activeTab === 'students' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">Student Database</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{students.length} Total</span>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                <input type="text" placeholder="Search students..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-primary/50 text-sm" />
              </div>
            </div>
            <div className="glass-card overflow-hidden rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-card/50 text-foreground/60 text-sm border-b border-card-border">
                    <th className="p-4 font-medium">Student</th><th className="p-4 font-medium">Contact</th><th className="p-4 font-medium">Courses</th><th className="p-4 font-medium text-right">Actions</th>
                  </tr></thead>
                  <tbody>
                    {filtered.map(student => (
                      <tr key={student.id} className="border-b border-card-border/50 hover:bg-card/50 transition-colors">
                        <td className="p-4"><p className="font-bold">{student.name}</p><p className="text-xs text-foreground/50">Joined: {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}</p></td>
                        <td className="p-4"><p className="text-sm">{student.email}</p><p className="text-xs text-foreground/60">{student.phone || 'No phone'}</p></td>
                        <td className="p-4"><div className="flex flex-wrap gap-1">
                          {student.enrolledCourses?.length > 0 ? student.enrolledCourses.map(cId => (
                            <span key={cId} className="inline-flex items-center gap-1 px-2 py-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                              {getCourseName(cId)}
                              <button onClick={() => handleRevokeCourse(student, cId)} className="hover:text-red-400 transition-colors" title="Revoke"><X className="w-3 h-3" /></button>
                            </span>
                          )) : <span className="px-2 py-1 text-[10px] bg-foreground/5 text-foreground/40 rounded-full">No Courses</span>}
                        </div></td>
                        <td className="p-4 text-right"><div className="flex items-center justify-end gap-2">
                          <button onClick={() => setSelectedStudent(student)} className="px-3 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded-lg text-sm font-medium inline-flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Approve
                          </button>
                          <button onClick={() => handleDeleteStudent(student)} className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div></td>
                      </tr>
                    ))}
                    {filtered.length === 0 && <tr><td colSpan="4" className="p-12 text-center text-foreground/50">No students found.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="max-w-2xl space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold">Send Notification</h2>
            <div className="glass-card p-8 rounded-2xl space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Recipient</label>
                <select value={notifForm.targetUserId} onChange={e => setNotifForm({...notifForm, targetUserId: e.target.value})}
                  className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground appearance-none">
                  <option value="all">All Students (Broadcast)</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name} — {s.email}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Title</label>
                  <input type="text" value={notifForm.title} onChange={e => setNotifForm({...notifForm, title: e.target.value})} placeholder="Notification title" className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Type</label>
                  <select value={notifForm.type} onChange={e => setNotifForm({...notifForm, type: e.target.value})}
                    className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground appearance-none">
                    <option value="info">ℹ️ Info</option><option value="success">✅ Success</option><option value="warning">⚠️ Warning</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Message</label>
                <textarea value={notifForm.message} onChange={e => setNotifForm({...notifForm, message: e.target.value})} rows={4} placeholder="Write your message..." className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 resize-none" />
              </div>
              <div className="flex items-center gap-4">
                <button onClick={handleSendNotification} disabled={isSendingNotif || !notifForm.title || !notifForm.message}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-medium flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50">
                  {isSendingNotif ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Send Notification
                </button>
                {notifSent && <span className="text-emerald-400 text-sm font-medium flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Sent!</span>}
              </div>
            </div>
          </div>
        )}

        {/* APPROVAL MODAL */}
        <AnimatePresence>
          {selectedStudent && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md glass-card rounded-3xl border border-card-border/50 shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-card-border flex justify-between items-center">
                  <h3 className="text-xl font-bold">Approve Course Access</h3>
                  <button onClick={closeModal} className="text-foreground/50 hover:text-foreground p-1"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-6">
                  <div><p className="text-sm text-foreground/60 mb-1">Granting access for:</p><p className="font-bold text-lg">{selectedStudent.name}</p><p className="text-sm text-foreground/60">{selectedStudent.email}</p></div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Select Course</label>
                    <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground appearance-none">
                      <option value="" disabled>-- Choose a course --</option>
                      {availableCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                    {selectedStudent.enrolledCourses?.includes(parseInt(selectedCourse)) && <p className="text-xs text-red-400 mt-2">Student already has this course.</p>}
                  </div>
                </div>
                <div className="p-6 border-t border-card-border bg-card/30 flex gap-3">
                  <button onClick={closeModal} className="flex-1 py-3 rounded-xl font-medium border border-card-border hover:bg-white/5 transition-colors">Cancel</button>
                  <button onClick={handleApproveCourse} disabled={!selectedCourse || isApproving || selectedStudent.enrolledCourses?.includes(parseInt(selectedCourse))}
                    className="flex-1 py-3 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50">
                    {isApproving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm & Unlock"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminContent />
    </ProtectedRoute>
  );
}
