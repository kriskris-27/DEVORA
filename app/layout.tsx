import type { ReactNode } from "react"
import { Work_Sans } from "next/font/google"
import "./globals.css"

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  preload: true,
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={workSans.variable}>
      <body className={"font-sans antialiased min-h-svh bg-[#F5F6FB] text-slate-12"}>
        {/* Foreground content */}
        <main className="relative z-[1] min-h-svh">{children}</main>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
