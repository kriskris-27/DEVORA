"use client"

import { AnimatePresence, motion } from "framer-motion"

export function SplashLogo({ show = true }: { show?: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="splash"
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          aria-hidden={!show}
        >
          <motion.img
            src="/images/devora-logo.png"
            alt="Devora"
            className="h-16 w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
