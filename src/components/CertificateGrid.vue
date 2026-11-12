<script setup lang="ts">
import { useLocale } from "../composables/useLocale";
const { ui } = useLocale();
import { usePreferences } from "../composables/usePreferences";
const { language } = usePreferences();
function formatDate(value: string) {
  return new Intl.DateTimeFormat(language.value, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
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
        ><div
          class="certificate-image"
          :class="{ 'certificate-image--document': certificate.documentUrl }"
        >
          <img
            v-if="certificate.image"
            :src="certificate.image"
            :alt="`${ui.badge} ${certificate.name}`"
          /><i v-else class="pi pi-verified" aria-hidden="true"></i>
        </div>
        <p v-if="certificate.issuer" class="organization">
          {{ certificate.issuer }}
        </p>
        <h3>{{ certificate.name }}</h3>
        <p v-if="certificate.issuedOn" class="certificate-meta">
          {{ ui.issuedOn }}:
          <time :datetime="certificate.issuedOn">{{
            formatDate(certificate.issuedOn)
          }}</time>
        </p>
        <p v-if="certificate.credentialId" class="certificate-meta">
          {{ ui.credentialId }}: {{ certificate.credentialId }}
        </p>
        <Button
          v-if="certificate.documentUrl"
          as="a"
          :href="certificate.documentUrl"
          :label="ui.certificateDocument"
          icon="pi pi-file-pdf"
          variant="text"
          target="_blank"
          rel="noopener noreferrer" />
        <Button
          v-if="certificate.credentialUrl"
          as="a"
          :href="certificate.credentialUrl"
          :label="ui.credential"
          icon="pi pi-external-link"
          variant="text"
          target="_blank"
          rel="noopener noreferrer" /></template
    ></Card>
  </div>
</template>
