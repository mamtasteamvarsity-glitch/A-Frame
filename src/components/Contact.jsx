import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Twitter, ExternalLink } from 'lucide-react'
import { useRef } from 'react'

export const Contact = () => {
  const formRef = useRef(null)

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
  ]

  return (
    <section className="relative min-h-screen w-full py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-bg-dark-3 via-bg-dark-2 to-bg-dark">
      {/* Background effects */}
      <motion.div
        className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-b from-neon-cyan/5 to-transparent rounded-full blur-3xl"
        animate={{
          y: [-100, 100, -100],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'sinInOut',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-4">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something extraordinary together.
          </p>
        </motion.div>

        {/* Contact content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-black/30 border border-neon-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:shadow-glow-md transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-black/30 border border-neon-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:shadow-glow-md transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                  Project Type
                </label>
                <select className="w-full px-4 py-3 bg-black/30 border border-neon-cyan/30 rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:shadow-glow-md transition-all">
                  <option>3D Web Experience</option>
                  <option>AI Integration</option>
                  <option>Full Stack App</option>
                  <option>UI/UX Design</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 bg-black/30 border border-neon-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:shadow-glow-md transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                className="button-glow w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Info cards */}
            {[
              {
                icon: Mail,
                title: 'Email',
                content: 'hello@mamtadev.com',
                color: 'from-cyan-400 to-blue-400',
              },
              {
                icon: Linkedin,
                title: 'LinkedIn',
                content: '@mamtaportfolio',
                color: 'from-pink-400 to-purple-400',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass-dark p-6 rounded-xl group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color}`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 group-hover:text-neon-cyan transition-colors">
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-orbitron font-bold text-white mb-6">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    className="group glass p-3 rounded-lg hover:border-neon-cyan transition-all"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
