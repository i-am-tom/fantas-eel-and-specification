const Shape = require('./Shape')
const Coord = require('./Coord')
const test = require('tape')

const { Cuboid, Sphere } = Shape

test('nested cuboid properties', assert => {
  const test = Cuboid(
    Coord(1, 2, 3),
    Coord(4, 5, 6))

  assert.equal(test.topleft.x, 1,
               'Access nested props')

  assert.equal(test.bottomright.z, 6,
               'Access nested props')

  assert.end()
})

test('nested sphere properties', assert => {
  const test = Sphere(Coord(9, 7, 5), 10)

  assert.equal(test.centre.y, 7,
               'Access nested props')

  assert.equal(test.radius, 10,
               'Access nested props')

  assert.end()
})

test('translate cuboid', assert => {
  const test = Cuboid(Coord(1, 2, 3),
                      Coord(4, 5, 6))
               .translate(10, 20, 30)

  assert.equal(test.topleft.x, 11,
               'Access nested props')

  assert.equal(test.bottomright.z, 36,
               'Access nested props')

  assert.end()
})
