"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface AuthWallModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthWallModal({ isOpen, onClose }: AuthWallModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Upgrade to Pro
          </AlertDialogTitle>
          <AlertDialogDescription>
            The Analytics dashboard is a Pro feature. Please upgrade your plan to get access to advanced insights and
            reports.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button>Upgrade</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
