"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"

export function RealisticEarth({ isActive, scrollProgress }) {
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

  const earthTexture = useLoader(TextureLoader, "/placeholder.svg?height=512&width=1024")

  const handleClick = () => {
    const randomLink = randomLinks[Math.floor(Math.random() * randomLinks.length)]
    window.open(randomLink, "_blank")
  }

  // Create realistic Earth-like geometry with proper continent shapes
  const earthGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1, 128, 128)
    const colors = []
    const positions = geometry.attributes.position

    for (let i = 0; i < positions.count; i++) {
      const vertex = new THREE.Vector3()
      vertex.fromBufferAttribute(positions, i)

      // Convert to spherical coordinates
      const lat = Math.asin(vertex.y) * (180 / Math.PI)
      const lon = Math.atan2(vertex.z, vertex.x) * (180 / Math.PI)

      // Create more realistic continent patterns
      let isLand = false

      // North America
      if (lat > 25 && lat < 70 && lon > -160 && lon < -50) {
        isLand = Math.random() > 0.3
      }
      // South America
      else if (lat > -55 && lat < 15 && lon > -80 && lon < -35) {
        isLand = Math.random() > 0.4
      }
      // Europe/Asia
      else if (lat > 35 && lat < 75 && ((lon > -10 && lon < 60) || (lon > 60 && lon < 180))) {
        isLand = Math.random() > 0.35
      }
      // Africa
      else if (lat > -35 && lat < 35 && lon > -20 && lon < 50) {
        isLand = Math.random() > 0.4
      }
      // Australia
      else if (lat > -45 && lat < -10 && lon > 110 && lon < 155) {
        isLand = Math.random() > 0.5
      }
      // Antarctica
      else if (lat < -60) {
        isLand = Math.random() > 0.2
      }

      if (isLand) {
        // Land colors - various greens and browns
        const landType = Math.random()
        if (landType > 0.7) {
          colors.push(0.4, 0.6, 0.2) // Forest green
        } else if (landType > 0.4) {
          colors.push(0.6, 0.5, 0.3) // Desert brown
        } else {
          colors.push(0.3, 0.5, 0.2) // Grassland green
        }
      } else {
        // Ocean - various blues
        const depth = Math.random()
        if (depth > 0.8) {
          colors.push(0.0, 0.1, 0.4) // Deep ocean
        } else if (depth > 0.5) {
          colors.push(0.1, 0.3, 0.6) // Medium ocean
        } else {
          colors.push(0.2, 0.4, 0.7) // Shallow ocean
        }
      }
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
    return geometry
  }, [])

  // Material with or without texture
  const earthMaterial = useMemo(() => {
    if (earthTexture) {
      return new THREE.MeshPhongMaterial({
        map: earthTexture,
        shininess: 10,
      })
    } else {
      return new THREE.MeshPhongMaterial({
        vertexColors: true,
        shininess: 15,
      })
    }
  }, [earthTexture])

  // Atmosphere glow
  const atmosphereMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#87ceeb",
        transparent: true,
        opacity: isHovered ? 0.25 : 0.15,
        side: THREE.BackSide,
      }),
    [isHovered],
  )

  // Create network arcs
  const arcs = useMemo(() => {
    const arcObjects = []
    const colors = [0x22c55e, 0x3b82f6, 0xf97316, 0x06b6d4, 0x10b981]

    for (let i = 0; i < 15; i++) {
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
      const arcHeight = distance * 0.4 + 0.3

      const midPoint = new THREE.Vector3()
        .addVectors(startPoint, endPoint)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(radius + arcHeight)

      const curve = new THREE.QuadraticBezierCurve3(startPoint, midPoint, endPoint)
      const points = curve.getPoints(25)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)

      const material = new THREE.LineDashedMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.6,
        dashSize: 0.1,
        gapSize: 0.05,
        linewidth: 1.5,
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
      const pulse = 1 + Math.sin(time * 1.2) * 0.015
      const hoverScale = isHovered ? 1.03 : 1
      const scale = pulse * (isActive ? 1.8 : 1.5) * hoverScale
      globeRef.current.scale.setScalar(scale)
      globeRef.current.rotation.y += 0.002

      if (atmosphereRef.current) {
        atmosphereRef.current.scale.setScalar(scale * 1.03)
      }
    }

    if (arcsGroupRef.current) {
      const globeScale = globeRef.current ? globeRef.current.scale.x : 1.5
      arcsGroupRef.current.scale.setScalar(globeScale)

      arcsGroupRef.current.rotation.y = time * 0.03
      arcsGroupRef.current.rotation.x = Math.sin(time * 0.15) * 0.03

      arcsGroupRef.current.children.forEach((arc, index) => {
        if (arc.material) {
          const phase = time * 1.5 + index * 0.4
          arc.material.opacity = 0.3 + Math.sin(phase) * 0.3
        }
      })
    }
  })

  return (
    <group>
      {/* Earth globe */}
      <mesh
        ref={globeRef}
        geometry={earthGeometry}
        material={earthMaterial}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={handleClick}
      />

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
