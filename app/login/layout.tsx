"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { SplashLogo } from "@/components/splash-logo"
import { MeshGradient } from "@paper-design/shaders-react" // scoped animated background

export default function LoginLayout({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)
  const prefersReducedMotion = useReducedMotion()
  const [cardReady, setCardReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen">
      <MeshGradient
        colors={["#4E1BAD", "#2E0066", "#130129", "#000000"]}
        speed={1.2}
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
      />
      <div className="relative z-[1]">
        {/* Card is always mounted so the background never changes and no remount/glitch occurs */}
        <motion.div
          key="login-card"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          animate={
            prefersReducedMotion ? { opacity: 1, y: 0 } : cardReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
          }
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>

        {/* Splash overlays the same background; fades out first.
            Once its exit animation completes, we flip cardReady to true. */}
        <AnimatePresence onExitComplete={() => setCardReady(true)}>
          {showSplash && (
            <motion.div
              key="splash-overlay"
              className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* SplashLogo already animates its image in; the overlay fade handles the smooth fade-out */}
              <SplashLogo show />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
