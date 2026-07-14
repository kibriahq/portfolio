"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Small icon button that toggles between light and dark themes.
 * Dark is the default; only the `.light` class is added/removed on <html>.
 * The choice is persisted to localStorage and read back by the inline script
 * in layout.tsx (so there's no flash on reload).
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Sync with the theme applied before hydration by the inline script in
    // layout.tsx (reading an external system — the <html> class list).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* ignore storage errors (private mode) */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted transition-colors hover:border-border-strong hover:text-foreground ${className}`}
    >
      {/* First render matches the server (dark → Sun); updates after mount. */}
      {isLight ? (
        <Moon className="h-[18px] w-[18px]" />
      ) : (
        <Sun className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
