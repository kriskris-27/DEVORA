"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { courses } from "@/data/courses"

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug)

  if (!course) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-16">
        <p className="text-gray-900 text-lg">Course not found.</p>
        <Button asChild className="mt-4 rounded-full bg-blue-600 text-white hover:bg-blue-700">
          <Link href="/courses">Back to all courses</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <Link href="/courses" className="text-sm text-blue-600 hover:underline">
        ← Back to all courses
      </Link>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
      >
        <Image
          src="/abstract-learning-banner.png"
          alt={course.bannerAlt}
          width={1200}
          height={240}
          className="h-48 w-full object-cover md:h-60"
          priority
        />
      </motion.div>

      {/* Header */}
      <header className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-pretty text-2xl font-semibold text-gray-900 md:text-3xl">{course.title}</h1>
          <div className="mt-2 flex items-center gap-3">
            <Badge className="rounded-full bg-gray-100 text-gray-700 border-gray-200" variant="secondary">
              {course.level}
            </Badge>
            <span className="text-sm text-gray-600">Instructor: {course.instructor}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500 line-through">${course.originalPrice}</div>
          <div className="text-2xl font-semibold text-gray-900">${course.price}</div>
          <Button className="mt-3 rounded-full bg-blue-600 text-white hover:bg-blue-700">Start Learning</Button>
        </div>
      </header>

      {/* Content */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="rounded-2xl border border-black/5 bg-white text-gray-900 shadow-sm md:col-span-2">
          <CardContent className="space-y-4">
            <h2 className="pt-4 text-xl font-semibold">About this course</h2>
            <p className="text-gray-600">
              {course.description} This course is designed to be approachable yet thorough, giving you practical
              experience through examples and structured topics. Replace this paragraph with your own copy later.
            </p>

            <h2 className="pt-2 text-xl font-semibold">Syllabus</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {course.syllabus.map((topic, idx) => (
                <li key={idx} className="py-1">
                  {topic}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-black/5 bg-white text-gray-900 shadow-sm">
          <CardContent className="space-y-3">
            <h3 className="pt-4 text-lg font-semibold">What you’ll get</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Hands-on exercises</li>
              <li>Downloadable resources</li>
              <li>Lifetime access</li>
              <li>Certificate of completion</li>
            </ul>
            <Button asChild className="mt-2 w-full rounded-full bg-blue-600 text-white hover:bg-blue-700">
              <Link href={`/courses/${course.slug}`}>Start Learning</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
