"use client"

import { useState } from "react"
import { CleanSidebar } from "@/components/clean-sidebar"
import { CleanAIChat } from "@/components/clean-ai-chat"
import { AuthWallModal } from "@/components/auth-wall-modal"

export default function Page() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <div className="dark flex h-screen w-screen bg-background text-foreground">
      <CleanSidebar onLockedItemClick={() => setIsAuthModalOpen(true)} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <CleanAIChat />
      </main>
      <AuthWallModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}
