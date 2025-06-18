interface LogoTrailOptions {
  logo: string;
  element?: HTMLElement;
  size?: number;
  gap?: number;
  cursorOffset?: { x: number; y: number };
  particleCount?: number;
  lifespan?: number;
}

interface ParticleType {
  age: number;
  lifeSpan: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  update: (ctx: CanvasRenderingContext2D, scrollX: number, scrollY: number) => void;
}

export function logoTrail(options: LogoTrailOptions) {
  const {
    logo,
    element = document.body,
    size = 12, // slightly bigger for clarity
    gap = 10,
    cursorOffset = { x: 0, y: 0 },
    particleCount = 6, // way fewer particles
    lifespan = 120, // longer lifespan for slower fade
  } = options;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let animationFrame: number;
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Track cursor position relative to page (including scroll)
  let cursor = { x: width / 2, y: height / 2 };
  let lastEmit = 0; // timestamp of last particle added
  const emitInterval = 100; // ms between particles (slower emission)

  let particles: ParticleType[] = [];

  const image = new Image();
  image.src = logo;

  function Particle(x: number, y: number): ParticleType {
    const age = 0;
    const lifeSpan = lifespan;
    const velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.8, // smaller velocity for thinner spread
      y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.8,
    };
    const position = { x: x + cursorOffset.x, y: y + cursorOffset.y };

    return {
      age,
      lifeSpan,
      velocity,
      position,
      update(ctx: CanvasRenderingContext2D, scrollX: number, scrollY: number) {
        this.age++;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        const alpha = Math.max((this.lifeSpan - this.age) / this.lifeSpan, 0);
        ctx.globalAlpha = alpha;
        // Draw adjusted for scroll position
        ctx.drawImage(image, this.position.x - scrollX, this.position.y - scrollY, size, size);
        ctx.globalAlpha = 1;
      },
    };
  }

  function init() {
    if (prefersReducedMotion.matches) return;

    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d")!;

    // Always position fixed to avoid scroll displacement
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    element.appendChild(canvas);
    bindEvents();
    loop();
  }

  function bindEvents() {
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("touchmove", onTouchMove, { passive: true });
    element.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("resize", onResize);
  }

  function onMouseMove(e: MouseEvent) {
    // Cursor relative to the *page*, not viewport:
    cursor.x = e.pageX;
    cursor.y = e.pageY;

    // Emit particles only every emitInterval ms
    const now = performance.now();
    if (now - lastEmit > emitInterval) {
      addParticle(cursor.x, cursor.y);
      lastEmit = now;
    }
  }

  function onTouchMove(e: TouchEvent) {
    if (e.touches.length > 0) {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        cursor.x = touch.pageX;
        cursor.y = touch.pageY;

        const now = performance.now();
        if (now - lastEmit > emitInterval) {
          addParticle(cursor.x, cursor.y);
          lastEmit = now;
        }
      }
    }
  }

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function addParticle(x: number, y: number) {
    particles.push(Particle(x, y));
    if (particles.length > particleCount) {
      particles.shift(); // keep max particle count
    }
  }

  function updateParticles() {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Pass scroll offset so drawing accounts for scroll properly
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    for (let i = 0; i < particles.length; i++) {
      particles[i].update(ctx, scrollX, scrollY);
    }

    // Remove old particles
    particles = particles.filter((p) => p.age < p.lifeSpan);
  }

  function loop() {
    updateParticles();
    animationFrame = requestAnimationFrame(loop);
  }

  function destroy() {
    cancelAnimationFrame(animationFrame);
    canvas.remove();
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("touchmove", onTouchMove);
    element.removeEventListener("touchstart", onTouchMove);
    window.removeEventListener("resize", onResize);
  }

  if (image.complete) {
    init();
  } else {
    image.onload = init;
  }

  return { destroy };
}