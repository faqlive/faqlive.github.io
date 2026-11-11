<script setup lang="ts">
import { useLocale } from "../composables/useLocale";
const { ui } = useLocale();
import PreferenceControls from "./PreferenceControls.vue";
import { ref } from "vue";
import Button from "primevue/button";
const open = ref(false);
defineProps<{
  name: string;
  activeSection: string;
  sections: readonly { id: string; label: string }[];
}>();
</script>
<template>
  <header class="site-header">
    <div class="nav-container">
      <a href="#inicio" class="brand" @click="open = false">{{ name }}</a>
      <nav id="main-navigation" :aria-label="ui.navigation" :class="{ open }">
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          :aria-current="activeSection === section.id ? 'page' : undefined"
          @click="open = false"
          >{{ section.label }}</a
        >
      </nav>
      <div class="header-tools">
        <PreferenceControls />
        <Button
          class="menu-toggle"
          :icon="open ? 'pi pi-times' : 'pi pi-bars'"
          :aria-label="open ? ui.closeMenu : ui.openMenu"
          :aria-expanded="open"
          aria-controls="main-navigation"
          variant="text"
          @click="open = !open"
        />
      </div>
    </div>
  </header>
</template>
