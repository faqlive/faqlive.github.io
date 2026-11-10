<script setup lang="ts">
import Tag from "primevue/tag";
import type { SkillGroup } from "../types/resume";
defineProps<{ groups: readonly SkillGroup[] }>();
</script>
<template>
  <div class="skill-grid">
    <article v-for="group in groups" :key="group.name" class="skill-group">
      <h3>{{ group.name }}</h3>
      <div class="tags">
        <Tag
          v-for="item in group.items"
          :key="item"
          :value="item"
          severity="secondary"
        />
      </div>
    </article>
  </div>
</template>
