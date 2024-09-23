class User {
  id = null;
  username = "";
  firstName = "";
  lastName = "";
  dateCreated = null;
  role = "";
  addresses = [];

  constructor(username) {
    this.username = username;
  }

  getUserData() {
    fetch(`${API_URI}/${this.username}`)
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.role = user.role;
      })
      .catch((err) => console.error("Failed to fetch user data:", err));
  }
}

module.exports = User;
