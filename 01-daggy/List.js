const { taggedSum } = require('daggy')

const List = taggedSum({
  Cons: ['head', 'tail'],
  Nil:  []
})

const { Cons, Nil } = List

//- For quite a few of these signatures, you'll see a ? to
//- indicate something that _could_ be null. For those
//- situations, we'd ideally want to use a Maybe type. We
//- will cover them later in the series, but for now, you
//- can get some information about them in another post:
//- http://www.tomharding.me/2016/12/31/yippee-ki-yay-other-functors/

//- Fold up a list into a value! This is pretty much the
//- same as everyone's favourite list method, reduceRight.
//+ foldr :: [a] ~> (a -> b -> b, b) -> b
List.prototype.foldr = function (f, acc) {
  return this.cata({
    Cons: (head, tail) => f(head, tail.foldr(f, acc)),
    Nil:  () => acc
  })
}

//- Fold up a list using the standard `reduce` approach.
//+ foldl :: [a] ~> (b -> a -> b, b) -> b
List.prototype.foldl = function (f, acc) {
  return this.cata({
    Cons: (head, tail) => tail.foldl(f, f(acc, head)),
    Nil:  () => acc
  })
}

//- Transform every value in a list with a given function.
//+ map :: [a] ~> (a -> b) -> [b]
List.prototype.map = function (f) {
  return this.cata({
    Cons: (head, tail) => Cons(f(head), tail.map(f)),
    Nil:  () => Nil
  })
}

//- Filter out values that fail the predicate.
//+ filter :: [a] ~> (a -> Boolean) -> [a]
List.prototype.filter = function (predicate) {
  return this.cata({
    Cons: (head, tail) => predicate(head)
                          ? Cons(head, tail.filter(predicate))
                          : tail.filter(predicate),
    Nil: () => Nil
  })
}

//- Convert a list into an array.
//+ toArray :: [a] ~> Array a
List.prototype.toArray = function () {
  return this.foldr((x, acc) => [x, ... acc], [])
}

//- Create a list from an array.
//+ fromArray :: Array a -> [a]
List.fromArray = function (xs) {
  return xs.reduceRight(
    (acc, x) => Cons(x, acc),
    Nil
  )
}

module.exports = List
