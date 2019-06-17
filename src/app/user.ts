export class User {
  id = '';
  name = '';
  password = '';

  constructor(id?: string, name?: string, password?: string) {
    if (id !== undefined) {
      this.id = id;
    }
    if (name !== undefined) {
      this.name = name;
    }
    if (password !== undefined) {
      this.password = password;
    }
  }
}