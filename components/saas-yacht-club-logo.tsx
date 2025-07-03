"use client"

import { cn } from "@/lib/utils"

export function SaaSYachtClubLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-background", className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 21C5 21 5 20.5153 5.09599 19.8457C5.28129 18.5597 6.00365 14.5 12 14.5C17.9964 14.5 18.7187 18.5597 18.904 19.8457C19 20.5153 19 21 19 21H5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.5V3L5 11H12Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
