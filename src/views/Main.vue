<script setup alng="ts">
import Head from "@/ui/Head.vue";
import Info from "@/ui/Info.vue";
import Table from "@/ui/Table.vue";
</script>

<template>
  <main>
    <Head />
    <Info
      text="Для указания нескольких меток для одной пары логин-пароль используйте разделитель ';'"
    />
    <Table />
  </main>
</template>

<style scoped lang="scss">
main {
  gap: 16px;
  width: 900px;
  display: flex;
  flex-direction: column;
}
</style>
