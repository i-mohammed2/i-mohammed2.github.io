"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function PillarsStarfield() {
  const starsRef = useRef<THREE.Points>()

  const [starGeo, starPositions, starSizes, starColors] = useMemo(() => {
    const count = 3000
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    // Pillars of Creation color palette
    const pillarColors = [
      [1.0, 0.9, 0.7], // Warm white/yellow
      [0.96, 0.62, 0.04], // Amber
      [0.92, 0.35, 0.05], // Deep orange
      [0.03, 0.57, 0.7], // Teal
      [0.2, 0.4, 0.6], // Deep blue
    ]

    for (let i = 0; i < count; i++) {
      // Distribute in sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const distance = Math.random() * 80 + 120

      positions[i * 3] = distance * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = distance * Math.cos(phi)

      sizes[i] = Math.random() * 2 + 0.5

      // Use Pillars color palette
      const colorIndex = Math.floor(Math.random() * pillarColors.length)
      const baseColor = pillarColors[colorIndex]
      const variation = 0.8 + Math.random() * 0.4

      colors[i * 3] = baseColor[0] * variation
      colors[i * 3 + 1] = baseColor[1] * variation
      colors[i * 3 + 2] = baseColor[2] * variation
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    return [geo, positions, sizes, colors]
  }, [])

  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uSize: { value: 4.0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float uSize;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Subtle twinkle
          float twinkle = sin(time * 0.8 + position.x * 50.0 + position.y * 50.0) * 0.5 + 0.5;
          gl_PointSize = size * uSize * (0.8 + twinkle * 0.4);
          gl_Position = projectionMatrix * mvPosition;
          
          gl_PointSize = gl_PointSize * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float r = 0.5;
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          float r2 = dot(cxy, cxy);
          if (r2 > r * r) discard;
          
          float alpha = 1.0 - smoothstep(r*0.7, r, sqrt(r2));
          gl_FragColor = vec4(vColor, alpha * 0.9);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    })
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      (starsRef.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.getElapsedTime()
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.005
    }
  })

  return <points ref={starsRef} geometry={starGeo} material={starMaterial} />
}
