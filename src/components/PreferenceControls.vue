<script setup lang="ts">
import Button from "primevue/button";
import { usePreferences } from "../composables/usePreferences";
import { useLocale } from "../composables/useLocale";
import type { Language } from "../locales";
const { language, dark, setLanguage, toggleTheme } = usePreferences();
const { ui } = useLocale();
function changeLanguage(event: Event) {
  setLanguage((event.target as HTMLSelectElement).value as Language);
}
</script>
<template>
  <select
    class="language-select"
    :aria-label="ui.language"
    :value="language"
    @change="changeLanguage"
  >
    <option value="es">ES</option>
    <option value="en">EN</option>
  </select>
  <Button
    class="theme-toggle"
    :icon="dark ? 'pi pi-sun' : 'pi pi-moon'"
    :aria-label="ui.darkMode"
    :aria-pressed="dark"
    :title="dark ? ui.enableLight : ui.enableDark"
    variant="text"
    @click="toggleTheme"
  />
</template>
