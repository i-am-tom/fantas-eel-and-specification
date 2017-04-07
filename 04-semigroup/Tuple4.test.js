const Any     = require('./Any')
const Sum     = require('./Sum')
const Max     = require('./Max')
const Product = require('./Product')
const Tuple4  = require('./Tuple4')

const test = require('tape')

test('Tuple4 > concat', assert => {
  assert.same(
    Tuple4(Sum(1), Any(false), Max(10), Product(2)).concat(
      Tuple4(Sum(2), Any(true), Max(15), Product(5))),
    Tuple4(Sum(3), Any(true), Max(15), Product(10)),
    'Concats nested semigroups')

  assert.end()
})
