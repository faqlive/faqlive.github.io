import { ref, readonly, watch } from "vue";
import type { Language } from "../locales";

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Preferences still work when storage is unavailable. */
  }
}
const language = ref<Language>(read("cv-language") === "en" ? "en" : "es");
const storedTheme = read("cv-theme");
const dark = ref(
  storedTheme === "dark" ||
    (storedTheme !== "light" &&
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-color-scheme: dark)").matches),
);
watch(
  language,
  (value) => {
    document.documentElement.lang = value;
    save("cv-language", value);
  },
  { immediate: true },
);
watch(
  dark,
  (value) => {
    document.documentElement.classList.toggle("app-dark", value);
    document.documentElement.style.colorScheme = value ? "dark" : "light";
    save("cv-theme", value ? "dark" : "light");
  },
  { immediate: true },
);
export function usePreferences() {
  return {
    language: readonly(language),
    dark: readonly(dark),
    setLanguage: (value: Language) => {
      language.value = value;
    },
    toggleTheme: () => {
      dark.value = !dark.value;
    },
  };
}
