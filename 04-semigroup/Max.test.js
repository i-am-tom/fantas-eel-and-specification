const Max = require('./Max')
const test = require('tape')

test('Max > concat', assert => {
  assert.same(Max(2).concat(Max(5)).val, 5, 'Max')
  assert.same(Max(2.5).concat(Max(5.5)).val, 5.5, 'Max floats')

  assert.end()
})
