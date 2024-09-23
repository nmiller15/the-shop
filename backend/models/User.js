class User {
  constructor(username) {
    this.username = username;

    this.id = null;
    this.firstName = "";
    this.lastName = "";
    this.dateCreated = null;
    this.role = "";
    this.addresses = [];
  }
}

module.exports = User;
