const List = require('./List')
const test = require('tape')

const { Cons, Nil } = List

Number.prototype.equals = function (that) {
  return Number(this) === Number(that)
}

test('Constructor comparison', assert => {
  assert.ok(Nil.equals(Nil), 'Empty lists are equal')

  assert.notOk(Nil.equals(Cons(1, Nil)), 'Nil != Cons')
  assert.notOk(Cons(1, Nil).equals(Nil), 'Cons != Nil')

  assert.ok(
    Cons(1, Nil).equals(Cons(1, Nil)),
    '1-elems are equal if heads are equal.')

  assert.end()
})

test('Recursive equality', assert => {
  assert.ok(
    Cons(1, Cons(2, Cons(3, Cons(4, Nil)))).equals(
      Cons(1, Cons(2, Cons(3, Cons(4, Nil))))),
    'Tails are recursively checked.')

  assert.notOk(
    Cons(1, Cons(2, Cons(3, Cons(4, Nil)))).equals(
      Cons(1, Cons(2, Cons(3, Cons(5, Nil))))),
    'Tails are recursively checked.')

  assert.end()
})
