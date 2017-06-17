import { tagged } from 'daggy'
import fl from 'fantasy-land'
import FM from './Monoid/Free'

//- The Const functor preserves a value on the left-hand side while
//- effectively doing nothing with any `map` calls. This means that
//- we have a functor that "does nothing", which can be useful for
//- modelling structures in coproducts. Furthermore, the Apply and
//- Applicative instances can be used to combine left-hand values,
//- which makes Const simply a way to lift a monoid to context-level.

//+ data Const a b = Const a
const Const = tagged('value')

/* Functor Const */ {
  Const.prototype[fl.map] = function (f) {
    return this
  }
}

/* Apply (Const Free) */ {
  Const.prototoype[fl.ap] = function (that) {
    return Const(FM[fl.concat](that, this))
  }
}

/* Applicative (Const Free) */ {
  Const[fl.of] = () => Const(FM[fl.empty]())
}

/* Foldable (Const a) */ {
  Const.prototype[fl.reduce] = (_, acc) = acc
}

/* Bifoldable Const */ {
  Const.prototype[fl.bimap] = function (f, g) {
    return Const(f(this.value))
  }
}

export default Const
