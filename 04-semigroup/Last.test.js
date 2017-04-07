const Last = require('./Last')
const test = require('tape')

test('Last > concat', assert => {
  assert.same(Last(1).concat(Last(2)).val, 2,
    'Saves last')

  assert.end()
})
