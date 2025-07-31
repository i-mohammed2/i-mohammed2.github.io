"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function PremiumStarfield() {
  const starsRef = useRef<THREE.Points>()

  const starSystem = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(300 * 3) // Reduced for performance
    const colors = new Float32Array(300 * 3)
    const sizes = new Float32Array(300)

    for (let i = 0; i < 300; i++) {
      // Distribute in sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const distance = Math.random() * 60 + 80

      positions[i * 3] = distance * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = distance * Math.cos(phi)

      sizes[i] = Math.random() * 1.5 + 0.5

      // Premium color palette
      const colorChoice = Math.random()
      if (colorChoice > 0.8) {
        colors[i * 3] = 0.6 + Math.random() * 0.4 // R
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2 // G
        colors[i * 3 + 2] = 1.0 // B (blue-white)
      } else if (colorChoice > 0.6) {
        colors[i * 3] = 1.0 // R
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1 // G
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.3 // B (warm white)
      } else {
        const brightness = 0.7 + Math.random() * 0.3
        colors[i * 3] = brightness
        colors[i * 3 + 1] = brightness
        colors[i * 3 + 2] = brightness
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) * 3 : 3,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    return { geometry, material }
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      // Simple rotation animation since we're using PointsMaterial now
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.002
    }
  })

  return <points ref={starsRef} geometry={starSystem.geometry} material={starSystem.material} />
}
