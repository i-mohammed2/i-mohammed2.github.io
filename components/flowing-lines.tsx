"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function FlowingLines() {
  const linesRef = useRef()

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const points = []
    const colors = []

    // Create flowing lines around the sphere
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 2.5 + Math.sin(i) * 0.5

      for (let j = 0; j < 50; j++) {
        const t = j / 49
        const x = Math.cos(angle + t * Math.PI * 4) * (radius + Math.sin(t * Math.PI * 6) * 0.3)
        const y = Math.sin(t * Math.PI * 3) * 1.5
        const z = Math.sin(angle + t * Math.PI * 4) * (radius + Math.sin(t * Math.PI * 6) * 0.3)

        points.push(x, y, z)

        // Color gradient
        const colorChoice = i % 3
        if (colorChoice === 0) {
          colors.push(0.2, 0.8, 0.4) // Green
        } else if (colorChoice === 1) {
          colors.push(0.3, 0.6, 1.0) // Blue
        } else {
          colors.push(1.0, 0.5, 0.2) // Orange
        }
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3))
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

    return geometry
  }, [])

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
      linesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return <line ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
}
