const Min = require('./Min')
const test = require('tape')

test('Min > concat', assert => {
  assert.same(Min(2).concat(Min(5)).val, 2, 'Min')
  assert.same(Min(2.5).concat(Min(5.5)).val, 2.5, 'Min floats')

  assert.end()
})
