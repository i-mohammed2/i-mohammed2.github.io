"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function OrbitalRing({ radius, color, isActive, particleCount }) {
  const ringRef = useRef()
  const particlesRef = useRef()

  // Simple materials for performance
  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: isActive ? 0.8 : 0.5,
      }),
    [color, isActive],
  )

  const particleMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: isActive ? 0.4 : 0.2,
      }),
    [color, isActive],
  )

  // Generate particle positions
  const particlePositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      positions.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        y: 0,
      })
    }
    return positions
  }, [radius, particleCount])

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.4
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.6
    }
  })

  return (
    <group>
      {/* Ring */}
      <mesh ref={ringRef} material={ringMaterial} rotation-x={Math.PI / 2}>
        <torusGeometry args={[radius, 0.015, 6, 24]} />
      </mesh>

      {/* Particles */}
      <group ref={particlesRef}>
        {particlePositions.map((pos, i) => (
          <mesh key={i} position={[pos.x, pos.y, pos.z]} material={particleMaterial} scale={isActive ? 0.1 : 0.07}>
            <sphereGeometry args={[1, 6, 6]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
