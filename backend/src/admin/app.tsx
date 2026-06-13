import type { StrapiApp } from "@strapi/strapi/admin";

export default {
  config: {
    theme: {
      light: {
        colors: {
          // Primary brand green
          primary100: "#e6f2ec",
          primary200: "#c0dece",
          primary500: "#1f7a52",
          primary600: "#016339",
          primary700: "#014c2a",

          // Button-specific primary colors (Strapi uses these separately)
          buttonPrimary500: "#1f7a52",
          buttonPrimary600: "#016339",

          // Neutral tones using the warm background palette
          neutral0: "#ffffff",
          neutral100: "#f7f4ec",
          neutral150: "#edeae0",
          neutral200: "#e0ddd3",
          neutral300: "#c5c2b8",
          neutral400: "#a8a49a",
          neutral500: "#7a766c",
          neutral600: "#5a5650",
          neutral700: "#3d3933",
          neutral800: "#1f2a26",
          neutral900: "#1f2a26",
          neutral1000: "#0d1410",

          // Danger / error
          danger100: "#ffebee",
          danger200: "#ffcdd2",
          danger500: "#f44336",
          danger600: "#c62828",
          danger700: "#b71c1c",

          // Warning
          warning100: "#fff3e0",
          warning200: "#ffe0b2",
          warning500: "#ff9800",
          warning600: "#e65100",
          warning700: "#bf360c",

          // Success
          success100: "#e8f5e9",
          success200: "#c8e6c9",
          success500: "#4caf50",
          success600: "#2e7d32",
          success700: "#1b5e20",

          // Alternative / info
          alternative100: "#e3f2fd",
          alternative200: "#bbdefb",
          alternative500: "#2196f3",
          alternative600: "#1565c0",
          alternative700: "#0d47a1",

          // Backgrounds
          buttonNeutral0: "#ffffff",
          shadow: "rgba(31, 42, 38, 0.1)",
        },
      },
    },
    locales: ["zh-Hans", "zh"],
    translations: {
      en: {
        "Auth.form.welcome.title": "HK Tramway",
        "Auth.form.welcome.subtitle": "Client site CMS",
      },
      zh: {
        "Auth.form.welcome.title": "香港電車",
        "Auth.form.welcome.subtitle": "客戶網站內容管理系統",
      },
      "zh-Hans": {
        "Auth.form.welcome.title": "香港电车",
        "Auth.form.welcome.subtitle": "客户网站内容管理系统",
      },
    },
  },
  bootstrap(_app: StrapiApp) {
    localStorage.setItem("STRAPI_THEME", "light");
  },
};
