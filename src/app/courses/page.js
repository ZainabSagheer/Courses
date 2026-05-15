"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Users, Star, ArrowRight, Search, Filter } from 'lucide-react';

import { courses as staticCourses, fetchCourses } from '@/lib/data';

const categories = ["All", "Marketing", "AI", "Trading"];

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState(staticCourses);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCourses().then(setAllCourses);
  }, []);

  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="pt-12 pb-20 relative bg-background/50 border-b border-card-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Explore Our <span className="text-gradient">Premium Courses</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/70 max-w-2xl mx-auto"
          >
            Level up your skills with our industry-leading programs taught by top professionals.
          </motion.p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-card-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'glass text-foreground/80 hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-card-border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pt-12">
        <div className="container mx-auto px-6">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card overflow-hidden group flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <span className="px-3 py-1 bg-primary/80 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                        {course.category}
                      </span>
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3 text-sm text-foreground/60 shrink-0">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors flex-grow">
                      {course.title}
                    </h3>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-card-border shrink-0">
                      <span className="text-2xl font-bold text-foreground">{course.price}</span>
                      <Link
                        href={`/courses/${course.id}`}
                        className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-foreground/60">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium">No courses found matching your criteria.</h3>
              <p className="mt-2">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
