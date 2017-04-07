const { tagged } = require('daggy')

const Any = tagged('val')

Any.prototype.concat = function (that) {
  return Any(this.val || that.val)
}

module.exports = Any
