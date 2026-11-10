<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import type { Certificate } from "../types/resume";
defineProps<{ certificates: readonly Certificate[] }>();
</script>
<template>
  <div class="certificate-grid">
    <Card
      v-for="certificate in certificates"
      :key="certificate.id"
      class="certificate-card"
      ><template #content
        ><div class="certificate-image">
          <img
            v-if="certificate.image"
            :src="certificate.image"
            :alt="`Distintivo de ${certificate.name}`"
          /><i v-else class="pi pi-verified" aria-hidden="true"></i>
        </div>
        <p v-if="certificate.issuer" class="organization">
          {{ certificate.issuer }}
        </p>
        <h3>{{ certificate.name }}</h3>
        <Button
          v-if="certificate.credentialUrl"
          as="a"
          :href="certificate.credentialUrl"
          label="Ver credencial"
          icon="pi pi-external-link"
          variant="text"
          target="_blank"
          rel="noopener noreferrer" /></template
    ></Card>
  </div>
</template>
