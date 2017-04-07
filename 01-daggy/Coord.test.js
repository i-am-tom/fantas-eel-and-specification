const Coord = require('./Coord')
const test = require('tape')

test('Coord > Properties set', assert => {
  assert.equals(Coord(1, null, null).x, 1, 'x coord is set')
  assert.equals(Coord(null, 2, null).y, 2, 'y coord is set')
  assert.equals(Coord(null, null, 3).z, 3, 'z coord is set')

  let { x: x1, y: y1, z: z1 } = Coord(4, 5, 6)
  assert.equals(x1, 4, 'x coord is set')
  assert.equals(y1, 5, 'y coord is set')
  assert.equals(z1, 6, 'z coord is set')

  let { x: x2, y: y2, z: z2 } = Coord.origin
  assert.equals(x2, 0, 'x coord is set')
  assert.equals(y2, 0, 'y coord is set')
  assert.equals(z2, 0, 'z coord is set')

  assert.end()
})

test('Coord > Translation', assert => {
  let { x: x3, y: y3, z: z3 } = Coord.origin.translate(7, 8, 9)
  assert.equals(x3, 7, 'x translation')
  assert.equals(y3, 8, 'y translation')
  assert.equals(z3, 9, 'z translation')

  let { x: x4, y: y4, z: z4 } = Coord(-1, 2, 4)
                                .translate(2, -3, 5)
  assert.equals(x4,  1, 'Arbitrary x translation')
  assert.equals(y4, -1, 'Arbitrary y translation')
  assert.equals(z4,  9, 'Arbitrary z translation')

  assert.end()
})

test('Coord > Distance calculations', assert => {
  assert.equals(Coord.origin.distance(Coord(1, 2, 2)), 3,
                'Distance calculated between two points')

  assert.equals(Coord(1, 2, 2).distance(Coord(2, 4, 4)), 3,
                'Distance calculated between two arbitrary points')

  assert.end()
})
