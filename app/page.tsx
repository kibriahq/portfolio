"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
    // This fires on initial layout and whenever the element is resized.
    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = v_texCoord;
    vec2 p = (uv * 2.0 - 1.0);
    p.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.2;
    
    // Create soft, slow-moving blobs
    float blob1 = sin(p.x * 2.0 + t) * cos(p.y * 1.5 - t * 0.8) * 0.5 + 0.5;
    float blob2 = cos(p.x * 1.2 - t * 0.5) * sin(p.y * 2.2 + t * 1.2) * 0.5 + 0.5;
    float blob3 = sin(length(p) * 1.5 - t);

    // Mix colors based on blobs (very subtle, low opacity)
    vec3 color1 = vec3(0.36, 0.36, 1.0); // Primary accent (blue-ish)
    vec3 color2 = vec3(0.5, 0.2, 0.8);  // Secondary accent (violet-ish)
    vec3 baseBg = vec3(0.043, 0.043, 0.043); // #0B0B0B

    vec3 finalColor = baseBg;
    finalColor = mix(finalColor, color1, blob1 * 0.08);
    finalColor = mix(finalColor, color2, blob2 * 0.06);
    finalColor += color1 * (1.0 - length(p * 0.8)) * 0.05; // Center glow

    gl_FragColor = vec4(finalColor, 1.0);
}`;

    function cs(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vsShader = cs(gl.VERTEX_SHADER, vs);
    const fsShader = cs(gl.FRAGMENT_SHADER, fs);
    if (!vsShader || !fsShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vsShader);
    gl.attachShader(prog, fsShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    // u_mouse is in pixel coordinates matching u_resolution (ShaderToy convention).
    // Shaders that need normalized coords should use: u_mouse / u_resolution.
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    function render(t: number) {
      if (!canvas || !gl) return;
      if (typeof ResizeObserver === "undefined") syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    render(0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      cancelAnimationFrame(animationFrameId);
      if (gl) {
        gl.deleteBuffer(buf);
        gl.deleteProgram(prog);
        gl.deleteShader(vsShader);
        gl.deleteShader(fsShader);
      }
    };
  }, []);

  useEffect(() => {
    // Set target date once on mount (15 July 2026)
    const launchDate = new Date("2026-07-15T00:00:00");
    // launchDate.setDate(launchDate.getDate() + 15);

    function refresh() {
      const now = new Date().getTime();
      const diff = launchDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    }

    const intervalId = setInterval(refresh, 1000);
    refresh();

    // Atmospheric micro-interactions
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll(".glass-card");
      const x = e.clientX;
      const y = e.clientY;

      cards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        const rect = htmlCard.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = x - cx;
        const dy = y - cy;

        htmlCard.style.transform = `perspective(1000px) rotateX(${dy * 0.05}deg) rotateY(${dx * -0.05}deg)`;
        htmlCard.style.boxShadow = `0 20px 60px -10px rgba(${dx > 0 ? "255, 140, 0" : "140, 120, 255"}, 0.2)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[-1]">
        <div
          className="absolute inset-0 w-full h-full opacity-60"
          style={{ display: "block" }}
        >
          <canvas
            ref={canvasRef}
            id="shader-canvas-ANIMATION_2"
            style={{ display: "block", width: "100%", height: "100%" }}
          ></canvas>
        </div>

        <div className="grid-overlay absolute inset-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/20 via-transparent to-[#0B0B0B]"></div>
      </div>

      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-glass-fill border-b border-glass-border">
        <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
          <div className="font-display text-body-lg font-bold text-text-primary tracking-tighter">
            kibria.dev
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a
              className="font-body-md text-text-secondary hover:text-text-primary transition-colors duration-300"
              href="#"
            >
              Work
            </a>
            <a
              className="font-body-md text-text-secondary hover:text-text-primary transition-colors duration-300"
              href="#"
            >
              Labs
            </a>
            <a
              className="font-body-md text-text-secondary hover:text-text-primary transition-colors duration-300"
              href="#"
            >
              About
            </a>
            <button className="bg-primary text-on-primary font-body-md font-bold px-6 py-2 rounded-full scale-95 active:scale-90 transition-transform">
              Connect
            </button>
          </div>
        </nav>
      </header>
      <main className="relative pt-32 pb-16 px-margin-mobile md:px-margin-desktop flex flex-col items-center justify-center min-h-screen max-w-container-max mx-auto text-center">
        <section className="fade-in stagger-1 max-w-3xl mb-16">
          <span className="font-label-sm text-primary uppercase tracking-widest mb-6 block">
            Coming Soon
          </span>
          <h1 className="font-display text-headline-lg-mobile md:text-display text-text-primary mb-6 text-glow leading-tight">
            Building something <br className="hidden md:block" />
            amazing.
          </h1>
          <p className="font-body-lg text-text-secondary max-w-xl mx-auto">
            A new portfolio and digital experience is currently under
            development. Stay tuned for the launch and a deeper look into my
            technical journey.
          </p>
        </section>

        <section className="fade-in stagger-2 w-full max-w-2xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
              <span
                className="font-display text-headline-lg md:text-display text-primary leading-none"
                id="days"
              >
                {timeLeft.days}
              </span>
              <span className="font-label-sm text-text-secondary mt-2 uppercase tracking-tighter">
                Days
              </span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
              <span
                className="font-display text-headline-lg md:text-display text-primary leading-none"
                id="hours"
              >
                {timeLeft.hours}
              </span>
              <span className="font-label-sm text-text-secondary mt-2 uppercase tracking-tighter">
                Hours
              </span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
              <span
                className="font-display text-headline-lg md:text-display text-primary leading-none"
                id="minutes"
              >
                {timeLeft.minutes}
              </span>
              <span className="font-label-sm text-text-secondary mt-2 uppercase tracking-tighter">
                Minutes
              </span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
              <span
                className="font-display text-headline-lg md:text-display text-primary leading-none"
                id="seconds"
              >
                {timeLeft.seconds}
              </span>
              <span className="font-label-sm text-text-secondary mt-2 uppercase tracking-tighter">
                Seconds
              </span>
            </div>
          </div>
        </section>

        <section className="fade-in stagger-3 w-full max-w-lg mb-20">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center p-2 rounded-full glass-card border border-glass-border">
            <input
              className="bg-transparent border-none focus:ring-0 text-body-md text-text-primary w-full md:w-auto flex-grow px-6 py-3 placeholder:text-text-secondary"
              placeholder="Enter your email"
              type="email"
              disabled={true}
            />
            <button className="bg-text-primary text-background font-body-md font-bold px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 w-full md:w-auto shadow-xl shadow-primary/10">
              Notify Me
            </button>
          </div>
          <div className="mt-8 flex gap-6 justify-center">
            <a
              className="flex items-center gap-2 font-body-md text-text-secondary hover:text-text-primary transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                code
              </span>
              GitHub
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
        </section>

        <section className="fade-in stagger-4 flex gap-8 mb-12">
          <a
            aria-label="GitHub"
            className="w-12 h-12 flex items-center justify-center glass-card rounded-full text-text-secondary hover:text-primary hover:border-primary/40 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined">terminal</span>
          </a>
          <a
            aria-label="LinkedIn"
            className="w-12 h-12 flex items-center justify-center glass-card rounded-full text-text-secondary hover:text-primary hover:border-primary/40 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
          </a>
          <a
            aria-label="X"
            className="w-12 h-12 flex items-center justify-center glass-card rounded-full text-text-secondary hover:text-primary hover:border-primary/40 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined">close</span>
          </a>
          <a
            aria-label="Email"
            className="w-12 h-12 flex items-center justify-center glass-card rounded-full text-text-secondary hover:text-primary hover:border-primary/40 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined">mail</span>
          </a>
        </section>
      </main>

      <footer className="w-full py-12 border-t border-glass-border bg-glass-fill/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-gutter">
          <div className="font-display text-body-md font-bold text-text-primary">
            kibria.dev
          </div>
          <div className="font-label-sm text-text-secondary text-center md:text-left">
            © 2026 kibria.dev | Built with precision and a lot of coffee.
          </div>
          <div className="flex gap-6">
            <a
              className="font-label-sm text-text-secondary hover:text-primary transition-colors"
              href="#"
            >
              Twitter
            </a>
            <a
              className="font-label-sm text-text-secondary hover:text-primary transition-colors"
              href="#"
            >
              GitHub
            </a>
            <a
              className="font-label-sm text-text-secondary hover:text-primary transition-colors"
              href="#"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
