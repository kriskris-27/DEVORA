"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-[#6517FF]"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      />
    </div>
  )
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function DashboardPage() {
  const courses = [
    { title: "Data Structures", level: "Beginner", progress: 40 },
    { title: "Algorithms I", level: "Intermediate", progress: 65 },
    { title: "System Design Basics", level: "Beginner", progress: 25 },
    { title: "SQL for Developers", level: "Beginner", progress: 80 },
  ]

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10"
    >
      {/* Welcome / Hero */}
      <motion.section variants={item} className="mb-8">
        <Card className="rounded-2xl border border-black/5 bg-white text-gray-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-pretty text-2xl md:text-3xl">
              Welcome back, Ashwin <span aria-hidden>👋</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            Continue your learning journey and track your progress here.
          </CardContent>
        </Card>
      </motion.section>

      {/* Grid sections */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* My Courses */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="rounded-2xl border border-black/5 bg-white text-gray-900 shadow-sm">
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {courses.map((c, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="text-base font-medium text-gray-900">{c.title}</div>
                    <span className="text-xs text-gray-600">{c.level}</span>
                  </div>
                  <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
                    <span>{c.progress}% complete</span>
                    <span>100%</span>
                  </div>
                  <ProgressBar value={c.progress} />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Problem Solving */}
        <motion.div variants={item}>
          <Card className="flex h-full flex-col justify-between rounded-2xl border border-black/5 bg-white text-gray-900 shadow-sm">
            <CardHeader>
              <CardTitle>Problem Solving</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="text-sm">Today&apos;s Challenge</div>
                <div className="text-base font-medium text-gray-900">Two Sum (Easy)</div>
              </div>
              <Button asChild className="w-full rounded-full bg-black text-white hover:bg-black/90">
                <Link href="/problem-solving">Solve Problems</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Career Tools */}
        <motion.div variants={item}>
          <Card className="flex h-full flex-col justify-between rounded-2xl border border-black/5 bg-white text-gray-900 shadow-sm">
            <CardHeader>
              <CardTitle>Career Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>Get AI-powered resume feedback.</p>
              <Button asChild className="w-full rounded-full bg-black text-white hover:bg-black/90">
                <Link href="/career-tools">Analyze Resume</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community Updates */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="rounded-2xl border border-black/5 bg-white text-gray-900 shadow-sm">
            <CardHeader>
              <CardTitle>Community Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">Join discussions, share code, and learn with peers.</CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        variants={item}
        className="mt-10 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600"
      >
        <p>© {new Date().getFullYear()} Devora</p>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="#" className="hover:text-gray-900">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-gray-900">
              Contact
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-gray-900">
              Terms
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-gray-900">
              Privacy
            </Link>
          </li>
        </ul>
      </motion.footer>
    </motion.div>
  )
}
