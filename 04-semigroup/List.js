const List = require('../03-setoid/List')
const { Cons, Nil } = List

// Concatenate two lists.
// concat :: [a] ~> [a] -> [a]
List.prototype.concat = function (that) {
  return this.cata({
    // Recursion!
    Cons: (head, tail) => Cons(
      head, tail.concat(that)),

    Nil: () => that
  })
}

module.exports = List
