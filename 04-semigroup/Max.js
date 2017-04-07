const { tagged } = require('daggy')

const Max = tagged('val')

Max.prototype.concat = function (that) {
  return Max(Math.max(this.val, that.val))
}

module.exports = Max
