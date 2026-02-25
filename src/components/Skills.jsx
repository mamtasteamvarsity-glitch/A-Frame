import { motion } from 'framer-motion'
import {
  Code2,
  Cpu,
  Zap,
  Palette,
  Layers,
  Database,
  Rocket,
  Brain,
  Smartphone,
  Cloud,
  Shield,
  TrendingUp,
} from 'lucide-react'

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: Code2, color: 'from-blue-400 to-cyan-300' },
      { name: '3D/WebGL', icon: Layers, color: 'from-purple-400 to-pink-300' },
      { name: 'Animations', icon: Zap, color: 'from-yellow-400 to-orange-300' },
      { name: 'UI/UX', icon: Palette, color: 'from-pink-400 to-rose-300' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: Rocket, color: 'from-green-400 to-teal-300' },
      { name: 'Python', icon: Brain, color: 'from-yellow-500 to-orange-400' },
      { name: 'Databases', icon: Database, color: 'from-blue-500 to-purple-400' },
      { name: 'API Design', icon: Cloud, color: 'from-cyan-400 to-blue-300' },
    ],
  },
  {
    category: 'AI/ML',
    items: [
      { name: 'Machine Learning', icon: Brain, color: 'from-purple-500 to-pink-400' },
      { name: 'Deep Learning', icon: Cpu, color: 'from-orange-500 to-yellow-400' },
      { name: 'Computer Vision', icon: Zap, color: 'from-red-500 to-pink-400' },
      { name: 'NLP', icon: TrendingUp, color: 'from-green-500 to-cyan-400' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git/DevOps', icon: Shield, color: 'from-cyan-500 to-blue-400' },
      { name: 'Three.js', icon: Layers, color: 'from-purple-400 to-indigo-300' },
      { name: 'GSAP', icon: Zap, color: 'from-yellow-500 to-orange-400' },
      { name: 'Docker', icon: Cloud, color: 'from-blue-600 to-cyan-500' },
    ],
  },
]

const SkillCard = ({ skill, index, categoryIndex }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: categoryIndex * 0.1 + index * 0.05,
      }}
      whileHover={{ scale: 1.1, y: -10 }}
      className="group"
    >
      <div className="glass-dark p-6 rounded-xl h-full flex flex-col items-center justify-center text-center hover:shadow-glow-md transition-all duration-300">
        <motion.div
          className={`p-4 rounded-xl bg-gradient-to-br ${skill.color} mb-4`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <skill.icon className="w-6 h-6 text-white" />
        </motion.div>
        
        <h4 className="font-orbitron font-semibold text-white group-hover:text-neon-cyan transition-colors">
          {skill.name}
        </h4>
        
        {/* Animated underline */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-neon-cyan to-transparent rounded-full mt-3"
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
          style={{ width: '60%' }}
        />

        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${skill.color} -z-10 blur-xl opacity-0`}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export const Skills = () => {
  return (
    <section className="relative min-h-screen w-full py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-bg-dark via-bg-dark-2 to-bg-dark-3">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-neon-cyan/10 to-transparent rounded-full blur-3xl"
        animate={{
          y: [0, 100, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'sinInOut',
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-tr from-soft-pink/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'sinInOut',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-4">
            <span className="gradient-text">Expert</span>{' '}
            <span className="text-white">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-neon-cyan to-soft-pink rounded-full mx-auto" />
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Proficient in modern technologies spanning full-stack development, 3D graphics, AI/ML, and interactive experiences.
          </p>
        </motion.div>

        {/* Skills by category */}
        <div className="space-y-16">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <motion.h3
                className="text-2xl md:text-3xl font-orbitron font-bold mb-8 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <span className="text-neon-cyan">{category.category}</span>
              </motion.h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {category.items.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                    categoryIndex={categoryIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {[
            { label: 'Projects', value: '50+' },
            { label: 'Technologies', value: '25+' },
            { label: 'Clients', value: '30+' },
            { label: 'Experience', value: '8Y+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass-dark p-6 text-center rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-orbitron font-bold text-neon-cyan mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 font-rajdhani">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
