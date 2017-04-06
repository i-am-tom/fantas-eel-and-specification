const Coord = require('../01-daggy/Coord')

//- Test whether a coordinate equal another.
//+ translate :: Coord -> Coord -> Boolean
Coord.prototype.equals = function (that) {
  return this.x === that.x
      && this.y === that.y
      && this.z === that.z
}

module.exports = Coord
