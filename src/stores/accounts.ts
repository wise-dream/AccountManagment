import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import { Account, Tag } from '@/types/account';

export const useAccountsStore = defineStore('accounts', () => {
  // Load and normalize stored accounts, ensuring tags is array of Tag
  const raw = JSON.parse(localStorage.getItem('accounts') || '[]');
  const accounts = ref<Account[]>(
    raw.map((a: any) => ({
      ...a,
      tags: Array.isArray(a.tags)
        ? a.tags
        : (typeof a.tags === 'string'
            ? a.tags.split(';').map((s: string) => ({ text: s.trim() })).filter((t: any) => t.text)
            : []),
    }))
  );

  const persist = () => localStorage.setItem('accounts', JSON.stringify(accounts.value));

  const addAccount = () => {
    accounts.value.push({ id: uuidv4(), tags: [], type: 'LDAP', login: '', password: null });
    persist();
  };

  const updateAccount = (acc: Account) => {
    const i = accounts.value.findIndex(a => a.id === acc.id);
    if (i === -1) return;

    const normalizedPassword = acc.type === 'LDAP' ? null : (acc.password?.trim() ? acc.password : null);

    accounts.value[i] = {
      ...acc,
      password: normalizedPassword,
      tags: acc.tags,
    };
    persist();
  };

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter(a => a.id !== id);
    persist();
  };

  return { accounts, addAccount, updateAccount, removeAccount };
});