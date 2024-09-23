class Address {
  constructor({ userId, streetOne, streetTwo, city, state, zip }) {
    this.id = null;
    this.userId = userId;
    this.streetOne = streetOne;
    this.streetTwo = streetTwo;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }
}

module.exports = Address;
