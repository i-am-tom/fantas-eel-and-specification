const Any = require('./Any')
const Sum = require('./Sum')
const Tuple = require('./Tuple')
const test = require('tape')

test('Tuple > concat', assert => {
  assert.same(
    Tuple(Sum(1), Any(false))
    .concat(Tuple(Sum(2), Any(true))),
    Tuple(Sum(3), Any(true)),
    'Concats nested semigroups')

  assert.end()
})
