"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-6 left-4 md:left-6 z-40 bg-slate-900/90 backdrop-blur-md rounded-full border border-orange-500/30 shadow-xl"
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="fixed top-6 left-4 md:left-6 z-40 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-md rounded-full border border-orange-500/30 shadow-xl hover:bg-orange-800/30 transition-all duration-300"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-4 w-4 text-orange-300" />
      ) : (
        <Moon className="h-4 w-4 text-slate-600" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
