const Any = require('./Any')
const test = require('tape')

test('Any > concat', assert => {
  assert.ok(Any(true).concat(Any(true)).val, 'TT')
  assert.ok(Any(false).concat(Any(true)).val, 'FT')
  assert.ok(Any(true).concat(Any(false)).val, 'TF')
  assert.notOk(Any(false).concat(Any(false)).val, 'FF')

  assert.end()
})
