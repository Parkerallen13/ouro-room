// logoTrail.tsx
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
    size = 12,
    gap = 10,
    cursorOffset = { x: 0, y: 0 },
    particleCount = 6,
    lifespan = 120,
  } = options;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let animationFrame: number | null = null;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let active = false; // <-- NEW: only clean up if we actually initialized

  let cursor = { x: width / 2, y: height / 2 };
  let lastEmit = 0;
  const emitInterval = 100;

  let particles: ParticleType[] = [];

  const image = new Image();
  image.src = logo;

  function Particle(x: number, y: number): ParticleType {
    const age = 0;
    const lifeSpan = lifespan;
    const velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.8,
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
        ctx.drawImage(image, this.position.x - scrollX, this.position.y - scrollY, size, size);
        ctx.globalAlpha = 1;
      },
    };
  }

  function init() {
    if (prefersReducedMotion.matches) return; // don't init at all

    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");

    // If we failed to get a context, bail gracefully
    if (!ctx) {
      canvas = null;
      return;
    }

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    element.appendChild(canvas);
    bindEvents();
    active = true; // <-- mark initialized
    loop();
  }

  function bindEvents() {
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("touchmove", onTouchMove, { passive: true });
    element.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("resize", onResize);
  }

  function onMouseMove(e: MouseEvent) {
    cursor.x = e.pageX;
    cursor.y = e.pageY;
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
    if (!canvas) return;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function addParticle(x: number, y: number) {
    particles.push(Particle(x, y));
    if (particles.length > particleCount) particles.shift();
  }

  function updateParticles() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(ctx, scrollX, scrollY);
    }
    particles = particles.filter((p) => p.age < p.lifeSpan);
  }

  function loop() {
    if (!active) return; // <-- guard for safety
    updateParticles();
    animationFrame = requestAnimationFrame(loop);
  }

  function destroy() {
    // <-- Make cleanup safe & idempotent
    active = false;

    if (animationFrame != null) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }

    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas); // guard against already-removed nodes
    }
    canvas = null;
    ctx = null;

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