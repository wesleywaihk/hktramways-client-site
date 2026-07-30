// Single source of truth for brand colors, shared between Tailwind
// (via styles/_colors.scss) and the MUI theme (via theme/theme.ts).
// Keep these values in sync with styles/_colors.scss.
export const colors = {
  green: "#007549",
  greenLight: "#009a5a",
  white: "#ffffff",
  earthLight: "#edebda",
  redDark: "#5a1716",
  gold: "#c8a96f",
  accentBrown: "#703900",
  black: "#222",
} as const;
