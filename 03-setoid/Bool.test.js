const Bool = require('./Bool')
const test = require('tape')

const { True, False } = Bool

test('Bool > equals', assert => {
  assert.ok(True.equals(True), 'TT')
  assert.ok(False.equals(False), 'FF')

  assert.notOk(True.equals(False), 'TF')
  assert.notOk(False.equals(True), 'FT')

  assert.end()
})
