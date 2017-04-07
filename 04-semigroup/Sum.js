const { tagged } = require('daggy')

const Sum = tagged('val')

Sum.prototype.concat = function (that) {
  return Sum(this.val + that.val)
}

module.exports = Sum
