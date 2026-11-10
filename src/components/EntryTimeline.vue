<script setup lang="ts">
import TimelineCard from "./TimelineCard.vue";
import type { TimelineEntry } from "../types/resume";
defineProps<{ entries: readonly TimelineEntry[]; collapsible?: boolean }>();
</script>
<template>
  <ol class="entry-list">
    <li v-for="entry in entries" :key="entry.id" class="entry">
      <div class="entry-period">{{ entry.period }}</div>
      <TimelineCard :entry="entry" :collapsible="collapsible" />
    </li>
  </ol>
</template>
