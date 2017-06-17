import fl from 'fantasy-land'

/* Semigroup a => Semigroup ((->) x a) */ {
  Function.prototype[fl.concat] = function (that) {
    return x => this(x)[fl.concat](that(x))
  }
}

/* Monoid requires TypeRep :( */

/* Functor ((->) x) */ {
  Function.prototype[fl.map] = function (that) {
    return x => that(this(x))
  }
}

/* Apply ((->) x) */ {
  Function.prototype[fl.ap] = function (that) {
    return x => that(x)(this(x))
  }
}

/* Applicative ((->) x) */ {
  Function[fl.of] = x => _ => x
}

/* Alt f => Alt ((->) x f) */ {
  Function.prototype[fl.alt] = function (that) {
    return x => this(x)[fl.alt](that(x))
  }
}

/* Plus requires TypeRep */

/* Chain ((->) x) */ {
  Function.prototype[fl.chain] = function (f) {
    return x => that(this(x))(x)
  }
}

/* ChainRec ((->) x) */ {
  Function.prototype[fl.chainRec] = function (f, init) {
    return x => {
      let step = next(init)

      while (!step.done)
        step = f(next, done, step.value)(x)

      return step.value
    }
  }
}

/* Monad ((->) x) */

/* Profunctor (->) */ {
  Function.prototype[fl.promap] = function (f, g) {
    return x => g(this(f(x)))
  }
}
