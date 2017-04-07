const List = require('../01-daggy/List')

const { Cons, Nil } = List

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

// Reverse a list!
// reverse :: [a] ~> [a]
List.prototype.reverse = function () {
  return this.foldl(
    (acc, x) => Cons(x, acc),
    Nil)
}

// Is this list a Palindrome?
// isPalindrome :: Setoid a => [a] ~> [a] -> Boolean
List.prototype.isPalindrome = function () {
  return this.equals(this.reverse())
}

module.exports = List
