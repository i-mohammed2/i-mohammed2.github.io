"use client"

import { useEffect, useState, useCallback, useRef } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const requestRef = useRef<number>()

  const updateMousePosition = useCallback((e: MouseEvent) => {
    // Cancel previous animation frame
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
    }
    
    // Use requestAnimationFrame for smooth updates
    requestRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])
  const handleMouseOut = useCallback(() => setIsVisible(false), [])

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setIsDesktop(hasHover)
    
    if (!hasHover) return // Don't show custom cursor on mobile/touch devices

    // Add event listeners with passive option for better performance
    document.addEventListener('mousemove', updateMousePosition, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter, { passive: true })
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    })

    return () => {
      // Cancel animation frame on cleanup
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseout', handleMouseOut)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [updateMousePosition, handleMouseEnter, handleMouseLeave, handleMouseOut])

  if (!isVisible || !isDesktop) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Main cursor */}
      <div
        className="absolute w-3 h-3 bg-orange-400 rounded-full transition-transform duration-100 ease-out will-change-transform"
        style={{
          left: position.x - 6,
          top: position.y - 6,
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />
      
      {/* Trailing cursor */}
      <div
        className="absolute w-6 h-6 border border-orange-400/60 rounded-full transition-all duration-200 ease-out will-change-transform"
        style={{
          left: position.x - 12,
          top: position.y - 12,
          transform: `scale(${isHovering ? 1.3 : 1})`,
          opacity: isHovering ? 0.8 : 0.5,
        }}
      />
    </div>
  )
}
