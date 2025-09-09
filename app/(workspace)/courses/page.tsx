"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import CourseCard from "@/components/course-card"
import { courses } from "@/data/courses"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 

export default function CoursesPage() {
  // UI-only for now per requirements; values are not used to filter server-side
  const [query, setQuery] = useState("")
  const [level, setLevel] = useState<string>("all")

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      {/* Hero / Header */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <h1 className="text-pretty text-3xl font-semibold text-gray-900 md:text-4xl">All Courses</h1>
        <p className="mt-2 max-w-2xl text-pretty text-gray-600">
          Explore our curated programming courses and track your learning journey.
        </p>

        {/* Search + Filter (static UI) */}
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <Input
            placeholder="Search courses…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="md:col-span-2"
          />
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.section>

      {/* Courses Grid */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
        }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {courses.map((c, i) => (
          <CourseCard key={c.slug} course={c} index={i} />
        ))}
      </motion.section>
    </div>
  )
}
