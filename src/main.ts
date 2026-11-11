import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import "./styles.css";
import App from "./App.vue";
const ResumeTheme = definePreset(Aura, {
  semantic: {
    colorScheme: {
      dark: {
        primary: {
          color: "{violet.300}",
          inverseColor: "#111020",
          hoverColor: "{violet.200}",
          activeColor: "{violet.100}",
        },
        highlight: {
          background: "#292044",
          focusBackground: "#38285c",
          color: "#ede4ff",
          focusColor: "#ffffff",
        },
        surface: {
          0: "#ffffff",
          50: "#f0f1ff",
          100: "#dce0f6",
          200: "#bec5e4",
          300: "#a5adcc",
          400: "#8790b0",
          500: "#6b7395",
          600: "#4b5272",
          700: "#303755",
          800: "#1b2238",
          900: "#111625",
          950: "#080b13",
        },
      },
    },
    primary: {
      50: "#eef7fa",
      100: "#cef0fc",
      200: "#aed7e7",
      300: "#83bbd0",
      400: "#4a95b0",
      500: "#38768c",
      600: "#2a5463",
      700: "#244957",
      800: "#1d3d49",
      900: "#18333d",
      950: "#10232a",
    },
  },
});
createApp(App)
  .use(PrimeVue, {
    theme: { preset: ResumeTheme, options: { darkModeSelector: ".app-dark" } },
  })
  .mount("#app");
