# 🚀 Getting Started Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages:
- React and React DOM
- Three.js and React Three Fiber
- Framer Motion for animations
- GSAP for advanced animations
- Tailwind CSS for styling
- Lucide React for icons

### 2. Start Development Server
```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`

### 3. Start Coding
Edit any files in the `src/` directory and HMR (Hot Module Replacement) will automatically refresh your browser.

---

## 📂 File Guide

### Entry Point
- **`src/main.jsx`** - React app initialization
- **`src/App.jsx`** - Main component that ties everything together
- **`index-vite.html`** - HTML template for Vite

### Components
All components are in `src/components/`:

| File | Purpose |
|------|---------|
| **Navigation.jsx** | Fixed header with menu |
| **Hero.jsx** | Hero section with 3D robot |
| **Projects.jsx** | Project showcase grid |
| **Skills.jsx** | Skills & expertise section |
| **Contact.jsx** | Contact form & info |
| **Footer.jsx** | Footer with links |
| **AIRobot.jsx** | 3D robot component (React Three Fiber) |

### Styling
- **`src/index.css`** - Global styles, animations, and effects
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`postcss.config.js`** - PostCSS plugins configuration

### Configuration
- **`vite.config.js`** - Build tool configuration
- **`package.json`** - Project dependencies and scripts

---

## 🎨 Key Features to Understand

### 1. The 3D Robot (Hero Section)

Located in `src/components/AIRobot.jsx`:
- Uses React Three Fiber to render Three.js in React
- Creates a glass-like icosahedron with emissive materials
- Includes a particle system orbiting the robot
- Smooth animations using `useFrame` hook

To customize:
```jsx
// Change robot color
const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0xFF7EB6, // Change this hex color
  emissive: 0xFF7EB6,
  // ... other properties
})
```

### 2. Animations

**Framer Motion** (Component-level):
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  Content
</motion.div>
```

**GSAP** (Complex sequences):
```jsx
gsap.to(element, {
  duration: 1,
  y: 100,
  opacity: 0.5,
})
```

### 3. Glassmorphism Effect

Applied via Tailwind classes in HTML:
```jsx
<div className="glass"> {/* Blurred background with border */}
<div className="glass-dark"> {/* Darker glassmorphism variant */}
```

Or in CSS:
```css
.glass {
  backdrop-filter: blur(10px);
  background: rgba(11, 18, 32, 0.4);
  border: 1px solid rgba(0, 240, 255, 0.15);
}
```

### 4. Neon Glow Effects

Apply glow to buttons:
```jsx
<button className="button-glow">Click me</button>
<button className="button-glow-pink">Click me</button>
```

Or create custom glows:
```css
box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
```

---

## 🔧 Common Customizations

### Change Name/Title
Edit in `Hero.jsx`:
```jsx
<h1>Your Name Here</h1>
<span className="gradient-text">Your Tagline</span>
```

### Update Projects
Edit `Projects.jsx` - modify the `projects` array:
```js
const projects = [
  {
    id: 1,
    title: 'My Project',
    description: 'What it does',
    image: 'gradient-color-code',
    tech: ['React', 'TypeScript'],
    link: 'https://project-url.com',
    github: 'https://github.com/username/project',
    color: 'from-blue-500 to-purple-500',
  },
]
```

### Update Skills
Edit `Skills.jsx` - modify the `skills` array:
```js
const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: Code2, color: 'from-blue-400 to-cyan-300' },
      // Add more skills...
    ],
  },
]
```

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  'neon-cyan': '#your-color',
  'soft-pink': '#your-color',
  'lavender': '#your-color',
}
```

---

## 🌐 Deployment

### Deploy to Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to Netlify

### Deploy to GitHub Pages
1. Update `vite.config.js`:
```js
export default defineConfig({
  base: '/your-repo-name/',
})
```
2. Build and push to GitHub

---

## 🐛 Troubleshooting

**Q: 3D robot not showing?**
A: Check browser WebGL support. Test in Chrome/Firefox. Check console for errors.

**Q: Animations not smooth?**
A: Reduce particle count in `AIRobot.jsx` or disable some animations on mobile.

**Q: Styles not applying?**
A: Clear `.next` or `dist` folder and rebuild: `npm run build`

**Q: Port 3000 already in use?**
A: Change in `vite.config.js`:
```js
server: {
  port: 3001 // Change to any available port
}
```

---

## 📖 Official Documentation

- **React**: https://react.dev/
- **Three.js**: https://threejs.org/docs/
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber/
- **Framer Motion**: https://www.framer.com/motion/
- **GSAP**: https://gsap.com/
- **Tailwind CSS**: https://tailwindcss.com/docs/

---

## Next Steps

1. ✅ Install dependencies (`npm install`)
2. ✅ Start dev server (`npm run dev`)
3. 📝 Customize content with your information
4. 🎨 Adjust colors and fonts to match your brand
5. 📸 Add your own project images and descriptions
6. 🚀 Deploy to the web!

---

## 💡 Tips

- Use `npm run build` to create an optimized production build
- Check console errors (F12) if something breaks
- Test on mobile devices (DevTools > Toggle device toolbar)
- Use browser DevTools to inspect and debug styles
- Update social links in Contact section and Footer

Good luck! Happy coding! 🚀
