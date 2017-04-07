const { tagged } = require('daggy')

const Last = tagged('val')

Last.prototype.concat = function (that) {
  return that
}

module.exports = Last
