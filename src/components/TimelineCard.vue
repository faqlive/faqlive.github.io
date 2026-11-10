<script setup lang="ts">
import { ref, useId } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Tag from "primevue/tag";
import type { TimelineEntry } from "../types/resume";

defineProps<{ entry: TimelineEntry; collapsible?: boolean }>();
const expanded = ref(false);
const id = useId();
</script>

<template>
  <Card class="entry-card">
    <template #content>
      <div class="entry-heading">
        <div>
          <p class="organization">{{ entry.organization }}</p>
          <h3 :id="`${id}-title`">{{ entry.title }}</h3>
        </div>
        <Button
          v-if="collapsible"
          class="entry-toggle"
          :label="expanded ? 'Ocultar detalles' : 'Ver detalles'"
          :icon="expanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
          :aria-label="`${expanded ? 'Ocultar' : 'Ver'} detalles de ${entry.title} en ${entry.organization}`"
          :aria-expanded="expanded"
          :aria-controls="`${id}-details`"
          severity="secondary"
          variant="text"
          size="small"
          @click="expanded = !expanded"
        />
      </div>
      <Transition name="entry-details">
        <div
          v-show="!collapsible || expanded"
          :id="`${id}-details`"
          class="entry-description"
          :role="collapsible ? 'region' : undefined"
          :aria-labelledby="collapsible ? `${id}-title` : undefined"
        >
          <p v-if="entry.location" class="entry-location">
            {{ entry.location }}
          </p>
          <p v-if="entry.description">{{ entry.description }}</p>
          <ul v-if="entry.highlights?.length" class="highlights">
            <li v-for="highlight in entry.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ul>
          <p v-if="entry.note" class="entry-note">
            <i class="pi pi-info-circle" aria-hidden="true"></i>
            {{ entry.note }}
          </p>
        </div>
      </Transition>
      <div
        v-if="entry.technologies?.length || entry.competencies?.length"
        class="tags"
      >
        <Tag
          v-for="technology in entry.technologies"
          :key="technology"
          :value="technology"
          severity="secondary"
        />
        <Tag
          v-for="competency in entry.competencies"
          :key="competency"
          :value="competency"
          severity="secondary"
          class="competency-tag"
        />
      </div>
    </template>
  </Card>
</template>
