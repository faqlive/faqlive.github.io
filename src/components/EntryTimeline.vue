<script setup lang="ts">
import Card from "primevue/card";
import Tag from "primevue/tag";
import type { TimelineEntry } from "../types/resume";
defineProps<{ entries: readonly TimelineEntry[] }>();
</script>
<template>
  <ol class="entry-list">
    <li v-for="entry in entries" :key="entry.id" class="entry">
      <div class="entry-period">{{ entry.period }}</div>
      <Card class="entry-card"
        ><template #content
          ><p class="organization">{{ entry.organization }}</p>
          <h3>{{ entry.title }}</h3>
          <p v-if="entry.location" class="entry-location">
            {{ entry.location }}
          </p>
          <p v-if="entry.description">{{ entry.description }}</p>
          <ul v-if="entry.highlights?.length" class="highlights">
            <li v-for="highlight in entry.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ul>
          <div v-if="entry.technologies?.length" class="tags">
            <Tag
              v-for="technology in entry.technologies"
              :key="technology"
              :value="technology"
              severity="secondary"
            />
          </div>
          <p v-if="entry.note" class="entry-note">
            <i class="pi pi-info-circle" aria-hidden="true"></i>
            {{ entry.note }}
          </p></template
        ></Card
      >
    </li>
  </ol>
</template>
