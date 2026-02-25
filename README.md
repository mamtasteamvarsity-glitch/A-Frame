# 🚀 Mamta - AI-Powered Creative Dev Portfolio

A modern, futuristic creative portfolio website with cutting-edge 3D animations, AI aesthetics, and immersive user experience.

## ✨ Features

### 🎨 Design System
- **Dark Theme** with glassmorphism UI elements
- **Soft Neon Glow** effects on buttons and interactive elements
- **Gradient Text** with cyan, pink, and purple accents
- **Floating Elements** with smooth parallax effects
- **Feminine-Tech** aesthetic with soft colors and elegant animations

### 🎬 Interactive Elements
- **3D AI Robot** in hero section using React Three Fiber
  - Glass material effect with transparency
  - Smooth floating animations
  - Particle system surrounding the robot
  - Dynamic lighting and emissive materials
- **Scroll Animations** with Framer Motion
- **Particle Effects** throughout the page
- **Parallax Depth** movement on mouse movement
- **Smooth Camera Motion** in 3D scenes

### 📱 Components

#### Navigation
- Fixed header navigation with glassmorphism
- Mobile-responsive menu
- Smooth scroll links
- CTA button with glow effect

#### Hero Section
- Fullscreen 3D canvas with AI robot
- Animated text with staggered entrance
- Feature pills with icons
- Call-to-action buttons
- Scroll indicator animation
- Grid background effect
- Floating particles

#### Projects Section
- 4 showcase projects with hover tilt effects
- Project cards with glassmorphism
- Hover preview with external/GitHub links
- Tech stack tags
- Animated borders and glows
- Grid layout with smooth scrolling animation

#### Skills Section
- 4 skill categories (Frontend, Backend, AI/ML, Tools)
- 16 individual skills with gradient icons
- Rotating icon animations on hover
- Stat counters
- Background gradient orbs

#### Contact Section
- Contact form with neon styling
- Contact information cards
- Social media links
- Call-to-action elements

#### Footer
- Quick links
- Social media links
- Copyright information
- Floating gradient orbs

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animation library

### 3D & Graphics
- **Three.js** - WebGL 3D library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### Icons & UI
- **Lucide React** - Beautiful icon library

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone or navigate to the project:**
   ```bash
   cd "c:\Projects\web\A Frame"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
A Frame/
├── src/
│   ├── components/
│   │   ├── AIRobot.jsx          # 3D Robot component
│   │   ├── Hero.jsx             # Hero section
│   │   ├── Projects.jsx         # Projects showcase
│   │   ├── Skills.jsx           # Skills section
│   │   ├── Contact.jsx          # Contact form
│   │   ├── Navigation.jsx       # Top navigation
│   │   ├── Footer.jsx           # Footer
│   │   └── index.js             # Component exports
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies & scripts
└── index-vite.html              # HTML template
```

## 🎨 Customization Guide

### Colors
Edit the CSS variables in `src/index.css` or Tailwind config in `tailwind.config.js`:

```js
// tailwind.config.js
colors: {
  'neon-cyan': '#00F0FF',
  'soft-pink': '#FF7EB6',
  'lavender': '#C084FC',
  // Add your custom colors...
}
```

### Fonts
Change fonts in `tailwind.config.js`:

```js
fontFamily: {
  'orbitron': ['Orbitron', 'sans-serif'],
  'rajdhani': ['Rajdhani', 'sans-serif'],
  'body': ['Inter', 'sans-serif'],
  'mono': ['JetBrains Mono', 'monospace'],
}
```

### 3D Robot
Modify the `AIRobot.jsx` component to:
- Change colors and materials
- Adjust rotation speeds
- Modify particle effects
- Add additional 3D geometries

### Projects Data
Edit the `projects` array in `Projects.jsx` to add your own projects:

```js
const projects = [
  {
    id: 1,
    title: 'Your Project',
    description: 'Project description',
    image: 'gradient-link',
    tech: ['Tech1', 'Tech2'],
    link: '#',
    github: '#',
    color: 'from-color-1 to-color-2',
  },
  // Add more projects...
]
```

### Skills Data
Edit the `skills` array in `Skills.jsx`:

```js
const skills = [
  {
    category: 'Your Category',
    items: [
      { name: 'Skill Name', icon: IconComponent, color: 'from-color-1 to-color-2' },
      // Add more skills...
    ],
  },
  // Add more categories...
]
```

## 🎯 Animation Features

### GSAP Animations
- Smooth scroll parallax
- 3D tilt effects on project cards
- Mouse-tracked rotations

### Framer Motion
- Staggered text animations
- Scroll-triggered element reveals
- Hover scale and glow effects
- Page transition animations

### Three.js Effects
- Real-time 3D robot rendering
- Particle system animation
- Dynamic lighting
- Smooth camera control

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### GitHub Pages
Configure your `vite.config.js`:
```js
export default defineConfig({
  base: '/repository-name/',
})
```

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🔧 Performance Optimizations

- Lazy loading of components
- Optimized 3D rendering
- CSS-in-JS optimizations
- Image and asset optimization
- Code splitting with Vite

## 🎓 Learning Resources

### Three.js
- [Official Documentation](https://threejs.org/docs/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)

### Framer Motion
- [Documentation](https://www.framer.com/motion/)

### GSAP
- [Official Site](https://gsap.com/)

### Tailwind CSS
- [Documentation](https://tailwindcss.com/docs/)

## 🐛 Troubleshooting

### 3D Robot Not Showing
- Check browser WebGL support
- Ensure Three.js is properly imported
- Check canvas size in Hero component

### Animations Not Working
- Verify Framer Motion and GSAP are installed
- Check for CSS conflicts
- Ensure browser supports CSS perspective

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist`

## 📝 License

This portfolio template is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📧 Contact

For questions or support, reach out at:
- Email: hello@mamtadev.com
- LinkedIn: [@mamtaportfolio](https://linkedin.com)
- GitHub: [@sumitglitch](https://github.com/sumitglitch)

---

**Built with ❤️ using React, Three.js, and modern web technologies**
