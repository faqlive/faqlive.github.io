<script setup lang="ts">
import Button from "primevue/button";
defineProps<{
  profile: {
    name: string;
    role: string;
    headline: string;
    summary: string;
    email: string;
    photo: string;
  };
}>();
const printResume = () => window.print();
</script>
<template>
  <section id="inicio" class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow"><span class="status-dot"></span> {{ profile.role }}</p>
      <h1 id="hero-title">{{ profile.name }}</h1>
      <p class="hero-headline">{{ profile.headline }}</p>
      <p class="hero-summary">{{ profile.summary }}</p>
      <div class="hero-actions">
        <Button
          as="a"
          :href="`mailto:${profile.email}`"
          label="Hablemos"
          icon="pi pi-arrow-up-right"
        /><Button
          label="Guardar PDF"
          icon="pi pi-print"
          severity="secondary"
          outlined
          @click="printResume"
        />
      </div>
    </div>
    <div class="portrait-panel">
      <div class="portrait-frame">
        <img
          :src="profile.photo"
          :alt="profile.name"
          width="320"
          height="360"
        /><span class="portrait-caption">JAVA / WEB / BUSINESS RULES</span>
      </div>
      <div class="portrait-detail">
        <span>Perfil profesional</span
        ><span>Desarrollo & implementación IT</span>
      </div>
    </div>
  </section>
</template>
