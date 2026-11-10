<script setup lang="ts">
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
      <a href="#inicio" class="brand" @click="open = false"
        ><span class="brand-mark" aria-hidden="true">F.</span
        ><span>{{ name }}</span></a
      ><Button
        class="menu-toggle"
        :icon="open ? 'pi pi-times' : 'pi pi-bars'"
        :aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="open"
        aria-controls="main-navigation"
        variant="text"
        @click="open = !open"
      />
      <nav
        id="main-navigation"
        aria-label="Navegación principal"
        :class="{ open }"
      >
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          :aria-current="activeSection === section.id ? 'page' : undefined"
          @click="open = false"
          >{{ section.label }}</a
        >
      </nav>
    </div>
  </header>
</template>
