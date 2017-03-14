const { taggedSum } = require('daggy')

// Defining a boolean type with Daggy is very simple. We
// want two constructors - True and False - to represent
// the two possible forms of our Bool type, and neither of
// them take any arguments. This is how we express that:
const Bool = taggedSum({ True: [], False: [] })

// Next, we can add a bunch of useful prototype methods!
const { True, False } = Bool

//- Return one value or the other depending on the bool.
//+ fold :: Bool ~> (a, a) -> a
Bool.prototype.fold = function (t, f) {
  return this.cata({ True: () => t, False: () => f })
}

//- Negate a boolean value.
//+ not :: Bool ~> Bool
Bool.prototype.not = function () {
  return this.fold(False, True)
}

//- Conjunctive union.
//+ and :: Bool ~> Bool -> Bool
Bool.prototype.and = function (that) {
  return this.fold(that.fold(True, False), False)
}

//- Disjunctive union.
//+ or :: Bool ~> Bool -> Bool
Bool.prototype.or = function (that) {
  // or: this.not().and(that.not()).not()
  return this.fold(True, that.fold(True, False))
}

// Finally, we can just export the whole type. The user can
// require it with destructuring to get out True and False.
module.exports = Bool
