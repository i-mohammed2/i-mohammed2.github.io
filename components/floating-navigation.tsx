"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingNavigation({ scrollProgress }: { scrollProgress: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const shouldShow = scrollProgress > 0.05

  const scrollToSection = (section: string) => {
    const sectionMap: Record<string, number> = {
      intro: 0,
      education: 0.3,
      experience: 0.5,
      projects: 0.7,
      contact: 0.9,
    }

    const targetProgress = sectionMap[section] || 0
    const totalHeight = window.innerHeight * 6
    const targetScroll = targetProgress * totalHeight

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    })

    setIsExpanded(false)
  }

  const getCurrentSection = () => {
    if (scrollProgress < 0.2) return "Journey Begins"
    if (scrollProgress < 0.4) return "Education"
    if (scrollProgress < 0.6) return "Experience"
    if (scrollProgress < 0.8) return "Projects"
    return "Contact"
  }

  if (!shouldShow) return null

  return (
    <div className="fixed top-4 right-2 xs:top-6 xs:right-4 md:right-6 z-40">
      <div className="bg-slate-900/90 backdrop-blur-md rounded-full border border-orange-500/30 shadow-xl">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-orange-200 hover:text-white hover:bg-orange-800/30 rounded-full px-3 xs:px-4 md:px-6 py-2 xs:py-3 flex items-center space-x-1 xs:space-x-2"
        >
          <span className="font-medium text-xs xs:text-sm md:text-base">{getCurrentSection()}</span>
          {isExpanded ? <ChevronUp size={14} className="xs:w-4 xs:h-4" /> : <ChevronDown size={14} className="xs:w-4 xs:h-4" />}
        </Button>

        {isExpanded && (
          <div className="absolute top-full right-0 mt-2 bg-slate-900/95 backdrop-blur-md rounded-lg border border-orange-500/30 shadow-xl overflow-hidden min-w-[160px] xs:min-w-[180px] md:min-w-[200px]">
            <div className="p-1 xs:p-2 space-y-0.5 xs:space-y-1">
              {[
                { key: "intro", label: "Journey Begins" },
                { key: "education", label: "Education" },
                { key: "experience", label: "Experience" },
                { key: "projects", label: "Projects" },
                { key: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className="w-full text-left px-2 xs:px-3 md:px-4 py-1.5 xs:py-2 md:py-3 text-orange-200 hover:text-white hover:bg-orange-800/30 rounded-lg transition-all duration-200 text-xs xs:text-sm md:text-base"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
