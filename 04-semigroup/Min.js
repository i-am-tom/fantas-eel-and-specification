const { tagged } = require('daggy')

const Min = tagged('val')

Min.prototype.concat = function (that) {
  return Min(Math.min(this.val, that.val))
}

module.exports = Min
