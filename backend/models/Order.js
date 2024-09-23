const Cart = require("./Cart");

class Order {
  constructor(cart) {
    if (!(cart instanceof Cart)) return;
    this.id = null;
    this.username = cart.username;
    this.totalCost = cart.totalCost;
    this.billingAddress = "";
    this.shippingAddress = "";
    this.contents = cart.contents;
    this.status = "Submitted";
  }
}

module.exports = Cart;
