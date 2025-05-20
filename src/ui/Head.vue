<script setup lang="ts">
import { useAccountsStore } from "@/stores/accounts";
import Button from "primevue/button";
const accountsStore = useAccountsStore();
</script>

<template>
  <div class="head">
    <h3>Учетные записи</h3>
    <Button
      icon="pi pi-plus"
      rounded
      size="small"
      @click="accountsStore.addAccount"
    />
  </div>
</template>

<style scoped lang="scss">
.head {
  gap: 16px;
  height: 32px;
  display: flex;
  align-items: center;
}
</style>
