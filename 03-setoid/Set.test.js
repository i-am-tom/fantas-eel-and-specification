const Set = require('./Set')
const test = require('tape')

Number.prototype.equals = function (that) {
  return Number(this) === Number(that)
}

test('Set > Constructor comparison', assert => {
  assert.same(Set([]).elements, [], 'Empty sets make empty lists')

  assert.same(Set([]).add(1).elements, [1], 'Single-element sets')
  assert.same(Set([]).add(1).add(1).elements, [1], 'Idempotence')

  assert.same(Set([]).add(1).remove(1).elements, [], 'Removal')
  assert.same(Set([]).remove(1).remove(1).elements, [],
              'Removal idempotence')

  assert.end()
})
