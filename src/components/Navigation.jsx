import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 glass-dark backdrop-blur-xl border-b border-neon-cyan/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-soft-pink rounded-lg flex items-center justify-center">
            <span className="text-white font-orbitron font-bold">M</span>
          </div>
          <span className="text-white font-orbitron font-bold hidden sm:inline">MAMTA</span>
        </motion.div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-neon-cyan transition-colors font-rajdhani font-medium relative group"
              whileHover={{ y: -2 }}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-soft-pink group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          className="hidden md:block button-glow text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Collaborate
        </motion.button>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-neon-cyan" />
          ) : (
            <Menu className="w-6 h-6 text-neon-cyan" />
          )}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-black/50"
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="block text-gray-300 hover:text-neon-cyan transition-colors font-rajdhani"
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 10 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            className="button-glow w-full text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Let's Collaborate
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navigation
