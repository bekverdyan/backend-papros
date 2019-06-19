import { User } from "./user";

export class Users {
  /**
   * authenticate
   */
  public authenticate(username: string, password: string): User {
    return this.user.filter((element, index, array) => {
        return (element.name === username && element.password === password);
    })[0];
  }

  /**
   * find user by ID
   */
  public findById(id: string): User[] {
    return this.user.filter((element, index, array) => {
      return (element.id === id);
    })
  }

  public findByEmail(email: string): User[] {
    return this.user.filter((element, index, array) => {
      return (element.name === email);
    })
  }

  /**
   * listUsers
   */
  public listUsers(): User[] {
    return this.user;
  }

  private user = new Array<User>(
    new User(),
    new User('3646qe'),
    new User('574707', 'nemo@xunk.ru', 'asd'),
    new User('34bg98', 'gago@xunk.ru', 'asd'),
    new User('d4r9j4', 'popok@xunk.ru', 'asd'),
    new User('0okm7y', 'krolik@xunk.ru', 'asd'),
    new User('e3dr8u', 'zubik@xunk.ru', 'asd'),
    new User('z2d04h', 'savok@xunk.ru', 'asd'),
    new User('fg7yr9', 'harthuk@xunk.ru', 'asd')
  );
}