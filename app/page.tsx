"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Loader } from "@/components/loader"
import { Scene } from "@/components/scene"
import { ScrollProgress } from "@/components/scroll-progress"
import { ContentOverlay } from "@/components/content-overlay"
import { Header } from "@/components/header"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { FloatingNavigation } from "@/components/floating-navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let ticking = false
    const totalHeight = window.innerHeight * 6

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1)
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }

    document.body.style.height = `${totalHeight + window.innerHeight}px`
    window.addEventListener("scroll", handleScroll, { passive: true })
    setLoaded(true)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.body.style.height = "auto"
    }
  }, [])

  return (
    <main className="fixed inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 light:from-slate-100 light:via-slate-200 light:to-slate-300" />

      {!loaded && <Loader />}

      <Header scrollProgress={scrollProgress} />

      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 75 }} // Moved camera much closer
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        dpr={1}
        frameloop="demand"
        performance={{ min: 0.3 }}
        style={{ pointerEvents: "auto" }}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>

      <ContentOverlay scrollProgress={scrollProgress} />
      <FloatingNavigation scrollProgress={scrollProgress} />
      <ScrollProgress progress={scrollProgress} />
      <ScrollIndicator scrollProgress={scrollProgress} />
      
      {/* Enhanced Components */}
      <ThemeToggle />
    </main>
  )
}
