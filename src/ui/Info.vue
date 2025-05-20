<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="info">
    <i class="pi pi-question-circle" />
    <div class="text">
      {{ text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.info {
  gap: 12px;
  width: 100%;
  display: flex;
  border-radius: 8px;
  padding: 8px 12px;
  background: #ffffff6a;
  align-items: center;
}
</style>
