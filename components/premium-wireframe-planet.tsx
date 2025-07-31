"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function PremiumWireframePlanet({ isActive, scrollProgress }) {
  const outerSphereRef = useRef()
  const innerSphereRef = useRef()
  const coreRef = useRef()
  const scanLineRef = useRef()
  const [isHovered, setIsHovered] = useState(false)

  // Outer detailed wireframe
  const outerWireframeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: isHovered ? "#60a5fa" : "#3b82f6",
        wireframe: true,
        transparent: true,
        opacity: isHovered ? 0.9 : 0.7,
      }),
    [isHovered],
  )

  // Inner simple wireframe
  const innerWireframeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: isHovered ? "#93c5fd" : "#60a5fa",
        wireframe: true,
        transparent: true,
        opacity: isHovered ? 0.6 : 0.4,
      }),
    [isHovered],
  )

  // Core glow
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: isHovered ? "#dbeafe" : "#93c5fd",
        transparent: true,
        opacity: isHovered ? 0.3 : 0.15,
      }),
    [isHovered],
  )

  // Scanning line effect
  const scanLineMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color("#60a5fa") },
        opacity: { value: 0.8 },
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float opacity;
        varying vec3 vPosition;
        
        void main() {
          float scanLine = sin(vPosition.y * 10.0 + time * 3.0) * 0.5 + 0.5;
          float alpha = scanLine * opacity * 0.3;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Update scan line shader
    if (scanLineRef.current) {
      scanLineRef.current.material.uniforms.time.value = time
    }

    if (outerSphereRef.current) {
      const pulse = 1 + Math.sin(time * 1.2) * 0.02
      const hoverScale = isHovered ? 1.08 : 1
      const baseScale = isActive ? 1.8 : 1.5

      outerSphereRef.current.scale.setScalar(pulse * baseScale * hoverScale)
      outerSphereRef.current.rotation.y += 0.004
      outerSphereRef.current.rotation.x += 0.002
    }

    if (innerSphereRef.current) {
      const hoverScale = isHovered ? 1.08 : 1
      const baseScale = isActive ? 1.8 : 1.5

      innerSphereRef.current.scale.setScalar(baseScale * hoverScale * 0.7)
      innerSphereRef.current.rotation.y -= 0.006
      innerSphereRef.current.rotation.z += 0.001
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.1
      const hoverScale = isHovered ? 1.08 : 1
      const baseScale = isActive ? 1.8 : 1.5

      coreRef.current.scale.setScalar(pulse * baseScale * hoverScale * 0.3)
    }

    if (scanLineRef.current) {
      const hoverScale = isHovered ? 1.08 : 1
      const baseScale = isActive ? 1.8 : 1.5

      scanLineRef.current.scale.setScalar(baseScale * hoverScale * 1.02)
      scanLineRef.current.rotation.y = time * 0.5
    }
  })

  return (
    <group>
      {/* Core glow */}
      <mesh ref={coreRef} material={coreMaterial}>
        <sphereGeometry args={[1, 16, 16]} />
      </mesh>

      {/* Inner wireframe layer */}
      <mesh ref={innerSphereRef} material={innerWireframeMaterial}>
        <sphereGeometry args={[1, 16, 16]} />
      </mesh>

      {/* Outer detailed wireframe */}
      <mesh
        ref={outerSphereRef}
        material={outerWireframeMaterial}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>

      {/* Scanning effect */}
      <mesh ref={scanLineRef} material={scanLineMaterial}>
        <sphereGeometry args={[1, 24, 24]} />
      </mesh>
    </group>
  )
}
