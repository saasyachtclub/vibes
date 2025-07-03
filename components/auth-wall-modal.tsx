"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lock, X, Zap } from "lucide-react"

interface AuthWallModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthWallModal({ isOpen, onClose }: AuthWallModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md rounded-xl border bg-background p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 h-8 w-8"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold">Unlock Pro Features</h2>
              <p className="mb-6 text-muted-foreground">
                Unlock advanced analytics, detailed reports, and forecasting to take your business to the next level.
              </p>
              <Button size="lg" className="w-full">
                <Zap className="mr-2 h-4 w-4" />
                Upgrade Now
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
