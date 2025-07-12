import { cn } from "@/lib/utils"

export function SaaSYachtClubLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-background", className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 27.9 72.1 10 50 10Z"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path d="M35 40V60" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M65 40V60" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 70H58" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M30 30L70 70" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M70 30L30 70" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}
