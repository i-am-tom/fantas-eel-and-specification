const All = require('./All')
const test = require('tape')

test('All > concat', assert => {
  assert.ok(All(true).concat(All(true)).val, 'TT')
  assert.notOk(All(false).concat(All(true)).val, 'FT')
  assert.notOk(All(true).concat(All(false)).val, 'TF')
  assert.notOk(All(false).concat(All(false)).val, 'FF')

  assert.end()
})
