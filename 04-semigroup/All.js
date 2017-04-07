const { tagged } = require('daggy')

const All = tagged('val')

All.prototype.concat = function (that) {
  return All(this.val && that.val)
}

module.exports = All
