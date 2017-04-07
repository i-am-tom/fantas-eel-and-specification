const { tagged } = require('daggy')

const First = tagged('val')

First.prototype.concat = function (that) {
  return this
}

module.exports = First
