const Product = require("./Product");
class ProductImage {
  constructor(product, path, sequence) {
    if (!(product instanceof Product)) return;

    this.id = null;
    this.productId = product.id;
    this.sequence = sequence;
    this.path = path;
  }
}

module.exports = Product;
