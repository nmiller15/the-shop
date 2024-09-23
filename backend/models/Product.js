class Product {
  id = null;
  name = "";
  description = "";
  category = "";
  rating = null;
  price = null;
  active = false;
  images = [];

  constructor(name) {
    this.name = name;
  }
}

module.exports = Product;
