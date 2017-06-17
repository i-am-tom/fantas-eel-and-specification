import { tagged } from 'daggy'
import fl from 'fantasy-land'

import { Done, Loop } = require('./Step')

//- Identity is a strange type. At first glance, it looks a bit...
//- well, useless. In fact, that feeling doesn't go away. All it does
//- is pass the operations down onto the values contained within.
//- However, this is exactly what makes it useful. For example, using
//- Identity#chainRec allows you to rewrite recursive business logic
//- as totally stack-safe without any major changes. It also provides
//- a "fluent interface" to your values in the form of `map`, so you
//- can show (declaratively) the steps of your algorithm.

const Identity = tagged('value')

/* Setoid a => Setoid (Identity a) */ {
  Identity.prototype[fl.equals] = function (that) {
    return this.value[fl.equals](that.value)
  }
}

/* Ord a => Ord (Identity a) */ {
  Identity.prototype[fl.lte] = function (that) {
    return this.value[fl.lte](that.value)
  }
}

/* Semigroup a => Semigroup (Identity a) */ {
  Identity.prototype[fl.concat] = function (that) {
    return Identity(this.value[fl.concat](that.value))
  }
}

/* Monoid would require TypeRep */

/* Functor Identity */ {
  Identity.prototype[fl.map] = function (f) {
    return Identity(f(this.value))
  }
}

/* Apply Identity */ {
  Identity.prototype[fl.ap] = function (that) {
    return Identity(this.value(that.value))
  }
}

/* Applicative Identity */ {
  Identity[fl.of] = Identity
}

/* Alt f => Alt (Identity f) */ {
  Identity.prototype[fl.alt] = function (that) {
    return Identity(this.value[fl.alt](that.value))
  }
}

/* Plus would require TypeRep */

/* Foldable Identity */ {
  Identity.prototype[fl.reduce] = function (f, acc) {
    return f(acc, this.value) // Nothing too exciting
  }
}

/* Traversable Identity */ {
  Identity.prototype[fl.traverse] = function (T, f) {
    return f(this.value)[fl.map](Identity)
  }
}

/* Chain Identity */ {
  Identity.prototype[fl.chain] = function (f) {
    return f(this.value)
  }
}

/* Trainwreck Identity */ {
  Identity.trainwreck = function (f, init) {
    let acc = Loop(init)

    do acc = f(acc.loop.value)
      while (acc instanceof Loop)

    return acc.done
  }
}

/* ChainRec Identity */ {
  Identity[fl.chainRec] = function (f, init) {
    let acc = Loop(Identity(init))

    do acc = f(Done, Loop, acc.loop.value)
      while (acc instanceof Loop)

    return acc.done
  }
}

/* Monad Identity */

/* Extend Identity */ {
  Identity.prototype[fl.extend] = function (f) {
    return Identity(f(this))
  }
}

/* Comonad Identity */ {
  Identity.prototype[fl.extract] = function () {
    return this.value
  }
}

export default Identity
