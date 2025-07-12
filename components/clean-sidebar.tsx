"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Home,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  FileText,
  Bell,
  HelpCircle,
  Layout,
  GraduationCap,
  FileClock,
  MessagesSquare,
  Lock,
  Linkedin,
  Link,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SaaSYachtClubLogo } from "@/components/saas-yacht-club-logo"

// Types
interface NavigationItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: string
  children?: NavigationItem[]
  locked?: boolean
}

interface IntegrationItem {
  id: string
  name: string
  domain: string
  connected: boolean
}

// Data
const navigationItems: NavigationItem[] = [
  { id: "dashboard", name: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "analytics", name: "Analytics", icon: BarChart3, href: "/analytics", badge: "Pro", locked: true },
  {
    id: "projects",
    name: "Projects",
    icon: Layout,
    href: "/projects",
    children: [
      { id: "active-projects", name: "Active Projects", icon: FileText, href: "/projects/active" },
      { id: "archived-projects", name: "Archived", icon: FileClock, href: "/projects/archived" },
    ],
  },
  { id: "chat", name: "AI Chat", icon: MessagesSquare, href: "/chat", badge: "New" },
  { id: "knowledge", name: "Knowledge", icon: GraduationCap, href: "/knowledge" },
  { id: "notifications", name: "Notifications", icon: Bell, href: "/notifications", badge: "3" },
]

const integrationItems: IntegrationItem[] = [
  { id: "hubspot", name: "HubSpot", domain: "hubspot.com", connected: true },
  { id: "salesforce", name: "Salesforce", domain: "salesforce.com", connected: false },
  { id: "attio", name: "Attio", domain: "attio.com", connected: true },
]

const settingsItems: NavigationItem[] = [
  { id: "settings", name: "Settings", icon: Settings, href: "/settings" },
  { id: "help", name: "Help", icon: HelpCircle, href: "/help" },
]

// Animation Variants
const sidebarVariants = {
  open: { width: "280px" },
  closed: { width: "64px" },
}

const contentVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -20 },
}

const transitionProps = {
  type: "tween" as const,
  ease: "easeOut" as const,
  duration: 0.2,
}

export function CleanSidebar({ onLockedItemClick }: { onLockedItemClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("chat")
  const [expandedSections, setExpandedSections] = useState<string[]>(["projects"])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true)
        setIsCollapsed(window.innerWidth < 1024)
      } else {
        setIsOpen(false)
        setIsCollapsed(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    if (!isCollapsed) setExpandedSections([])
  }

  const handleItemClick = (item: NavigationItem) => {
    if (item.locked) {
      onLockedItemClick()
      return
    }
    setActiveItem(item.id)
    if (window.innerWidth < 768) setIsOpen(false)
  }

  const toggleSection = (sectionId: string) => {
    if (isCollapsed) return
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const renderNavigationItem = (item: NavigationItem) => {
    const Icon = item.icon
    const isActive = activeItem === item.id
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedSections.includes(item.id)

    return (
      <div key={item.id}>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => (hasChildren ? toggleSection(item.id) : handleItemClick(item))}
                className={cn(
                  "w-full flex items-center rounded-md text-left transition-colors duration-200 group relative px-3 py-2",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isCollapsed ? "justify-center" : "space-x-3",
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between w-full overflow-hidden"
                    >
                      <span className="text-sm font-medium flex items-center whitespace-nowrap">
                        {item.locked && <Lock className="inline-block h-3 w-3 mr-2" />}
                        {item.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <Badge variant={isActive ? "secondary" : "outline"} className="h-5 px-2 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        {hasChildren && (
                          <ChevronRight
                            className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-90")}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
        {hasChildren && !isCollapsed && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden ml-4 pl-3 border-l"
              >
                <div className="py-1 space-y-1">
                  {item.children?.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleItemClick(child)}
                      className={cn(
                        "w-full flex items-center rounded-md text-left transition-colors duration-200 group relative px-3 py-1.5",
                        activeItem === child.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    )
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-background/50 backdrop-blur-sm"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={toggleSidebar} />}
      <motion.div
        className={cn(
          "fixed top-0 left-0 h-full bg-background border-r z-40 flex flex-col",
          "transition-transform duration-300 ease-in-out md:transition-all",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:z-auto",
        )}
        animate={isCollapsed ? "closed" : "open"}
        variants={sidebarVariants}
        transition={transitionProps}
      >
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0 h-[89px]">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="flex items-center space-x-3 overflow-hidden"
                variants={contentVariants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={transitionProps}
              >
                <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                  <SaaSYachtClubLogo className="h-5 w-5" />
                </div>
                <div className="whitespace-nowrap">
                  <h1 className="font-semibold text-lg">SaaS Yacht Club</h1>
                  <p className="text-xs text-muted-foreground">Member's Deck</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="hidden md:flex h-8 w-8"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <ScrollArea className="flex-1 px-3">
          <motion.nav className="py-4 space-y-1" variants={contentVariants} transition={transitionProps}>
            {navigationItems.map((item) => renderNavigationItem(item))}
          </motion.nav>
          <motion.div variants={contentVariants} transition={transitionProps}>
            <Separator className="my-4" />
          </motion.div>
          <motion.div className="space-y-1" variants={contentVariants} transition={transitionProps}>
            {!isCollapsed && (
              <h3 className="text-xs font-medium text-muted-foreground mb-2 px-3 uppercase">Integrations</h3>
            )}
            {isCollapsed && <Separator className="mb-4" />}
            <TooltipProvider delayDuration={0}>
              {integrationItems.map((integration) => (
                <Tooltip key={integration.id}>
                  <TooltipTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center rounded-md text-left transition-colors duration-200 group relative px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                        isCollapsed && "justify-center",
                      )}
                    >
                      <Image
                        src={`https://logo.clearbit.com/${integration.domain}`}
                        alt={`${integration.name} Logo`}
                        width={16}
                        height={16}
                      />
                      {!isCollapsed && (
                        <div className="flex items-center justify-between w-full ml-3">
                          <span className="text-sm font-medium">{integration.name}</span>
                          {integration.connected ? (
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                          ) : (
                            <Link className="h-3 w-3" />
                          )}
                        </div>
                      )}
                    </button>
                  </TooltipTrigger>
                  {isCollapsed && <TooltipContent side="right">{integration.name}</TooltipContent>}
                </Tooltip>
              ))}
            </TooltipProvider>
          </motion.div>
          <motion.div variants={contentVariants} transition={transitionProps}>
            <Separator className="my-4" />
          </motion.div>
          <motion.nav className="space-y-1" variants={contentVariants} transition={transitionProps}>
            {settingsItems.map((item) => renderNavigationItem(item))}
          </motion.nav>
        </ScrollArea>
        <div className="border-t flex-shrink-0">
          <DropdownMenu>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn("w-full h-auto", isCollapsed ? "justify-center p-3" : "justify-start p-4")}
                    >
                      <AnimatePresence>
                        {!isCollapsed ? (
                          <motion.div
                            className="flex items-center space-x-3 w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>JO</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-left overflow-hidden">
                              <p className="text-sm font-medium truncate">Jesse Ouellette</p>
                              <p className="text-xs text-muted-foreground truncate">jesse@leadmagic.io</p>
                              <p className="text-xs text-muted-foreground/70 truncate">Professional Vibe Coder</p>
                            </div>
                            <a
                              href="https://linkedin.com/in/jesseoue"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-muted-foreground hover:text-foreground"
                              aria-label="Jesse Ouellette's LinkedIn Profile"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </motion.div>
                        ) : (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JO</AvatarFallback>
                          </Avatar>
                        )}
                      </AnimatePresence>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>Jesse Ouellette</p>
                    <p className="text-muted-foreground">Professional Vibe Coder</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="center" side="right" className="w-56 ml-2">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-500">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </>
  )
}
