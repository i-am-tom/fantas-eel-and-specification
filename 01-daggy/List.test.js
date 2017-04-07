const List = require('./List')
const test = require('tape')

const { Cons, Nil } = List

test('List > head', assert => {
  assert.equal(Cons(42, Nil).head, 42,
               'Gets the list head')

  assert.end()
})

test('List > Tail', assert => {
  assert.equal(Cons(42, Nil).tail, Nil,
               'Gets empty tail')

  assert.same(
    Cons(42, Cons(31, Nil)).tail,
    Cons(31, Nil),
    'Gets non-empty tail')

  assert.end()
})

test('List > foldl', assert => {
  assert.equal(
    Nil.foldl((acc, _) => acc, 14), 14,
    'Folds an empty list from the left')

  assert.equal(
    Cons(1, Cons(3, Cons(5, Nil)))
    .foldl((x, y) => x + y, 0), 9,
    'Left folds a non-empty list')

  assert.equal(
    Cons(4, Cons(3, Cons(2, Nil)))
    .foldl((x, y) => x - y, 10), 1,
    'Reduces from the left')

  assert.end()
})

test('List > foldr', assert => {
  assert.equal(
    Nil.foldr((_, acc) => acc, 14), 14,
    'Folds an empty list from the right')

  assert.equal(
    Cons(1, Cons(3, Cons(5, Nil)))
      .foldr((x, y) => x + y, 0), 9,
    'Right folds a non-empty list')

  assert.equal(
    Cons(4, Cons(3, Cons(2, Nil)))
      .foldr((x, y) => x - y, 10), -7,
    'Reduces from the right')

  assert.end()
})

test('List > map', assert => {
  assert.same(
    Nil.map(x => x + 2), Nil,
    'Maps over empty list')

  assert.same(
    Cons(2, Cons(3, Nil))
      .map(x => x + 1),
    Cons(3, Cons(4, Nil)),
    'Maps over non-empty list')

  assert.end()
})

test('List > filter', assert => {
  assert.same(
    Cons(1, Cons(2, Cons(3, Nil))).filter(x => x === 2),
    Cons(2, Nil), 'Filters a Cons list')

  assert.same(Nil.filter(x => x === 1), Nil, 'Filters Nil')

  assert.end()
})

test('List > toArray/fromArray', assert => {
  assert.deepEqual(
    Cons(2, Cons(3, Nil)).toArray(),
    [2, 3],
    'Converts to an array')

  assert.deepEqual(
    List.fromArray([10, 20, 30]),
    Cons(10, Cons(20, Cons(30, Nil))),
    'Generates from an array')

  assert.end()
})
