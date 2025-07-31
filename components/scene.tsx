"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame, useThree, invalidate } from "@react-three/fiber"
import { EnhancedOrbitalRing } from "./enhanced-orbital-ring"
import { Html } from "@react-three/drei"
import { PremiumWireframePlanet } from "./premium-wireframe-planet"
import { PremiumStarfield } from "./premium-starfield"
import * as THREE from "three"

interface SceneProps {
  scrollProgress: number
}

export function Scene({ scrollProgress }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  // Smooth camera movement
  const cameraZ = 8 - scrollProgress * 6
  const cameraY = Math.sin(scrollProgress * Math.PI * 0.5) * 1.5

  const activeSection = useMemo(() => {
    if (scrollProgress < 0.2) return -1
    if (scrollProgress < 0.4) return 0
    if (scrollProgress < 0.6) return 1
    if (scrollProgress < 0.8) return 2
    return 3
  }, [scrollProgress])

  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  useFrame((state, delta) => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ, delta * 2)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraY, delta * 2)
    camera.lookAt(0, 0, 0)

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.008
    }

    invalidate()
  })

  return (
    <>
      {/* Optimized lighting */}
      <ambientLight intensity={0.15} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#60a5fa" />

      {/* Premium starfield */}
      <PremiumStarfield />

      <group ref={groupRef}>
        {/* Premium wireframe planet */}
        <PremiumWireframePlanet isActive={activeSection === 3} scrollProgress={scrollProgress} />

        {/* Enhanced orbital rings */}
        <EnhancedOrbitalRing radius={3.5} color="#0891b2" isActive={activeSection === 0} particleCount={6} />
        <EnhancedOrbitalRing radius={2.8} color="#ea580c" isActive={activeSection === 1} particleCount={5} />
        <EnhancedOrbitalRing radius={2.2} color="#f59e0b" isActive={activeSection === 2} particleCount={4} />
      </group>

      {showHint && scrollProgress < 0.3 && (
        <Html position={[0, -3, 0]} center style={{ pointerEvents: "none" }}>
          <div className="bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30 text-blue-200 text-sm animate-pulse pointer-events-none">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
              <span>Click sphere for inspiration</span>
            </div>
          </div>
        </Html>
      )}
    </>
  )
}
