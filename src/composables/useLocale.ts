import { computed } from "vue";
import { locales } from "../locales";
import { usePreferences } from "./usePreferences";
export function useLocale() {
  const { language } = usePreferences();
  return {
    ui: computed(() => locales[language.value].ui),
    content: computed(() => locales[language.value].content),
  };
}
