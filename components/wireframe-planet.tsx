"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function WireframePlanet({ isActive, scrollProgress }) {
  const planetRef = useRef()
  const innerSphereRef = useRef()
  const [isHovered, setIsHovered] = useState(false)

  // Simple wireframe material
  const wireframeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: isHovered ? "#60a5fa" : "#3b82f6",
        wireframe: true,
        transparent: true,
        opacity: isHovered ? 0.9 : 0.7,
      }),
    [isHovered],
  )

  // Inner subtle sphere for depth
  const innerSphereMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#1e3a8a",
        transparent: true,
        opacity: isHovered ? 0.2 : 0.1,
      }),
    [isHovered],
  )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (planetRef.current) {
      const pulse = 1 + Math.sin(time * 1.5) * 0.02
      const hoverScale = isHovered ? 1.05 : 1
      planetRef.current.scale.setScalar(pulse * (isActive ? 1.8 : 1.5) * hoverScale)
      planetRef.current.rotation.y += 0.005
      planetRef.current.rotation.x += 0.002
    }

    if (innerSphereRef.current) {
      const hoverScale = isHovered ? 1.05 : 1
      innerSphereRef.current.scale.setScalar((isActive ? 1.8 : 1.5) * hoverScale)
      innerSphereRef.current.rotation.y -= 0.003
    }
  })

  return (
    <group>
      {/* Inner subtle sphere for depth */}
      <mesh ref={innerSphereRef} material={innerSphereMaterial}>
        <sphereGeometry args={[1, 16, 16]} />
      </mesh>

      {/* Main wireframe sphere */}
      <mesh
        ref={planetRef}
        material={wireframeMaterial}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <sphereGeometry args={[1, 24, 24]} />
      </mesh>
    </group>
  )
}
