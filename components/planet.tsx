"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Planet({ isActive, scrollProgress }) {
  const planetRef = useRef()
  const innerSphereRef = useRef()
  const [isHovered, setIsHovered] = useState(false)

  const randomLinks = [
    "https://github.com/trending",
    "https://stackoverflow.com/questions/tagged/javascript",
    "https://dev.to/",
    "https://news.ycombinator.com/",
    "https://www.producthunt.com/",
    "https://dribbble.com/",
    "https://www.awwwards.com/",
    "https://codepen.io/trending",
  ]

  const handleClick = () => {
    const randomLink = randomLinks[Math.floor(Math.random() * randomLinks.length)]
    window.open(randomLink, "_blank")
  }

  // Wireframe material for the main sphere
  const wireframeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: isHovered ? "#60a5fa" : "#3b82f6",
        wireframe: true,
        transparent: true,
        opacity: isHovered ? 0.8 : 0.6,
      }),
    [isHovered],
  )

  // Inner sphere with subtle glow
  const innerSphereMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#1e40af",
        transparent: true,
        opacity: isHovered ? 0.15 : 0.08,
      }),
    [isHovered],
  )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (planetRef.current) {
      const pulse = 1 + Math.sin(time * 1.2) * 0.03
      const hoverScale = isHovered ? 1.05 : 1
      planetRef.current.scale.setScalar(pulse * (isActive ? 2.2 : 2) * hoverScale)
      planetRef.current.rotation.y += 0.005
      planetRef.current.rotation.x += 0.002
    }

    if (innerSphereRef.current) {
      const hoverScale = isHovered ? 1.05 : 1
      innerSphereRef.current.scale.setScalar((isActive ? 2.2 : 2) * hoverScale)
      innerSphereRef.current.rotation.y -= 0.003
    }
  })

  return (
    <group>
      {/* Inner subtle sphere */}
      <mesh ref={innerSphereRef} material={innerSphereMaterial}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>

      {/* Wireframe sphere */}
      <mesh
        ref={planetRef}
        material={wireframeMaterial}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{ cursor: isHovered ? "pointer" : "auto" }}
      >
        <sphereGeometry args={[1, 24, 24]} />
      </mesh>
    </group>
  )
}
