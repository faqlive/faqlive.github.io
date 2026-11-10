import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import "./styles.css";
import App from "./App.vue";
createApp(App)
  .use(PrimeVue, {
    theme: { preset: Aura, options: { darkModeSelector: false } },
  })
  .mount("#app");
