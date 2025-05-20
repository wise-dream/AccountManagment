<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";

const mock: Account[] = [];
</script>

<template>
  <DataTable :value="mock" tableStyle="min-width: 50rem">
    <Column field="code" header="Метки"></Column>
    <Column field="name" header="Тип записи"></Column>
    <Column field="category" header="Логин"></Column>
    <Column field="quantity" header="Пароль"></Column>
  </DataTable>
</template>

<style scoped lang="scss"></style>
