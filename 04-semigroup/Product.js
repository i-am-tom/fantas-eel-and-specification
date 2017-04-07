const { tagged } = require('daggy')

const Product = tagged('val')

Product.prototype.concat = function (that) {
  return Product(this.val * that.val)
}

module.exports = Product
