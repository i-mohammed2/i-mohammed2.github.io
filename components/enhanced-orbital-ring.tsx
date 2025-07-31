"use client"
// @ts-nocheck

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface EnhancedOrbitalRingProps {
  radius: number
  color: string
  isActive: boolean
  particleCount: number
}

export function EnhancedOrbitalRing({ radius, color, isActive, particleCount }: EnhancedOrbitalRingProps) {
  const ringRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const trailRef = useRef<THREE.Points>(null)

  // Enhanced ring material with glow
  const ringMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        opacity: { value: isActive ? 0.8 : 0.5 },
        glow: { value: isActive ? 1.2 : 0.8 },
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
        uniform float glow;
        varying vec3 vPosition;
        
        void main() {
          float pulse = sin(time * 2.0) * 0.3 + 0.7;
          vec3 glowColor = color * glow * pulse;
          gl_FragColor = vec4(glowColor, opacity);
        }
      `,
      transparent: true,
    })
  }, [color, isActive])

  // Enhanced particle material
  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        intensity: { value: isActive ? 1.0 : 0.6 },
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
        uniform float intensity;
        varying vec3 vPosition;
        
        void main() {
          float pulse = sin(time * 3.0 + vPosition.x * 10.0) * 0.5 + 0.5;
          vec3 finalColor = color * intensity * (0.8 + pulse * 0.4);
          gl_FragColor = vec4(finalColor, 0.9);
        }
      `,
      transparent: true,
    })
  }, [color, isActive])

  // Particle trail geometry
  const trailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const points = []
    const colors = []

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const nextAngle = ((i + 1) / particleCount) * Math.PI * 2

      // Create trail segments
      for (let j = 0; j < 8; j++) {
        const t = j / 7
        const currentAngle = angle + (nextAngle - angle) * t

        points.push(Math.cos(currentAngle) * radius, 0, Math.sin(currentAngle) * radius)

        const alpha = 1 - t * 0.8
        const colorObj = new THREE.Color(color)
        colors.push(colorObj.r, colorObj.g, colorObj.b, alpha)
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3))
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4))

    return geometry
  }, [radius, particleCount, color])

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
    const time = state.clock.getElapsedTime()

    // Update shader uniforms
    if (ringRef.current) {
      ringRef.current.material.uniforms.time.value = time
      ringRef.current.rotation.y += delta * 0.3
    }

    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, index) => {
        if (particle.material.uniforms) {
          particle.material.uniforms.time.value = time + index * 0.5
        }
      })
      particlesRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group>
      {/* Enhanced ring */}
      <mesh ref={ringRef} material={ringMaterial} rotation-x={Math.PI / 2}>
        <torusGeometry args={[radius, 0.02, 8, 32]} />
      </mesh>

      {/* Enhanced particles */}
      <group ref={particlesRef}>
        {particlePositions.map((pos, i) => (
          <mesh
            key={i}
            position={[pos.x, pos.y, pos.z]}
            material={particleMaterial.clone()}
            scale={isActive ? 0.12 : 0.08}
          >
            <sphereGeometry args={[1, 8, 8]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
