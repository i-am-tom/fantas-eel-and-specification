const { taggedSum } = require('daggy')

// A tagged sum's constructors can also take arguments! In the post,
// I changed the coordinate system from 2D to 3D and forgot to
// update the names of the shapes. Leaving it there as a reminder of
// the importance of proofreading.
const Shape = taggedSum({
  // Cuboid :: (Coord, Coord) -> Shape
  Cuboid: ['topleft', 'bottomright'],

  // Sphere :: (Coord, Number) -> Shape
  Sphere: ['centre', 'radius']
})

Shape.prototype.translate = function (x, y, z) {
  return this.cata({
    Cuboid: (topleft, bottomright) =>
      Shape.Cuboid(
        topleft.translate(x, y, z),
        bottomright.translate(x, y, z)
      ),

    Sphere: (centre, radius) =>
      Shape.Sphere(
        centre.translate(x, y, z),
        radius
      )
  })
}

module.exports = Shape
