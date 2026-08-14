/**
 * Fixed, full-viewport ambient background.
 * Developer-focused (grid + subtle accent glow) rather than generic
 * gradient blobs. Purely CSS, theme-aware, and non-interactive.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Subtle accent glow anchored near the hero */}
      <div
        className="absolute left-1/2 top-[-10%] h-[560px] w-[820px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, var(--glow), transparent 70%)",
        }}
      />
      {/* Grid texture */}
      <div className="grid-overlay absolute inset-0" />
      {/* Fade the grid out toward the bottom so content stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
