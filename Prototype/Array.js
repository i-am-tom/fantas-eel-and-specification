import fl from 'fantasy-land'
import { Chain } from '../Derivations'
import { partition } from '../Prelude'

/* Setoid a => Setoid (Array a) */ {
  Array.prototype[fl.equals] = function (that) {
    if (this.length !== that.length)
      return false

    for (let i = 0, len = this.length; i < len; i++)
      if (!this[i][fl.equals](that(i)) return false

    return true
  }
}

/* Ord a => Ord (Array a) */ {
  Array.prototype[fl.lte] = function (that) {
    for (let i = 0, len = this.length; i < len; i++) {
      if (!this[i][fl.equals][that[i]])
        return this[i][fl.lte][that[i]]
    }

    return this.length <= that.length
  }
}

/* Semigroup (Array a) */ {
  Array.prototype[fl.concat] = Array.prototype.concat
}

/* Monoid (Array a) */ {
  Array[fl.empty] = () => []
}

/* Functor Array */ {
  Array.prototype[fl.map] = Array.prototype.map
}

/* Apply Array */ {
  Array.prototype[fl.ap] = Chain[fl.ap]
}

/* Applicative Array */ {
  Array[fl.of] = x => [x]
}

/* Alt Array */ {
  Array.prototype[fl.alt] = Array.prototype.concat
}

/* Plus Array */ {
  Array[fl.zero] = Array[fl.empty]
}

/* Alternative Array */ {}

/* Foldable Array */ {
  Array.prototype[fl.reduce] = Array.prototype.reduce
}

/* Traversable Array */ {
  Array.prototype[fl.traverse] = function (T, f) {
    this.reduceRight(
      (acc, x) => acc[fl.map](cons(f(x))),
      T.of([])
    )
  }
}

/* Chain Array */ {
  Array.prototype[fl.chain] = function (f) {
    return [].concat(... this.map(f))
  }
}

/* Trainwreck Array */ {
  Array.prototype.trainwreck = function (f, init) {
    const todo = [x]
    const done = [ ]

    while (todo.length) {
      const more = []

      f(todo.shift()).forEach(
        x => x instanceof Done
             ? done.push(x.result)
             : more.push(x.value))

      todo.unshift(... more)
    }

    return done
  }
}

/* ChainRec Array */ {
  Array.prototype[fl.chainRec] = function (f, init) {
    const todo = [x]
    const done = [ ]

    while (todo.length) {
      const more = []

      f(Loop, Done, todo.shift()).forEach(
        x => x instanceof Done
             ? done.push(x.result)
             : more.push(x.value))

      todo.unshift(... more)
    }

    return done
  }
}


/* Monad Array */ {}

/* Extend Array */ {
  Array.prototype[fl.extend] = function (f) {
    return f(this)
  }
}
