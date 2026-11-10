import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import "./styles.css";
import App from "./App.vue";
const ResumeTheme = definePreset(Aura, {
  semantic: {
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
    theme: { preset: ResumeTheme, options: { darkModeSelector: false } },
  })
  .mount("#app");
