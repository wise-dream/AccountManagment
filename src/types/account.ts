export interface Tag { text: string; }
export interface Account {
  id: string;
  tags: Tag[];
  type: 'LDAP' | 'Local';
  login: string;
  password: string | null;
}
