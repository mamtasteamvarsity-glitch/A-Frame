/* ============================================
   Taj Mahal AR/VR Experience — Script
   Interactivity, rotation, day/night, hotspots
   ============================================ */

;(function () {
  'use strict';

  /* Register A-Frame auto-rotate component */
  if (typeof AFRAME !== 'undefined') {
    AFRAME.registerComponent('auto-rotate', {
      schema: { speed: { type: 'number', default: 0.15 } },
      init: function () {
        this.paused = false;
      },
      pauseRotation: function () { this.paused = true; },
      resumeRotation: function () { this.paused = false; },
      tick: function () { /* rotation handled in script inertia loop */ }
    });
  }

  /* ===========================
     CONSTANTS & DATA
     =========================== */
  const FRICTION = 0.92;
  const ZOOM_MIN = 2;
  const ZOOM_MAX = 8;
  const ZOOM_STEP = 0.3;

  /* Historical data for hotspots */
  const HOTSPOT_DATA = {
    dome: {
      badge: 'Architecture',
      title: 'The Magnificent Dome',
      meta: [
        { label: 'Height', value: '73 metres' },
        { label: 'Style', value: 'Onion Dome' },
        { label: 'Material', value: 'White Marble' },
      ],
      desc: 'The iconic onion-shaped dome rises to a height of about 35 metres atop the drum, crowned by a gilded bronze finial with a crescent moon. It is surrounded by four smaller domed chattris (kiosks) that echo its shape, creating a breathtaking silhouette.',
      facts: [
        { icon: '📐', text: 'The dome is nearly 18 metres in diameter' },
        { icon: '🪷', text: 'Decorated with lotus motifs at the base' },
        { icon: '☪️', text: 'The finial was originally gold, now bronze' },
      ],
    },
    entrance: {
      badge: 'Heritage',
      title: 'The Grand Entrance',
      meta: [
        { label: 'Type', value: 'Pishtaq Arch' },
        { label: 'Decoration', value: 'Pietra Dura' },
        { label: 'Script', value: 'Quranic Verses' },
      ],
      desc: 'The main entrance features a grand pishtaq (arched portal) flanked by recessed arches on two levels. The facade is adorned with intricate calligraphy, floral arabesques, and pietra dura inlay — semi-precious stones set into white marble.',
      facts: [
        { icon: '✍️', text: 'Calligraphy by Abd ul-Haq (Amanat Khan)' },
        { icon: '💎', text: '28 types of stones used in the inlay work' },
        { icon: '🚪', text: 'The false door symbolizes the gateway to paradise' },
      ],
    },
    minaret: {
      badge: 'Engineering',
      title: 'The Four Minarets',
      meta: [
        { label: 'Height', value: '40 metres' },
        { label: 'Count', value: '4 Towers' },
        { label: 'Lean', value: 'Outward Tilt' },
      ],
      desc: 'Four towering minarets stand at the corners of the marble plinth, each over 40 metres tall. They are intentionally built with a slight outward lean so that in an earthquake, they would fall away from the tomb rather than onto it.',
      facts: [
        { icon: '📏', text: 'Each minaret has three balconies' },
        { icon: '⚙️', text: 'The tilt is roughly 2° outward' },
        { icon: '🕌', text: 'Functioning minarets — the muezzin could call prayer' },
      ],
    },
    pool: {
      badge: 'Gardens',
      title: 'The Reflecting Pool',
      meta: [
        { label: 'Garden', value: 'Charbagh' },
        { label: 'Layout', value: 'Paradise Garden' },
        { label: 'Length', value: '300 metres' },
      ],
      desc: 'The Charbagh garden is divided into four quadrants by raised marble pathways and water channels. The central reflecting pool creates a stunning mirror image of the Taj Mahal. The garden symbolises the four flowing rivers of Jannah (paradise).',
      facts: [
        { icon: '🌳', text: 'Originally planted with roses and fruit trees' },
        { icon: '💧', text: 'Water channels represent four rivers of paradise' },
        { icon: '🪞', text: 'The pool perfectly reflects the main dome' },
      ],
    },
  };

  /* Timeline data */
  const TIMELINE_DATA = [
    { year: '1632', label: 'Construction\nBegins', desc: 'Emperor Shah Jahan commissions the Taj Mahal in memory of Mumtaz Mahal.' },
    { year: '1643', label: 'Main Structure\nComplete', desc: 'The mausoleum building is completed after 11 years of work by 20,000 artisans.' },
    { year: '1653', label: 'Entirely\nFinished', desc: 'The surrounding buildings, gardens, and finishing touches are completed.' },
    { year: '1983', label: 'UNESCO\nHeritage Site', desc: 'Designated as a UNESCO World Heritage Site — "jewel of Muslim art in India."' },
  ];

  /* ===========================
     ELEMENTS
     =========================== */
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => (p || document).querySelectorAll(s);

  let scene, camera, model, overlay;
  let header, actionBar, timeline;

  /* State */
  let isDragging = false;
  let prevX = 0, prevY = 0;
  let velocityX = 0, velocityY = 0;
  let rotX = 0, rotY = 0;
  let autoRotate = true;
  let autoResumeTimer = null;
  let currentZoom = 5;
  let pinchStartDist = 0;
  let animId = 0;
  let isNight = false;

  /* ===========================
     INIT
     =========================== */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    scene = $('#main-scene');
    camera = $('#main-camera');
    model = $('#taj-model');
    overlay = $('#interaction-overlay');
    header = $('#header');
    actionBar = $('#action-bar');
    timeline = $('#timeline');

    setupLoadingScreen();
    setupRotation();
    setupZoom();
    setupDayNight();
    setupHotspots();
    setupInfoPanel();
    setupARModal();
    setupTimeline();
    setupFullscreen();
    setupAudio();
    setupAmbientCanvas();
    setupResetView();
    setupKeyboard();

    /* Hide gesture hint after 5s */
    setTimeout(() => {
      const hint = $('.gesture-hint');
      if (hint) hint.classList.add('hidden');
    }, 5000);
  }

  /* ===========================
     RESET VIEW
     =========================== */
  function setupResetView() {
    const btn = $('#reset-view-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      rotX = 0; rotY = 0;
      currentZoom = 5;
      autoRotate = true;
      applyRotation();
      applyZoom();
      showToast('🔄 View Reset');
    });
  }

  /* ===========================
     LOADING SCREEN
     =========================== */
  function setupLoadingScreen() {
    const loadScreen = $('#loading-screen');
    const fill = $('.loader-progress-fill');
    if (!loadScreen) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 4;
      if (progress > 100) progress = 100;
      if (fill) fill.style.width = progress + '%';
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => loadScreen.classList.add('hidden'), 400);
      }
    }, 200);
  }

  /* ===========================
     3D ROTATION (Inertia)
     =========================== */
  function setupRotation() {
    if (!overlay || !model) return;

    /* Pointer Events */
    overlay.addEventListener('pointerdown', onPointerDown, { passive: true });
    overlay.addEventListener('pointermove', onPointerMove, { passive: true });
    overlay.addEventListener('pointerup', onPointerUp, { passive: true });
    overlay.addEventListener('pointercancel', onPointerUp, { passive: true });

    /* Touch fallback */
    overlay.addEventListener('touchstart', onTouchStart, { passive: true });
    overlay.addEventListener('touchmove', onTouchMove, { passive: true });
    overlay.addEventListener('touchend', onPointerUp, { passive: true });

    startInertiaLoop();
  }

  function onPointerDown(e) {
    if (e.pointerType === 'touch' && e.isPrimary === false) return;
    isDragging = true;
    autoRotate = false;
    clearTimeout(autoResumeTimer);
    prevX = e.clientX;
    prevY = e.clientY;
    velocityX = 0;
    velocityY = 0;
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    prevX = e.clientX;
    prevY = e.clientY;
    velocityX = dx * 0.35;
    velocityY = dy * 0.2;
    rotY += velocityX;
    rotX += velocityY;
    rotX = Math.max(-40, Math.min(30, rotX));
    applyRotation();
  }

  function onPointerUp() {
    isDragging = false;
    autoResumeTimer = setTimeout(() => { autoRotate = true; }, 4000);
  }

  /* Touch support */
  function onTouchStart(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      autoRotate = false;
      clearTimeout(autoResumeTimer);
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
      velocityX = 0; velocityY = 0;
    }
    if (e.touches.length === 2) {
      isDragging = false;
      pinchStartDist = getPinchDist(e);
    }
  }

  function onTouchMove(e) {
    if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
      velocityX = dx * 0.35;
      velocityY = dy * 0.2;
      rotY += velocityX;
      rotX += velocityY;
      rotX = Math.max(-40, Math.min(30, rotX));
      applyRotation();
    }
    if (e.touches.length === 2) {
      const dist = getPinchDist(e);
      const delta = (dist - pinchStartDist) * 0.02;
      pinchStartDist = dist;
      currentZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, currentZoom - delta));
      applyZoom();
    }
  }

  function getPinchDist(e) {
    const t = e.touches;
    return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  }

  function applyRotation() {
    if (model) model.setAttribute('rotation', `${rotX} ${rotY} 0`);
  }

  function applyZoom() {
    const rig = $('#camera-rig');
    if (rig) rig.setAttribute('position', `0 2.5 ${currentZoom}`);
  }

  function startInertiaLoop() {
    function loop() {
      if (!isDragging) {
        if (autoRotate) {
          rotY += 0.15;
        } else {
          velocityX *= FRICTION;
          velocityY *= FRICTION;
          if (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01) {
            rotY += velocityX;
            rotX += velocityY;
            rotX = Math.max(-40, Math.min(30, rotX));
          }
        }
        applyRotation();
      }
      animId = requestAnimationFrame(loop);
    }
    loop();
  }

  /* ===========================
     ZOOM (Scroll)
     =========================== */
  function setupZoom() {
    if (!overlay) return;
    overlay.addEventListener('wheel', function (e) {
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      currentZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, currentZoom + dir * ZOOM_STEP));
      applyZoom();
    }, { passive: false });
  }

  /* ===========================
     DAY / NIGHT TOGGLE
     =========================== */
  function setupDayNight() {
    const btn = $('#day-night-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      isNight = !isNight;
      document.documentElement.setAttribute('data-mode', isNight ? 'night' : 'day');

      /* Update scene */
      const sky = $('#scene-sky');
      const ambLight = $('#light-ambient');
      const dirLight = $('#light-sun');
      const ground = $('[ground-plane]') || $$('a-plane')[0];

      if (sky) sky.setAttribute('color', isNight ? '#0a0a1a' : '#87CEEB');
      if (ambLight) ambLight.setAttribute('light', 'intensity', isNight ? 0.15 : 0.55);
      if (dirLight) {
        dirLight.setAttribute('light', 'intensity', isNight ? 0.3 : 0.95);
        dirLight.setAttribute('light', 'color', isNight ? '#6688cc' : '#fff5e6');
      }

      /* Toggle stars */
      $$('.night-star').forEach(star => {
        star.setAttribute('visible', isNight);
      });

      showToast(isNight ? '🌙 Night Mode' : '☀️ Day Mode');
      updateParticleColors();
    });
  }

  /* ===========================
     HOTSPOTS & INFO PANEL
     =========================== */
  function setupHotspots() {
    $$('.hotspot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.info;
        openInfoPanel(id);
      });
    });
  }

  function setupInfoPanel() {
    const panel = $('#info-panel');
    const backdrop = $('#info-backdrop');
    if (!panel) return;

    const close = panel.querySelector('.info-close');
    if (close) close.addEventListener('click', closeInfoPanel);
    if (backdrop) backdrop.addEventListener('click', closeInfoPanel);
  }

  function openInfoPanel(id) {
    const data = HOTSPOT_DATA[id];
    if (!data) return;

    const panel = $('#info-panel');
    const backdrop = $('#info-backdrop');
    if (!panel) return;

    /* Populate badge */
    const badge = panel.querySelector('.info-badge');
    if (badge) badge.textContent = data.badge;

    /* Title */
    const h2 = panel.querySelector('.info-header h2');
    if (h2) h2.textContent = data.title;

    /* Meta */
    const metaEl = panel.querySelector('.info-meta');
    if (metaEl) {
      metaEl.innerHTML = data.meta.map(m =>
        `<div class="meta-item">
           <span class="meta-label">${m.label}</span>
           <span class="meta-value">${m.value}</span>
         </div>`
      ).join('');
    }

    /* Description */
    const desc = panel.querySelector('.info-desc');
    if (desc) desc.textContent = data.desc;

    /* Facts */
    const factsEl = panel.querySelector('.info-facts');
    if (factsEl) {
      factsEl.innerHTML = data.facts.map(f =>
        `<div class="fact">
           <span class="fact-icon">${f.icon}</span>
           <span>${f.text}</span>
         </div>`
      ).join('');
    }

    panel.classList.remove('hidden');
    if (backdrop) backdrop.classList.remove('hidden');

    /* Pause rotation */
    autoRotate = false;
    clearTimeout(autoResumeTimer);
  }

  function closeInfoPanel() {
    const panel = $('#info-panel');
    const backdrop = $('#info-backdrop');
    if (panel) panel.classList.add('hidden');
    if (backdrop) backdrop.classList.add('hidden');
    autoResumeTimer = setTimeout(() => { autoRotate = true; }, 2000);
  }

  /* ===========================
     AR MODAL
     =========================== */
  function setupARModal() {
    const btn = $('#ar-btn');
    const modal = $('#ar-modal');
    if (!btn || !modal) return;

    btn.addEventListener('click', () => modal.classList.remove('hidden'));

    const close = modal.querySelector('.modal-close');
    if (close) close.addEventListener('click', () => modal.classList.add('hidden'));

    /* Close on backdrop */
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  /* ===========================
     TIMELINE
     =========================== */
  function setupTimeline() {
    $$('.timeline-point').forEach((point, idx) => {
      point.addEventListener('click', () => {
        const data = TIMELINE_DATA[idx];
        if (!data) return;

        /* Mark active */
        $$('.timeline-point').forEach(p => p.classList.remove('active'));
        point.classList.add('active');

        /* Show toast with info */
        showToast(`📜 ${data.year}: ${data.desc}`);
      });
    });
  }

  /* ===========================
     FULLSCREEN
     =========================== */
  function setupFullscreen() {
    const btn = $('#fullscreen-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  /* ===========================
     AUDIO
     =========================== */
  function setupAudio() {
    const btn = $('#audio-toggle');
    if (!btn) return;

    let audioCtx, oscillator, gainNode, playing = false;

    btn.addEventListener('click', () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        /* Create ambient drone */
        gainNode = audioCtx.createGain();
        gainNode.gain.value = 0;
        gainNode.connect(audioCtx.destination);

        oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = 136.1; /* Om frequency */
        oscillator.connect(gainNode);
        oscillator.start();

        /* Second harmonic */
        const osc2 = audioCtx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 272.2;
        const gain2 = audioCtx.createGain();
        gain2.gain.value = 0;
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start();

        btn._osc2 = osc2;
        btn._gain2 = gain2;
      }

      playing = !playing;
      btn.classList.toggle('audio-playing', playing);
      const t = audioCtx.currentTime;
      gainNode.gain.cancelScheduledValues(t);
      gainNode.gain.linearRampToValueAtTime(playing ? 0.06 : 0, t + 0.5);
      if (btn._gain2) {
        btn._gain2.gain.cancelScheduledValues(t);
        btn._gain2.gain.linearRampToValueAtTime(playing ? 0.025 : 0, t + 0.5);
      }

      showToast(playing ? '🎵 Ambient Sound On' : '🔇 Sound Off');
    });
  }

  /* ===========================
     TOAST
     =========================== */
  function showToast(msg) {
    const toast = $('#toast');
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-text');
    if (msgEl) msgEl.textContent = msg;
    toast.classList.remove('hidden');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.add('hidden'), 3000);
  }

  /* ===========================
     KEYBOARD
     =========================== */
  function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          rotY -= 5;
          autoRotate = false;
          clearTimeout(autoResumeTimer);
          autoResumeTimer = setTimeout(() => { autoRotate = true; }, 3000);
          applyRotation();
          break;
        case 'ArrowRight':
          rotY += 5;
          autoRotate = false;
          clearTimeout(autoResumeTimer);
          autoResumeTimer = setTimeout(() => { autoRotate = true; }, 3000);
          applyRotation();
          break;
        case 'ArrowUp':
          rotX = Math.max(-40, rotX - 3);
          applyRotation();
          break;
        case 'ArrowDown':
          rotX = Math.min(30, rotX + 3);
          applyRotation();
          break;
        case '+': case '=':
          currentZoom = Math.max(ZOOM_MIN, currentZoom - ZOOM_STEP);
          applyZoom();
          break;
        case '-': case '_':
          currentZoom = Math.min(ZOOM_MAX, currentZoom + ZOOM_STEP);
          applyZoom();
          break;
        case 'n': case 'N':
          $('#mode-toggle')?.click();
          break;
        case 'r': case 'R':
          rotX = 0; rotY = 0;
          currentZoom = 5;
          autoRotate = true;
          applyRotation();
          applyZoom();
          showToast('🔄 View Reset');
          break;
        case 'Escape':
          closeInfoPanel();
          break;
      }
    });
  }

  /* ===========================
     AMBIENT CANVAS (Particles)
     =========================== */
  let particles = [];
  let particleCanvas, particleCtx;

  function setupAmbientCanvas() {
    particleCanvas = $('#ambient-canvas');
    if (!particleCanvas) return;

    particleCtx = particleCanvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    createParticles(28);
    drawParticles();
  }

  function resizeCanvas() {
    if (!particleCanvas) return;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2.5 + 0.8,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.4 + 0.1,
      });
    }
  }

  function getParticleColor() {
    return isNight ? '212, 168, 67' : '180, 83, 9';
  }

  function updateParticleColors() { /* re-draws with new color next frame */ }

  function drawParticles() {
    if (!particleCtx) return;
    const W = particleCanvas.width, H = particleCanvas.height;
    particleCtx.clearRect(0, 0, W, H);

    const rgb = getParticleColor();

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      particleCtx.beginPath();
      particleCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      particleCtx.fillStyle = `rgba(${rgb}, ${p.o})`;
      particleCtx.fill();
    });

    /* Connection lines */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (d < 120) {
          particleCtx.beginPath();
          particleCtx.moveTo(particles[i].x, particles[i].y);
          particleCtx.lineTo(particles[j].x, particles[j].y);
          particleCtx.strokeStyle = `rgba(${rgb}, ${0.06 * (1 - d / 120)})`;
          particleCtx.lineWidth = 0.6;
          particleCtx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }
})();
