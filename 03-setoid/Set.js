const { tagged } = require('daggy')

const Set = tagged('elements')

// Check whether two elements be equal (via Setoid instance).
// eq :: Setoid a => a -> a -> Boolean
const eq = x => y => x.equals(y)

// Add an element to the set if it's not already there!
// add :: Setoid a => Set a ~> a -> Set a
Set.prototype.add = function (x) {
  return this.elements.some(eq(x))
    ? this
    : new Set(this.elements
                  .concat([x]))
}

// Remove an element from a set.
// remove :: Setoid a => Set a ~> a -> Set a
Set.prototype.remove = function (x) {
  const index = this.elements.findIndex(eq(x))

  return index === -1
    ? this
    : new Set(this.elements
                  .slice(0, index)
                  .concat(
                    this.elements
                        .slice(index + 1)))
}

module.exports = Set
