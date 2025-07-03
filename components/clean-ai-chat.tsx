"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight, Check, ChevronDown, Paperclip, Bot, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Custom hook for auto-resizing textarea
function useAutoResizeTextarea({ minHeight, maxHeight }: { minHeight: number; maxHeight?: number }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "auto"
    const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY))
    textarea.style.height = `${newHeight}px`
  }, [minHeight, maxHeight])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) adjustHeight()
  }, [adjustHeight])

  return { textareaRef, adjustHeight }
}

function ThinkingDots() {
  return (
    <div className="flex items-center space-x-1.5">
      <div
        className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  )
}

export function CleanAIChat() {
  const [value, setValue] = useState("")
  const [messages, setMessages] = useState<
    Array<{ id: string; content: string; role: "user" | "assistant" | "system"; timestamp: Date }>
  >([
    {
      id: "0",
      content: "IYKYK",
      role: "system",
      timestamp: new Date(Date.now() - 360000),
    },
    {
      id: "1",
      content: "Where do I find the SaaS Yacht Club?",
      role: "user",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      content: "Check us out on WhatsApp....",
      role: "assistant",
      timestamp: new Date(Date.now() - 240000),
    },
  ])
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 48, maxHeight: 300 })
  const [selectedModel, setSelectedModel] = useState("GPT-4o")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const AI_MODELS = ["GPT-4o", "Claude 3.5 Sonnet", "Gemini 2.0 Flash", "GPT-4o Mini", "o1-preview"]
  const MODEL_DOMAINS: Record<string, string> = {
    "GPT-4o": "openai.com",
    "Claude 3.5 Sonnet": "anthropic.com",
    "Gemini 2.0 Flash": "google.com",
    "GPT-4o Mini": "openai.com",
    "o1-preview": "openai.com",
  }

  const scrollToBottom = useCallback(() => {
    const scrollViewport = scrollAreaRef.current?.querySelector("div[data-radix-scroll-area-viewport]")
    if (scrollViewport) scrollViewport.scrollTo({ top: scrollViewport.scrollHeight, behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = async () => {
    if (!value.trim() || isTyping) return
    const userMessage = {
      id: Date.now().toString(),
      content: value.trim(),
      role: "user" as const,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setValue("")
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: "Aye, aye! Charting a course to find that data for ye now, Captain.",
        role: "assistant" as const,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-6 flex items-center justify-between h-[89px] flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
            <Bot className="h-6 w-6 text-background" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Captain YOLO</h1>
            <p className="text-sm text-muted-foreground">Your AI First Mate</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-950/50 text-green-400 border-green-900">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Online
          </Badge>
          <Button variant="outline" size="sm">
            <Zap className="h-4 w-4 mr-2" />
            Boost
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-8 p-6">
          {messages.map((message) => {
            if (message.role === "system") {
              return (
                <div key={message.id} className="text-center text-xs text-muted-foreground/50 font-mono">
                  - {message.content} -
                </div>
              )
            }
            return (
              <div
                key={message.id}
                className={cn("flex gap-4", message.role === "user" ? "justify-end" : "justify-start")}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg px-4 py-3",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-2 opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.role === "user" && (
                  <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
                    <AvatarFallback>JO</AvatarFallback>
                  </Avatar>
                )}
              </div>
            )
          })}
          {isTyping && (
            <div className="flex gap-4 justify-start">
              <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-4 py-3 flex items-center">
                <ThinkingDots />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-6 border-t bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-lg border p-1.5">
            <div className="relative flex flex-col">
              <textarea
                ref={textareaRef}
                value={value}
                placeholder="Send a message to the Captain..."
                className="w-full px-4 pt-3 pb-14 bg-transparent border-none resize-none focus:outline-none placeholder:text-muted-foreground text-sm"
                onKeyDown={handleKeyDown}
                onChange={(e) => setValue(e.target.value)}
                rows={1}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-1 h-8 pl-1 pr-2 text-xs rounded-md">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedModel}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-1.5"
                          >
                            <Image
                              src={`https://logo.clearbit.com/${MODEL_DOMAINS[selectedModel]}`}
                              alt={`${selectedModel} Logo`}
                              width={16}
                              height={16}
                            />
                            {selectedModel}
                            <ChevronDown className="w-3 h-3 opacity-50" />
                          </motion.div>
                        </AnimatePresence>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[12rem]">
                      {AI_MODELS.map((model) => (
                        <DropdownMenuItem
                          key={model}
                          onSelect={() => setSelectedModel(model)}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={`https://logo.clearbit.com/${MODEL_DOMAINS[model]}`}
                              alt={`${model} Logo`}
                              width={16}
                              height={16}
                            />
                            <span>{model}</span>
                          </div>
                          {selectedModel === model && <Check className="w-4 h-4" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Separator orientation="vertical" className="h-4" />
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Attach file">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  size="icon"
                  className="h-8 w-8"
                  disabled={!value.trim() || isTyping}
                  onClick={handleSendMessage}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
