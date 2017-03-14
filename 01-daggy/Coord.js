const { tagged } = require('daggy')
const { pow, sqrt } = Math

// Standard tagged Daggy instances are super simple. This
// makes Coord a constructor of three args, that are then
// used to populate the x / y / z keys on the object. Neat.
const Coord = tagged('x', 'y', 'z')

//- Translate a coordinate in 3D space by given amounts.
//+ translate :: (Int, Int, Int) -> Coord
Coord.prototype.translate = function (x, y, z) {
  return Coord(this.x + x, this.y + y, this.z + z)
}

//- Get the distance between two points.
//+ distance :: Coord -> Number
Coord.prototype.distance = function (that) {
  return sqrt(
    pow(that.x - this.x, 2) +
    pow(that.y - this.y, 2) +
    pow(that.z - this.z, 2)
  )
}

//- This might be convenient for something.
//+ origin :: Coord
Coord.origin = Coord(0, 0, 0)

// Export the whole thing!
module.exports = Coord

