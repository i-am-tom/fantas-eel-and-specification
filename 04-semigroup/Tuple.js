const { tagged } = require('daggy')

const Tuple = tagged('a', 'b')

// concat :: (Semigroup a, Semigroup b) =>
//   Tuple a b ~> Tuple a b -> Tuple a b
Tuple.prototype.concat = function (that) {
  return Tuple(this.a.concat(that.a),
              this.b.concat(that.b))
}

module.exports = Tuple
