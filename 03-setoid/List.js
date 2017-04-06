const List = require('../01-daggy/List')

// Check the lists' heads, then their tails
// equals :: Setoid a => [a] ~> [a] -> Bool
List.prototype.equals = function (that) {
  return this.cata({
    Cons: (head, tail) =>
      head.equals(that.head)
        && tail.equals(that.tail),

    Nil: () => that.cata({
      Cons: () => false,
      Nil: () => true
    })
  })
}

module.exports = List
