"use client"

import { useState } from "react"
import { Menu, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header({ scrollProgress }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const opacity = Math.max(0, 1 - scrollProgress * 7) // Adjusted for longer intro

  const scrollToSection = (section: string) => {
    const sectionMap = {
      education: 0.25, // Updated for longer sections
      experience: 0.45,
      projects: 0.65,
      contact: 0.85,
    }

    const targetProgress = sectionMap[section] || 0
    const totalHeight = window.innerHeight * 8
    const targetScroll = targetProgress * totalHeight

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    })

    setIsMenuOpen(false)
  }

  if (opacity <= 0) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-6 transition-opacity duration-300" style={{ opacity }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <Star size={16} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-orange-200">Ibrahim Mohammed</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {["education", "experience", "projects", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-orange-200 hover:text-white transition-colors font-medium capitalize"
            >
              {section}
            </button>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-orange-200 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-slate-900/95 backdrop-blur-md rounded-lg border border-orange-500/30 p-4">
          <nav className="flex flex-col space-y-3">
            {["education", "experience", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-orange-200 hover:text-white transition-colors text-left p-3 rounded-lg capitalize"
              >
                {section}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
