"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Wand2, Palette, Type } from "lucide-react";

type ThemePreset = "signature" | "sunset" | "emerald";
type FontStyle = "creative" | "classic";

const themePresets: Record<
  ThemePreset,
  { label: string; primary: string; accent: string }
> = {
  signature: {
    label: "Sparkle Signature",
    primary: "oklch(0.43 0.06 182)",
    accent: "oklch(0.97 0 0)",
  },
  sunset: {
    label: "Golden Sunset",
    primary: "oklch(0.72 0.18 55)",
    accent: "oklch(0.9 0.12 35)",
  },
  emerald: {
    label: "Emerald Glow",
    primary: "oklch(0.68 0.18 150)",
    accent: "oklch(0.9 0.08 145)",
  },
};

export function ExperienceAssistant() {
  const [showTop, setShowTop] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemePreset>("signature");
  const [fontStyle, setFontStyle] = useState<FontStyle>("creative");
  const [panelPosition, setPanelPosition] = useState<{ top: number; right: number } | null>(null);
  const [dragBounds, setDragBounds] = useState<{ top: number; bottom: number }>({
    top: -200,
    bottom: 200,
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Back to top visibility
  useEffect(() => {
    const handler = () => {
      setShowTop(window.scrollY > 300);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Constrain assistant button within viewport (vertical rail on the right)
  useEffect(() => {
    const updateBounds = () => {
      const h = window.innerHeight;
      const margin = 80; // keep some space from top & bottom
      setDragBounds({
        top: -h / 2 + margin,
        bottom: h / 2 - margin,
      });
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  // Apply theme + font styles to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const currentTheme = themePresets[theme];
    root.style.setProperty("--primary", currentTheme.primary);
    root.style.setProperty("--accent", currentTheme.accent);

    body.dataset.fontStyle = fontStyle;
  }, [theme, fontStyle]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updatePanelPositionFromButton = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const right = window.innerWidth - rect.right + 8; // small gap
    const top = rect.top;
    setPanelPosition({ top, right });
  };

  const toggleOpen = () => {
    setOpen((prev) => {
      const next = !prev;
      if (!prev && !panelPosition) {
        // opening for first time -> align with current button position
        updatePanelPositionFromButton();
      }
      return next;
    });
  };

  // Close panel when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <>
      {/* Back to top button (bottom-right) */}
      <div className="fixed right-4 bottom-4 z-[90] md:right-6 md:bottom-6">
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              onClick={scrollToTop}
              className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary shadow-lg backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Assistant toggle button (center-right, draggable, smaller) */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={toggleOpen}
        className="fixed right-3 top-1/2 z-[92] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-background/90 text-primary shadow-xl backdrop-blur hover:bg-primary hover:text-primary-foreground md:right-5"
        aria-expanded={open}
        aria-label="Open design assistant"
        drag="y"
        dragMomentum={false}
        dragElastic={0.2}
        dragConstraints={dragBounds}
        onDragEnd={updatePanelPositionFromButton}
      >
        <Wand2 className="h-4 w-4" />
      </motion.button>

      {/* Assistant panel */}
      <AnimatePresence>
        {open && panelPosition && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="fixed z-[95] w-[280px] rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur"
            style={{
              top: Math.min(
                Math.max(panelPosition.top - 80, 16),
                window.innerHeight - 260
              ),
              right: panelPosition.right,
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Live Experience Controls
              </p>
            </div>

            <div className="space-y-4 text-sm">
              {/* Color theme */}
              <div>
                <div className="mb-1 flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Palette className="h-3 w-3" />
                  Color Mood
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(themePresets) as ThemePreset[]).map((key) => {
                    const preset = themePresets[key];
                    const isActive = theme === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTheme(key)}
                        className={`flex-1 min-w-[80px] rounded-xl border px-2 py-2 text-xs text-left transition ${
                          isActive
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-muted/60 hover:bg-muted"
                        }`}
                      >
                        <div className="mb-1 flex items-center gap-1.5">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: preset.primary }}
                          />
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: preset.accent }}
                          />
                        </div>
                        <span>{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font style */}
              <div>
                <div className="mb-1 flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Type className="h-3 w-3" />
                  Typography
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFontStyle("creative")}
                    className={`rounded-xl border px-2 py-2 text-xs transition ${
                      fontStyle === "creative"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/60 hover:bg-muted"
                    }`}
                  >
                    Creative
                    <span className="mt-1 block text-[10px] text-muted-foreground">
                      Syne + Outfit
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontStyle("classic")}
                    className={`rounded-xl border px-2 py-2 text-xs transition ${
                      fontStyle === "classic"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/60 hover:bg-muted"
                    }`}
                  >
                    Classic
                    <span className="mt-1 block text-[10px] text-muted-foreground">
                      Elegant serif feel
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

