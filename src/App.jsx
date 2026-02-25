import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Add scroll-based parallax to background
  useEffect(() => {
    const updateParallax = () => {
      const parallaxElements = document.querySelectorAll('[data-parallax]')
      parallaxElements.forEach((el) => {
        const speed = el.getAttribute('data-parallax')
        el.style.transform = `translateY(${scrollPosition * speed}px)`
      })
    }

    updateParallax()
  }, [scrollPosition])

  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-bg-dark via-bg-dark-2 to-bg-dark" />
      
      {/* Gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-neon-cyan/5 to-transparent rounded-full blur-3xl"
          data-parallax="0.5"
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-tr from-soft-pink/5 to-transparent rounded-full blur-3xl"
          data-parallax="-0.3"
        />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Projects />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <Skills />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating particles background effect */}
      <Particles />
    </div>
  )
}

const Particles = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '0'
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    const particles = []
    let animationId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(6, 9, 15, 0)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw
        ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      document.body.removeChild(canvas)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return null
}

export default App
