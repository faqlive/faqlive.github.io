<script setup lang="ts">
defineProps<{ active: boolean }>();
</script>
<template>
  <Transition name="section" appear>
    <div v-show="active" class="section-panel"><slot /></div>
  </Transition>
</template>
