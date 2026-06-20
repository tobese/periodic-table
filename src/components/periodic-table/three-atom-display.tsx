'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const RADII = [1.3, 2.5, 3.7, 4.9, 6.1, 7.3, 8.5]
const SHELL_OPACITY = 0.12
const ELECTRON_RADIUS = 0.22
const NUCLEUS_RADIUS = 0.55
const ROTATION_SPEEDS = [0.8, 0.5, 0.35, 0.25, 0.18, 0.12, 0.08]
const SHELL_TILTS = [0, 0.2, 0.5, 0.8, 0.3, 0.6, 0.4]

interface AtomProps {
  shells: number[]
  color: string
}

function Atom({ shells, color }: AtomProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const shellRefs = useRef<(THREE.Group | null)[]>([])

  const colorObj = useMemo(() => new THREE.Color(color), [color])
  const nucleusColor = useMemo(() => colorObj.clone().multiplyScalar(1.5), [colorObj])
  nucleusColor.r = Math.min(nucleusColor.r, 1)
  nucleusColor.g = Math.min(nucleusColor.g, 1)
  nucleusColor.b = Math.min(nucleusColor.b, 1)

  const electronPositions = useMemo(() => {
    return shells.map((count) => {
      const positions: { x: number; y: number; z: number }[] = []
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        positions.push({
          x: Math.cos(angle),
          y: (Math.random() - 0.5) * 0.3,
          z: Math.sin(angle),
        })
      }
      return positions
    })
  }, [shells])

  useFrame(() => {
    shellRefs.current.forEach((ref, i) => {
      if (!ref) return
      ref.rotation.y += ROTATION_SPEEDS[i] * 0.01
      ref.rotation.x = SHELL_TILTS[i]
    })
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[NUCLEUS_RADIUS, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>

      <pointLight intensity={0.8} distance={6} color={color} />

      {shells.map((count, idx) => {
        const radius = RADII[idx]
        if (!radius) return null

        return (
          <group key={idx} ref={(el) => { shellRefs.current[idx] = el }}>
            <mesh>
              <sphereGeometry args={[radius, 32, 32]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={SHELL_OPACITY}
                wireframe
                depthWrite={false}
              />
            </mesh>

            {electronPositions[idx].map((pos, ei) => (
              <mesh key={ei} position={[pos.x * radius, pos.y, pos.z * radius]}>
                <sphereGeometry args={[ELECTRON_RADIUS, 12, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.1} />
              </mesh>
            ))}
          </group>
        )
      })}
    </group>
  )
}

export default function ThreeAtomDisplay({ shells, color }: AtomProps) {
  return (
    <div className="w-[260px] h-[260px] mx-auto">
      <Canvas camera={{ position: [0, 1.5, 10], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -3, -5]} intensity={0.3} />
        <Atom shells={shells} color={color} />
        <OrbitControls enablePan={false} minDistance={4} maxDistance={18} enableDamping dampingFactor={0.1} />
      </Canvas>
    </div>
  )
}
