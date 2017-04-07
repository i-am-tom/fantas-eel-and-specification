const List = require('./List')
const test = require('tape')

const { Cons, Nil } = List

test('List > concat', assert => {
  assert.same(Nil.concat(Nil), Nil, 'Nil <> Nil')
  assert.same(Cons(1, Nil).concat(Nil),
              Cons(1, Nil), 'Cons <> Nil')
  assert.same(Nil.concat(Cons(1, Nil)),
              Cons(1, Nil), 'Nil <> Cons')

  assert.same(Cons(1, Nil).concat(Cons(2, Nil)),
              Cons(1, Cons(2, Nil)), 'Cons <> Cons')

  assert.end()
})
