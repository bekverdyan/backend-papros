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

  /**
   * listUsers
   */
  public listUsers(): User[] {
    return this.user;
  }

  private user = new Array<User>(
    new User(),
    new User('3646qelverc'),
    new User('574707', 'nemo', 'asd'),
    new User('34bg98', 'gago', 'asd'),
    new User('d4r9j4', 'popok', 'asd'),
    new User('0okm7y', 'krolik', 'asd'),
    new User('e3dr8u', 'zubik', 'asd'),
    new User('z2d04h', 'savok', 'asd'),
    new User('fg7yr9', 'harthuk', 'asd')
  );
}