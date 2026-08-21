import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

declare module "@mui/material/styles" {
  interface Palette {
    earthLight: Palette["primary"];
  }
  interface PaletteOptions {
    earthLight?: PaletteOptions["primary"];
  }
}

// Aligned to Tailwind CSS's default screen breakpoints
// https://tailwindcss.com/docs/responsive-design
const theme = createTheme({
  typography: {
    fontFamily: "var(--font-sans)",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: colors.green,
    },
    secondary: {
      main: colors.accentBrown,
    },
    error: {
      main: colors.redDark,
    },
    earthLight: {
      main: colors.earthLight,
    },
    background: {
      default: colors.white,
      paper: colors.white,
    },
  },
});

export default theme;
