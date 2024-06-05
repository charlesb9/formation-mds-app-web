class User {
  constructor(id,  email, firstname, lastname, password, role) {
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.role = role;
  }

  get id() {
    return this.id;
  }

  set id(id) {
    this.id = id;
  }


  get email() {
    return this.email;
  }

  set email(email) {
    this.email = email;
  }

  get firstname() {
    return this.firstname;
  }

  set firstname(firstname) {
    this.firstname = firstname;
  }

  get lastname() {
    return this.lastname;
  }

  set lastname(lastname) {
    this.lastname = lastname;
  }

  get password() {
    return this.password;
  }

  set password(password) {
    this.password = password;
  }

  get role() {
    return this.role;
  }

  set role(role) {
    this.role = role;
  }

  //fromMap
  static fromMap(map) {
    return new User(map.id, map.email, map.firstname, map.lastname, map.password, map.role);
  }

  //toMap
  toMap() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      password : this.password,
      role: this.role

    };
  }
}

export default User;

