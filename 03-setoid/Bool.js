const Bool = require('../01-daggy/Bool')

//- Test whether two booleans match.
//+ translate :: Bool -> Bool -> Boolean
Bool.prototype.equals = function (that) {
  return this.cata({
    True: () => that.fold(true, false),
    False: () => that.fold(false, true)
  })
}

module.exports = Bool
