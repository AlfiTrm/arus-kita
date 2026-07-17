export type PressButtonStyle = {
  base: string;
  shadow: string;
  hoverShadow: string;
  pressShadow: string;
  /** "press" = duolingo-style y-offset riding on the shadow; "flat" = no shadow, just scale feedback. */
  mode: "press" | "flat";
};

type PressButtonMotionValues = {
  y?: number;
  scale?: number;
  boxShadow?: string;
};

export type PressButtonMotionState = {
  whileHover: PressButtonMotionValues;
  whileTap: PressButtonMotionValues;
};

export const PRESS_BUTTON_VARIANTS = {
  primary: {
    base: "bg-main text-white",
    shadow: "0 4px 0 0 var(--color-main-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-main-shadow)",
    pressShadow: "0 1px 0 0 var(--color-main-shadow)",
    mode: "press",
  },
  secondary: {
    base: "bg-secondary text-black",
    shadow: "0 4px 0 0 var(--color-secondary-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-secondary-shadow)",
    pressShadow: "0 1px 0 0 var(--color-secondary-shadow)",
    mode: "press",
  },
  success: {
    base: "bg-success text-white",
    shadow: "0 4px 0 0 var(--color-success-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-success-shadow)",
    pressShadow: "0 1px 0 0 var(--color-success-shadow)",
    mode: "press",
  },
  warning: {
    base: "bg-warning text-black",
    shadow: "0 4px 0 0 var(--color-warning-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-warning-shadow)",
    pressShadow: "0 1px 0 0 var(--color-warning-shadow)",
    mode: "press",
  },
  danger: {
    base: "bg-error text-white",
    shadow: "0 4px 0 0 var(--color-error-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-error-shadow)",
    pressShadow: "0 1px 0 0 var(--color-error-shadow)",
    mode: "press",
  },
  outline: {
    base: "border border-main bg-surface text-main",
    shadow: "0 4px 0 0 var(--color-outline-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-outline-shadow)",
    pressShadow: "0 1px 0 0 var(--color-outline-shadow)",
    mode: "press",
  },
  outlineInverse: {
    base: "border border-white/40 bg-transparent text-white",
    shadow: "0 4px 0 0 var(--color-outline-inverse-shadow)",
    hoverShadow: "0 2px 0 0 var(--color-outline-inverse-shadow)",
    pressShadow: "0 1px 0 0 var(--color-outline-inverse-shadow)",
    mode: "press",
  },
  ghost: {
    base: "bg-transparent text-main hover:bg-main/10",
    shadow: "none",
    hoverShadow: "none",
    pressShadow: "none",
    mode: "flat",
  },
} satisfies Record<string, PressButtonStyle>;

export type PressButtonVariant = keyof typeof PRESS_BUTTON_VARIANTS;

export const getPressButtonVariant = (variant: string): PressButtonStyle =>
  PRESS_BUTTON_VARIANTS[variant as PressButtonVariant] ?? PRESS_BUTTON_VARIANTS.primary;

export const getPressButtonMotion = (
  variant: string,
  disabled = false,
): PressButtonMotionState => {
  if (disabled) {
    return { whileHover: {}, whileTap: {} };
  }

  const resolved = getPressButtonVariant(variant);

  if (resolved.mode === "flat") {
    return {
      whileHover: {},
      whileTap: { scale: 0.97 },
    };
  }

  return {
    whileHover: { y: 2, boxShadow: resolved.hoverShadow },
    whileTap: { y: 3, boxShadow: resolved.pressShadow },
  };
};
