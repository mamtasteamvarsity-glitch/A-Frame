import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import AIRobot from './AIRobot'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Sparkles, Code2, Zap } from 'lucide-react'

export const Hero = () => {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // Parallax effect on mouse move
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      
      gsap.to(containerRef.current, {
        rotationY: x * 0.1,
        rotationX: -y * 0.1,
        duration: 0.5,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Text animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      )
    }

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-bg-dark via-bg-dark-2 to-bg-dark-3">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-100, -1000],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Grid background effect */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 240, 255, 0.05) 25%, rgba(0, 240, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 240, 255, 0.05) 75%, rgba(0, 240, 255, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 240, 255, 0.05) 25%, rgba(0, 240, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 240, 255, 0.05) 75%, rgba(0, 240, 255, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-between h-screen px-6 md:px-12 lg:px-20">
        {/* Left content */}
        <motion.div
          ref={textRef}
          className="w-full lg:w-1/2 space-y-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-7xl font-orbitron font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="gradient-text">AI-Powered</span>
              <br />
              <span className="text-white">Creative Dev</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-400 max-w-md leading-relaxed font-rajdhani"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Crafting immersive digital experiences with cutting-edge 3D animations, AI integration, and futuristic design patterns.
            </motion.p>
          </div>

          {/* Feature pills */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { icon: Sparkles, label: '3D & VFX' },
              { icon: Code2, label: 'Full Stack' },
              { icon: Zap, label: 'AI/ML' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass px-4 py-2 flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)' }}
              >
                <item.icon className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm font-rajdhani">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button className="button-glow">
              Explore Work
            </button>
            <button className="button-glow-pink">
              Get in Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Right 3D content */}
        <motion.div
          ref={containerRef}
          className="hidden lg:block w-1/2 h-full perspective"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 4], fov: 75 }}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <AIRobot />
          </Canvas>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-neon-cyan rounded-3xl flex justify-center">
          <motion.div
            className="w-1 h-2 bg-neon-cyan rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
