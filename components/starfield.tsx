"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Starfield({ count = 5000, radius = 100, depth = 50, fade = true }) {
  const starsRef = useRef<THREE.Points>()

  // Create optimized star field using instanced mesh for better performance
  const [starGeo, starPositions, starSizes, starColors] = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    // Create stars with varied sizes and colors
    for (let i = 0; i < count; i++) {
      // Distribute stars in a sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const distance = Math.random() * depth + radius - depth

      const x = distance * Math.sin(phi) * Math.cos(theta)
      const y = distance * Math.sin(phi) * Math.sin(theta)
      const z = distance * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Vary star sizes
      sizes[i] = Math.random() * 1.5 + 0.5

      // Create varied star colors (mostly white with hints of blue/yellow)
      const colorChoice = Math.random()
      if (colorChoice > 0.95) {
        // Blue-ish stars
        colors[i * 3] = 0.7 + Math.random() * 0.3
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3
        colors[i * 3 + 2] = 1.0
      } else if (colorChoice > 0.9) {
        // Yellow-ish stars
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.4
      } else {
        // White stars with slight variations
        const brightness = 0.8 + Math.random() * 0.2
        colors[i * 3] = brightness
        colors[i * 3 + 1] = brightness
        colors[i * 3 + 2] = brightness
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    return [geo, positions, sizes, colors]
  }, [count, radius, depth])

  // Star shader material for better looking stars
  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        fade: { value: fade ? 1.0 : 0.0 },
        uSize: { value: 3.0 },
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
          
          // Twinkle effect
          float twinkle = sin(time * 0.5 + position.x * 100.0 + position.y * 100.0 + position.z * 100.0) * 0.5 + 0.5;
          gl_PointSize = size * uSize * (1.0 + twinkle * 0.2);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size attenuation
          gl_PointSize = gl_PointSize * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float fade;
        
        void main() {
          // Circular point shape
          float r = 0.5;
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          float r2 = dot(cxy, cxy);
          if (r2 > r * r) discard;
          
          // Soft edge glow
          float alpha = 1.0 - smoothstep(r*0.8, r, sqrt(r2));
          
          // Apply color and fade based on distance
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    })
  }, [fade])

  // Animate stars twinkling
  useFrame((state) => {
    if (starsRef.current) {
      (starsRef.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.getElapsedTime()

      // Subtle rotation of the entire starfield
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01
      starsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.005) * 0.01
    }
  })

  return <points ref={starsRef} geometry={starGeo} material={starMaterial} />
}
