export type CourseLevel = "Beginner" | "Intermediate" | "Advanced"

export type Course = {
  slug: string
  title: string
  level: CourseLevel
  description: string
  price: number
  originalPrice: number
  progress?: number // 0–100; if present, show progress bar
  icon: string // emoji or short text icon
  instructor: string
  syllabus: string[]
  bannerAlt: string
}

export const courses: Course[] = [
  {
    slug: "data-structures-and-algorithms",
    title: "Data Structures & Algorithms",
    level: "Intermediate",
    description:
      "Master core data structures, time complexity, and classic algorithm patterns you’ll use in interviews and real projects.",
    price: 129,
    originalPrice: 199,
    progress: 60,
    icon: "📚",
    instructor: "Jane Cooper",
    syllabus: ["Introduction", "Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Graphs", "Greedy", "DP Basics"],
    bannerAlt: "Abstract banner for Data Structures & Algorithms",
  },
  {
    slug: "javascript-from-zero-to-hero",
    title: "JavaScript: Zero to Hero",
    level: "Beginner",
    description:
      "Learn modern JavaScript from scratch, including variables, functions, async/await, and best practices.",
    price: 79,
    originalPrice: 129,
    progress: 20,
    icon: "🟨",
    instructor: "Courtney Henry",
    syllabus: ["JS Basics", "Functions", "Objects", "ES6+", "Async JS", "Modules", "DOM", "Fetch API"],
    bannerAlt: "Banner for JavaScript course",
  },
  {
    slug: "react-essential-training",
    title: "React Essential Training",
    level: "Beginner",
    description:
      "Build interactive UIs with components, hooks, and state management. Learn patterns to ship production-ready apps.",
    price: 99,
    originalPrice: 149,
    progress: 0,
    icon: "⚛️",
    instructor: "Devon Lane",
    syllabus: ["Intro to React", "Components", "Props & State", "Hooks", "Routing", "Data Fetching", "Testing"],
    bannerAlt: "Abstract banner for React course",
  },
  {
    slug: "system-design-fundamentals",
    title: "System Design Fundamentals",
    level: "Intermediate",
    description:
      "Scale systems with load balancers, caching, queues, databases, and consistent hashing. Design with trade-offs.",
    price: 149,
    originalPrice: 229,
    progress: 35,
    icon: "🏗️",
    instructor: "Arlene McCoy",
    syllabus: ["Foundations", "Latency & Throughput", "Caching", "Databases", "Queues", "Design Case Studies"],
    bannerAlt: "System design abstract banner",
  },
  {
    slug: "sql-for-developers",
    title: "SQL for Developers",
    level: "Beginner",
    description:
      "Query data confidently using SELECT, JOINs, GROUP BY, subqueries, and window functions with practical exercises.",
    price: 59,
    originalPrice: 99,
    progress: 80,
    icon: "🧮",
    instructor: "Wade Warren",
    syllabus: ["Relational Basics", "SELECT", "JOINs", "Aggregations", "Subqueries", "Window Functions"],
    bannerAlt: "Banner for SQL course",
  },
  {
    slug: "advanced-typescript-patterns",
    title: "Advanced TypeScript Patterns",
    level: "Advanced",
    description:
      "Push TypeScript to the limit with generics, conditional types, utility types, and safe API design patterns.",
    price: 139,
    originalPrice: 199,
    icon: "🔷",
    instructor: "Jenny Wilson",
    syllabus: ["Generics Deep Dive", "Narrowing", "Conditional Types", "Utility Types", "API Typing Patterns"],
    bannerAlt: "Banner for TypeScript course",
  },
  {
    slug: "python-for-data-analysis",
    title: "Python for Data Analysis",
    level: "Beginner",
    description:
      "Analyze data using Python, pandas, and NumPy. Clean, transform, and visualize data to unlock insights.",
    price: 89,
    originalPrice: 129,
    icon: "🐍",
    instructor: "Robert Fox",
    syllabus: ["Python Refresher", "pandas Basics", "Data Cleaning", "Aggregation", "Visualization"],
    bannerAlt: "Banner for Python data analysis",
  },
  {
    slug: "fullstack-nextjs",
    title: "Full‑Stack Next.js",
    level: "Intermediate",
    description: "Build production apps with the App Router, server components, caching, and UI patterns that scale.",
    price: 159,
    originalPrice: 239,
    icon: "🚀",
    instructor: "Darlene Robertson",
    syllabus: ["App Router", "RSC Fundamentals", "Data Fetching", "Mutations", "Caching", "Deployment"],
    bannerAlt: "Banner for Next.js course",
  },
]
