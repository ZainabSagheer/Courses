"use client";

import { useParams, useRouter } from 'next/navigation';
import { getCourseById } from '@/lib/data';
import { useState, useEffect } from 'react';
import { ArrowLeft, PlayCircle, CheckCircle2, Lock, FileText, Download, ChevronDown, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

function CoursePlayerContent() {
  const params = useParams();
  const router = useRouter();
  const { user, userData } = useAuth();
  const [course, setCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(1);
  const [hasAccess, setHasAccess] = useState(false);
  
  useEffect(() => {
    if (params?.id) {
      const foundCourse = getCourseById(params.id);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        router.push('/dashboard');
      }
    }
  }, [params, router]);

  // Check course access
  useEffect(() => {
    if (course && userData) {
      const enrolled = userData.enrolledCourses?.includes(course.id);
      setHasAccess(enrolled);
    }
  }, [course, userData]);

  if (!course) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  // Access denied view
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass-card p-12 rounded-3xl text-center max-w-md border border-red-500/20">
          <div className="w-20 h-20 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-foreground/60 mb-8">You don't have access to this course. Please enroll or wait for admin approval.</p>
          <div className="flex flex-col gap-3">
            <Link href={`/courses/${course.id}`} className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all text-center">
              Enroll Now
            </Link>
            <Link href="/dashboard" className="px-6 py-3 glass rounded-xl font-medium hover:bg-white/5 transition-all text-center">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Mock curriculum data for the player
  const curriculum = [
    {
      id: 0,
      title: "Module 1: Introduction & Fundamentals",
      lessons: [
        { id: 1, title: "Welcome to the Course", duration: "05:20", type: "video", completed: true },
        { id: 2, title: "Understanding the Basics", duration: "15:45", type: "video", completed: true },
        { id: 3, title: "Course Resources & Downloads", duration: "02:10", type: "document", completed: false }
      ]
    },
    {
      id: 1,
      title: "Module 2: Core Concepts & Strategies",
      lessons: [
        { id: 4, title: "Deep Dive: Methodology", duration: "25:30", type: "video", completed: false },
        { id: 5, title: "Practical Application", duration: "18:15", type: "video", completed: false },
        { id: 6, title: "Common Mistakes to Avoid", duration: "12:40", type: "video", completed: false }
      ]
    },
    {
      id: 2,
      title: "Module 3: Advanced Techniques",
      lessons: [
        { id: 7, title: "Scaling Your Results", duration: "30:00", type: "video", completed: false },
        { id: 8, title: "Automation & Tools", duration: "22:15", type: "video", completed: false },
        { id: 9, title: "Final Assignment", duration: "00:00", type: "document", completed: false }
      ]
    }
  ];

  const currentLessonData = curriculum.flatMap(m => m.lessons).find(l => l.id === activeLesson);
  const initials = userData?.name ? userData.name.substring(0, 2).toUpperCase() : "ST";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar specifically for the player */}
      <header className="h-16 glass border-b border-card-border flex items-center justify-between px-6 shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-full transition-colors text-foreground/70 hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-card-border mx-2"></div>
          <h1 className="font-bold text-sm md:text-base line-clamp-1">{course.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-foreground/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>2 / 9 Lessons Completed</span>
          </div>
          <a
            href="https://wa.me/923103175175?text=I%20have%20a%20question%20about%20the%20course"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] text-sm font-medium hover:bg-[#25D366] hover:text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Help
          </a>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
            {initials}
          </div>
        </div>
      </header>

      {/* Player Layout */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden h-[calc(100vh-64px)]">
        
        {/* Left: Video & Details */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Video Container (16:9 Aspect Ratio) */}
          <div className="w-full bg-black aspect-video relative flex items-center justify-center group border-b border-card-border">
            <img src={course.image} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            
            {/* Fake Player UI */}
            <div className="relative z-10 flex flex-col items-center">
              <button className="w-20 h-20 rounded-full bg-primary/80 text-white flex items-center justify-center hover:bg-primary transition-all hover:scale-110 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <PlayCircle className="w-10 h-10 ml-1" />
              </button>
              <p className="mt-4 font-medium text-white/80">{currentLessonData?.title}</p>
            </div>
            
            {/* Fake Controls Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end px-4 pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full flex items-center gap-4">
                <PlayCircle className="w-5 h-5 text-white cursor-pointer" />
                <div className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer relative">
                  <div className="absolute top-0 left-0 h-full bg-primary rounded-full w-1/3"></div>
                </div>
                <span className="text-xs text-white font-mono">02:15 / {currentLessonData?.duration || '10:00'}</span>
              </div>
            </div>
          </div>

          {/* Lesson Details */}
          <div className="p-6 md:p-10 max-w-4xl">
            <h2 className="text-3xl font-bold mb-4">{currentLessonData?.title}</h2>
            <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8 pb-8 border-b border-card-border">
              <span>Lesson {activeLesson}</span>
              <span>•</span>
              <span>{currentLessonData?.duration}</span>
              <span>•</span>
              <button className="text-primary hover:underline flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Mark as Complete
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <h3>About this lesson</h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                In this lesson, we will cover the foundational concepts necessary to master the topic. Make sure you have downloaded the resources provided in the previous section. If you have any questions, feel free to drop them in the community forum.
              </p>
              
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                <h4 className="flex items-center gap-2 font-bold text-primary mb-2">
                  <Download className="w-5 h-5" /> Lesson Resources
                </h4>
                <ul className="space-y-3 mt-4">
                  <li>
                    <a href="#" className="flex items-center justify-between p-3 glass rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <span className="text-sm">Cheat_Sheet_v1.pdf</span>
                      </div>
                      <span className="text-xs text-foreground/50">2.4 MB</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-between p-3 glass rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm">Worksheet_Template.xlsx</span>
                      </div>
                      <span className="text-xs text-foreground/50">1.1 MB</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Curriculum Sidebar */}
        <div className="w-full lg:w-96 glass border-l border-card-border flex flex-col shrink-0 h-[50vh] lg:h-auto">
          <div className="p-6 border-b border-card-border bg-background/50">
            <h3 className="font-bold text-lg">Course Content</h3>
            <div className="flex items-center gap-2 text-sm text-foreground/60 mt-1">
              <span className="text-primary font-medium">22%</span> Complete
            </div>
            <div className="w-full h-1.5 rounded-full bg-card-border mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-blue-400 w-[22%]"></div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {curriculum.map((module) => (
              <div key={module.id} className="border-b border-card-border">
                <button 
                  onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                >
                  <span className="font-bold text-sm text-foreground/90 pr-4">{module.title}</span>
                  <ChevronDown className={`w-4 h-4 text-foreground/50 transition-transform ${activeModule === module.id ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeModule === module.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-black/20"
                    >
                      <div className="py-2">
                        {module.lessons.map((lesson) => (
                          <button 
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson.id)}
                            className={`w-full px-6 py-3 flex items-start gap-3 text-left transition-colors ${activeLesson === lesson.id ? 'bg-primary/10 border-l-2 border-primary' : 'hover:bg-white/5 border-l-2 border-transparent'}`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {lesson.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : lesson.type === 'video' ? (
                                <PlayCircle className={`w-4 h-4 ${activeLesson === lesson.id ? 'text-primary' : 'text-foreground/40'}`} />
                              ) : (
                                <FileText className={`w-4 h-4 ${activeLesson === lesson.id ? 'text-primary' : 'text-foreground/40'}`} />
                              )}
                            </div>
                            <div>
                              <span className={`text-sm ${activeLesson === lesson.id ? 'text-primary font-medium' : 'text-foreground/80'}`}>
                                {lesson.title}
                              </span>
                              <p className="text-xs text-foreground/50 mt-1">{lesson.duration}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursePlayerPage() {
  return (
    <ProtectedRoute>
      <CoursePlayerContent />
    </ProtectedRoute>
  );
}
