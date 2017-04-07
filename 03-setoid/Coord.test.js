const Coord = require('./Coord')
const test = require('tape')

test('Coord > equals', assert => {
  assert.notOk(
    Coord(1, 2, 3).equals(Coord(3, 2, 1)),
    'Differing coordinates shouldn\'t be equivalent.')

  assert.ok(
    Coord(1, 2, 3).equals(Coord(1, 2, 3)),
    'Accepts matching quotes')

  assert.end()
})
