const Sum = require('./Sum')
const test = require('tape')

test('Sum > concat', assert => {
  assert.same(Sum(2).concat(Sum(5)).val, 7, 'Sums')
  assert.same(Sum(2.5).concat(Sum(5.5)).val, 8, 'Sums floats')

  assert.end()
})
