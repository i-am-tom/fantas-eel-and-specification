const { tagged } = require('daggy')

const Tuple4 = tagged('a', 'b', 'c', 'd')

// concat :: (Semigroup a, Semigroup b) =>
//   Tuple4 a b c d ~> Tuple4 a b c d
//                  -> Tuple4 a b c d
Tuple4.prototype.concat = function (that) {
  return Tuple4(this.a.concat(that.a),
               this.b.concat(that.b),
               this.c.concat(that.c),
               this.d.concat(that.d))
}

module.exports = Tuple4
