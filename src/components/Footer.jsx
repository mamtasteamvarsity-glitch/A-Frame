import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-bg-dark border-t border-neon-cyan/20 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-cyan to-soft-pink rounded-lg flex items-center justify-center">
                <span className="text-white font-orbitron font-bold text-lg">M</span>
              </div>
              <span className="text-white font-orbitron font-bold">MAMTA DEV</span>
            </div>
            <p className="text-gray-400 text-sm">
              Creating immersive digital experiences with cutting-edge technology and creative vision.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-orbitron font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'Projects', 'Skills', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-neon-cyan transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-orbitron font-bold mb-4">Follow</h3>
            <div className="flex gap-4">
              {[
                { icon: Github, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Mail, href: 'mailto:hello@example.com' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-neon-cyan transition-all"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-neon-cyan" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent mb-8" />

        {/* Copyright */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between text-center md:text-left text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>
            © {currentYear} Mamta Dev. Made with{' '}
            <Heart className="w-4 h-4 inline text-soft-pink mx-1" />
            and cutting-edge tech.
          </p>
          <p className="mt-4 md:mt-0">
            Designed & Built with React • Three.js • GSAP • Framer Motion
          </p>
        </motion.div>
      </div>

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-0 w-60 h-60 bg-gradient-to-bl from-neon-cyan/5 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'sinInOut',
        }}
      />
    </footer>
  )
}

export default Footer
