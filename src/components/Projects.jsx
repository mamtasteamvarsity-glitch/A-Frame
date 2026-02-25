import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'AI Vision Analytics',
    description: 'Real-time computer vision platform with ML-powered insights',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tech: ['Python', 'TensorFlow', 'React', 'Three.js'],
    link: '#',
    github: '#',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: '3D Product Visualizer',
    description: 'Interactive 3D product showcase with real-time customization',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    tech: ['React Three Fiber', 'WebGL', 'Node.js', 'PostgreSQL'],
    link: '#',
    github: '#',
    color: 'from-pink-500 to-red-500',
  },
  {
    id: 3,
    title: 'Neural Network Visualizer',
    description: 'Interactive 3D visualization of deep learning models',
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    tech: ['Three.js', 'D3.js', 'PyTorch', 'FastAPI'],
    link: '#',
    github: '#',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 4,
    title: 'Metaverse Portal',
    description: 'Immersive metaverse experience with blockchain integration',
    image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    tech: ['WebGL', 'Babylon.js', 'Solidity', 'Web3'],
    link: '#',
    github: '#',
    color: 'from-green-400 to-pink-300',
  },
]

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="glass-dark group p-6 h-full flex flex-col cursor-pointer rounded-xl overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Image/Gradient Background */}
        <div
          className="relative w-full h-40 rounded-lg mb-6 overflow-hidden"
          style={{ background: project.image }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="p-3 glass rounded-lg hover:bg-neon-cyan/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5 text-neon-cyan" />
            </motion.button>
            <motion.button
              className="p-3 glass rounded-lg hover:bg-neon-cyan/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 text-neon-cyan" />
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-neon-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 pt-4">
            {project.tech.map((tech, i) => (
              <motion.span
                key={i}
                className="text-xs px-3 py-1 glass rounded-full text-neon-cyan font-mono"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 240, 255, 0.1)' }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? '0 0 30px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.1)'
              : '0 0 0px rgba(0, 240, 255, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export const Projects = () => {
  return (
    <section className="relative min-h-screen w-full py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-bg-dark-3 via-bg-dark-2 to-bg-dark">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(0, 240, 255, 0.3), transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(124, 124, 255, 0.3), transparent 50%)
            `,
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-4">
            <span className="gradient-text">Immersive</span>{' '}
            <span className="text-white">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-neon-cyan to-transparent rounded-full" />
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">
            Explore my portfolio of immersive 3D experiences, AI-powered applications, and cutting-edge digital solutions.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-40 h-40 bg-gradient-to-br from-neon-cyan/20 to-transparent rounded-full blur-3xl"
        animate={{
          y: [0, 50, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'sinInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-10 w-32 h-32 bg-gradient-to-br from-soft-pink/20 to-transparent rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'sinInOut',
        }}
      />
    </section>
  )
}

export default Projects
