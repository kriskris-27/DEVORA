"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Course } from "@/data/courses"

export default function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="rounded-2xl border border-black/5 bg-white text-gray-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-lg">{course.icon}</span>
            <div>
              <CardTitle className="text-base md:text-lg">{course.title}</CardTitle>
              <CardDescription className="mt-1">
                <Badge className="rounded-full bg-gray-100 text-gray-700 border-gray-200" variant="secondary">
                  {course.level}
                </Badge>
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 line-through">${course.originalPrice}</div>
            <div className="text-lg font-semibold text-gray-900">${course.price}</div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>
          {typeof course.progress === "number" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              {/* Use blue accent for indicator */}
              <Progress value={course.progress} className="h-2 bg-gray-200 [&>div]:bg-blue-600" />
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button asChild className="w-full rounded-full bg-blue-600 text-white hover:bg-blue-700">
            <Link href={`/courses/${course.slug}`}>View Course</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
