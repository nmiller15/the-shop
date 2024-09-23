class Product {
  constructor(name) {
    this.name = name;

    this.id = null;
    this.description = "";
    this.category = "";
    this.rating = null;
    this.price = null;
    this.active = false;
    this.images = [];
  }
}

module.exports = Product;
