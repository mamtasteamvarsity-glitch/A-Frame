import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTFLoader, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export const AIRobot = () => {
  const groupRef = useRef()
  const meshRef = useRef()
  const particlesRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    // Create a group for the robot
    if (!groupRef.current) return

    // Main robot body - using geometries instead of GLB
    const bodyGeometry = new THREE.IcosahedronGeometry(1, 5)
    
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.7,
      roughness: 0.1,
      wireframe: false,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    })

    // Create multiple layers for the robot effect
    const layers = []
    
    // Outer shell
    const outerGeo = new THREE.IcosahedronGeometry(1, 4)
    const outerMat = new THREE.MeshPhongMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.2,
      wireframe: false,
      transparent: true,
      opacity: 0.3,
    })
    const outerMesh = new THREE.Mesh(outerGeo, outerMat)
    layers.push(outerMesh)

    // Core mesh
    const coreMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    layers.push(coreMesh)

    // Inner glow sphere
    const glowGeo = new THREE.IcosahedronGeometry(0.6, 3)
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0x7c7cff,
      emissive: 0x7c7cff,
      emissiveIntensity: 0.6,
    })
    const glowMesh = new THREE.Mesh(glowGeo, glowMat)
    layers.push(glowMesh)

    // Add layers to group
    layers.forEach(mesh => {
      if (groupRef.current) {
        groupRef.current.add(mesh)
      }
    })

    // Add lights to enhance the effect
    const pointLight = new THREE.PointLight(0x00f0ff, 2, 10)
    pointLight.position.set(2, 2, 2)
    if (groupRef.current) {
      groupRef.current.add(pointLight)
    }

    // Create particles around the robot
    const particleCount = 200
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8
      particlePositions[i + 1] = (Math.random() - 0.5) * 8
      particlePositions[i + 2] = (Math.random() - 0.5) * 8
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    })
    
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    if (groupRef.current) {
      groupRef.current.add(particles)
      particlesRef.current = particles
    }

    return () => {
      outerGeo.dispose()
      outerMat.dispose()
      bodyGeometry.dispose()
      bodyMaterial.dispose()
      glowGeo.dispose()
      glowMat.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    // Smooth rotation
    groupRef.current.rotation.x += 0.001
    groupRef.current.rotation.y += 0.002
    groupRef.current.rotation.z += 0.0005

    // Floating motion
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5

    // Particle animation
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.02
        positions[i + 1] += (Math.random() - 0.5) * 0.02
        positions[i + 2] += (Math.random() - 0.5) * 0.02

        // Keep particles in bounds
        if (Math.abs(positions[i]) > 4) positions[i] *= -1
        if (Math.abs(positions[i + 1]) > 4) positions[i + 1] *= -1
        if (Math.abs(positions[i + 2]) > 4) positions[i + 2] *= -1
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.rotation.x += 0.0002
      particlesRef.current.rotation.y += 0.0003
    }
  })

  // Update camera to follow robot
  useEffect(() => {
    camera.position.z = 4
    camera.lookAt(0, 0, 0)
  }, [camera])

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Robot meshes are added in useEffect */}
    </group>
  )
}

export default AIRobot
