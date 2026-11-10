<script setup lang="ts">
defineProps<{
  id: string;
  title: string;
  eyebrow: string;
  description?: string;
}>();
</script>
<template>
  <section :id="id" class="resume-section" :aria-labelledby="`${id}-title`">
    <div class="section-heading">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 :id="`${id}-title`">{{ title }}</h2>
      <p v-if="description" class="section-description">{{ description }}</p>
    </div>
    <slot />
  </section>
</template>
