const Coord = require('./Coord')
const assert = require('assert')

assert(Coord(1, null, null).x === 1, 'x coord is set')
assert(Coord(null, 2, null).y === 2, 'y coord is set')
assert(Coord(null, null, 3).z === 3, 'z coord is set')

let { x: x1, y: y1, z: z1 } = Coord(4, 5, 6)
assert(x1 === 4
    && y1 === 5
    && z1 === 6,
       'All coords are set')

let { x: x2, y: y2, z: z2 } = Coord.origin
assert(x2 === 0
    && y2 === 0
    && z2 === 0,
       'Origin is set')

let { x: x3, y: y3, z: z3 } = Coord.origin.translate(7, 8, 9)
assert(x3 === 7
    && y3 === 8
    && z3 === 9,
       'Translation from origin')

let { x: x4, y: y4, z: z4 } = Coord(-1, 2, 4).translate(2, -3, 5)
assert(x4 ===  1
    && y4 === -1
    && z4 ===  9,
       'Arbitrary translation')

assert(Coord.origin.distance(Coord(1, 2, 2)) === 3,
       'Distance calculated between two points')

assert(Coord(1, 2, 2).distance(Coord(2, 4, 4)) === 3,
       'Distance calculated between two arbitrary points')

// Export the whole thing!
module.exports = Coord

