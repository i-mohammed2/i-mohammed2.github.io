"use client"

import { ChevronDown } from "lucide-react"

export function ScrollIndicator({ scrollProgress }) {
  const opacity = scrollProgress < 0.05 ? 1 : 0

  if (opacity <= 0) return null

  return (
    <div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="animate-bounce text-orange-200 flex flex-col items-center">
        <p className="mb-2 text-sm">Scroll to explore</p>
        <ChevronDown size={24} />
      </div>
    </div>
  )
}
