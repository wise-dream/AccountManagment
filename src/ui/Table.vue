<script setup lang="ts">
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Select from "primevue/select";
import Button from "primevue/button";

import { useAccountsStore } from "@/stores/accounts";
import { Account, Tag } from "@/types/account";

const store = useAccountsStore();

const errors = ref<
  Record<string, Partial<Record<"login" | "password", boolean>>>
>({});

const tagsInput = ref<Record<string, string>>({});

const types = [
  { name: "LDAP", code: "LDAP" },
  { name: "Локальная", code: "Local" },
];

const accounts = computed(() => {
  store.accounts.forEach((acc) => {
    if (!(acc.id in tagsInput.value)) {
      tagsInput.value[acc.id] = acc.tags.map((t) => t.text).join(";");
    }
  });
  return store.accounts;
});

const remove = (id: string) => {
  store.removeAccount(id);
  delete errors.value[id];
  delete tagsInput.value[id];
};

const validateAndSave = (acc: Account) => {
  const e: Record<"login" | "password", boolean> = {
    login: false,
    password: false,
  };
  if (!acc.login?.trim() || acc.login.length > 100) e.login = true;
  if (
    acc.type === "Local" &&
    (!acc.password?.trim() || acc.password.length > 100)
  )
    e.password = true;

  errors.value[acc.id] = e;

  if (!e.login && !e.password) {
    const raw = tagsInput.value[acc.id] || "";
    const tagsArr: Tag[] = raw
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s)
      .map((text) => ({ text }));

    store.updateAccount({ ...acc, tags: tagsArr });
  }
};

const onBlur = (acc: Account) => {
  validateAndSave(acc);
};

const onSelect = (acc: Account, newType: "Local" | "LDAP") => {
  acc.type = newType;
  validateAndSave(acc);
};
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Метка</th>
          <th>Тип</th>
          <th>Логин</th>
          <th>Пароль</th>
          <th class="delete"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in accounts" :key="row.id">
          <td class="pr">
            <InputText
              v-model="tagsInput[row.id]"
              style="width: 100%"
              @blur="onBlur(row)"
              maxlength="50"
            />
          </td>
          <td class="pr">
            <Select
              v-model="row.type"
              :options="types"
              optionLabel="name"
              optionValue="code"
              @change="(val) => onSelect(row, val.value)"
              style="width: 100%"
            />
          </td>
          <td
            :colspan="row.type === 'LDAP' ? 2 : 1"
            :class="row.type === 'LDAP' ? '' : 'pr'"
          >
            <InputText
              v-model="row.login"
              :class="{ 'p-invalid': errors[row.id]?.login }"
              style="width: 100%"
              @blur="onBlur(row)"
              maxlength="100"
            />
          </td>
          <td v-if="row.type === 'Local'">
            <Password
              v-model="row.password"
              :inputClass="{ 'p-invalid': errors[row.id]?.password }"
              :feedback="false"
              toggleMask
              style="width: 100%"
              @update:modelValue="() => onBlur(row)"
              maxlength="100"
            />
          </td>
          <td>
            <Button
              icon="pi pi-trash"
              class="p-button-text p-button-danger"
              @click="remove(row.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.p-invalid {
  border-color: #f44336 !important;
}
.pr {
  padding-right: 8px;
}
table {
  border-collapse: collapse;
  thead {
    padding-bottom: 20px;
    th {
      width: 22.5%;
      text-align: left;
    }
    .delete {
      width: 10%;
    }
  }
  tbody:before {
    content: "";
    display: block;
    height: 12px;
  }
}
</style>
