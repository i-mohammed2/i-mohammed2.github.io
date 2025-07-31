"use client"
// @ts-nocheck

import { useRef, useMemo, useState } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"

export function GlobePlanet({ isActive, scrollProgress }) {
  const globeRef = useRef()
  const atmosphereRef = useRef()
  const arcsGroupRef = useRef()
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

  const earthTexture = useLoader(
    TextureLoader,
    "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg",
  )

  const handleClick = () => {
    const randomLink = randomLinks[Math.floor(Math.random() * randomLinks.length)]
    window.open(randomLink, "_blank")
  }

  // Globe material with Earth texture or fallback
  const globeMaterial = useMemo(() => {
    if (earthTexture) {
      return new THREE.MeshPhongMaterial({
        map: earthTexture,
        transparent: false,
        opacity: 1.0,
      })
    } else {
      // Fallback: Create a more Earth-like appearance without texture
      return new THREE.MeshPhongMaterial({
        color: "#1a472a", // Dark green for landmasses
        transparent: false,
        opacity: 1.0,
        shininess: 10,
      })
    }
  }, [earthTexture])

  // Ocean overlay for fallback
  const oceanMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: "#1e40af", // Ocean blue
        transparent: true,
        opacity: 0.7,
        shininess: 100,
      }),
    [],
  )

  // Atmosphere glow
  const atmosphereMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#87ceeb",
        transparent: true,
        opacity: isHovered ? 0.2 : 0.1,
        side: THREE.BackSide,
      }),
    [isHovered],
  )

  // Create realistic network arcs
  const arcs = useMemo(() => {
    const arcObjects = []
    const colors = [0x22c55e, 0x3b82f6, 0xf97316, 0x06b6d4, 0x10b981]

    for (let i = 0; i < 20; i++) {
      const startPhi = Math.random() * Math.PI * 2
      const startTheta = Math.random() * Math.PI
      const endPhi = Math.random() * Math.PI * 2
      const endTheta = Math.random() * Math.PI

      const radius = 1.52

      const startPoint = new THREE.Vector3(
        radius * Math.sin(startTheta) * Math.cos(startPhi),
        radius * Math.cos(startTheta),
        radius * Math.sin(startTheta) * Math.sin(startPhi),
      )

      const endPoint = new THREE.Vector3(
        radius * Math.sin(endTheta) * Math.cos(endPhi),
        radius * Math.cos(endTheta),
        radius * Math.sin(endTheta) * Math.sin(endPhi),
      )

      const distance = startPoint.distanceTo(endPoint)
      const arcHeight = distance * 0.5 + 0.4

      const midPoint = new THREE.Vector3()
        .addVectors(startPoint, endPoint)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(radius + arcHeight)

      const curve = new THREE.QuadraticBezierCurve3(startPoint, midPoint, endPoint)
      const points = curve.getPoints(30)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)

      const material = new THREE.LineDashedMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.7,
        dashSize: 0.15,
        gapSize: 0.08,
        linewidth: 2,
      })

      const line = new THREE.Line(geometry, material)
      line.computeLineDistances()

      arcObjects.push(line)
    }

    return arcObjects
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (globeRef.current) {
      const pulse = 1 + Math.sin(time * 1.2) * 0.02
      const hoverScale = isHovered ? 1.05 : 1
      const scale = pulse * (isActive ? 1.8 : 1.5) * hoverScale
      globeRef.current.scale.setScalar(scale)
      globeRef.current.rotation.y += 0.003

      if (atmosphereRef.current) {
        atmosphereRef.current.scale.setScalar(scale * 1.05)
      }
    }

    if (arcsGroupRef.current) {
      const globeScale = globeRef.current ? globeRef.current.scale.x : 1.5
      arcsGroupRef.current.scale.setScalar(globeScale)

      arcsGroupRef.current.rotation.y = time * 0.05
      arcsGroupRef.current.rotation.x = Math.sin(time * 0.2) * 0.05

      arcsGroupRef.current.children.forEach((arc, index) => {
        if (arc.material) {
          const phase = time * 2 + index * 0.5
          arc.material.opacity = 0.4 + Math.sin(phase) * 0.3
        }
      })
    }
  })

  return (
    <group>
      {/* Earth globe */}
      <mesh
        ref={globeRef}
        material={globeMaterial}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>

      {/* Ocean overlay if no texture */}
      {!earthTexture && (
        <mesh
          material={oceanMaterial}
          scale={globeRef.current?.scale || [1.5, 1.5, 1.5]}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <sphereGeometry args={[1.001, 32, 32]} />
        </mesh>
      )}

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} material={atmosphereMaterial}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>

      {/* Network arcs */}
      <group ref={arcsGroupRef}>
        {arcs.map((arc, index) => (
          <primitive key={index} object={arc} />
        ))}
      </group>
    </group>
  )
}
