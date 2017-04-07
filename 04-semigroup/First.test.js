const First = require('./First')
const test = require('tape')

test('First > concat', assert => {
  assert.same(First(1).concat(First(2)).val, 1,
    'Saves first')

  assert.end()
})
