import { taggedSum } from 'daggy'
import fl from 'fantasy-land'
import { eq, lte } from '../Prelude'

//- The `Either` type usually gets treated very similarly to `Maybe`,
//- with one notable difference: while `Just` becomes `Right`, the
//- `Nothing` constructor becomes `Left` and now takes a value! This
//- allows us to write functions like `Int -> Either String Int`,
//- which is to say, "This function takes an `Int`, and returns Either
//- an `Int` when successful, or a `String` when unsuccessful", where
//- the string usually contains some error message. With this, we can
//- totally model the behaviour of exceptions in a pure and total way.

const Either = taggedSum('Data.Either', {
  Left: ['left'],
  Right: ['right']
})

const { Left, Right } = Either

/* (Setoid e, Setoid a) => Setoid (Either e a) */ {
  Either.prototype[fl.equals] = function (that) {
    return this.cata({
      Right: x => that.cata({
        Right: eq(x),
        Left: _ => false
      }),

      Left: x => that.cata({
        Right: _ => false,
        Left: eq(x)
      })
    })
  }
}

/* (Ord e, Ord a) => Ord (Either e a) */ {
  Either.prototype[fl.lte] = function (that) {
    return this.cata({
      Right: x => that.cata({
        Right: lte(x),
        Left: _ => false
      }),

      Left: x => that.cata({
        Right: _ => true,
        Left: lte(x)
      })
    })
  }
}

/* Semigroup a => Semigroup (Either e a) */ {
  Either.prototype[fl.concat] = function (that) {
    return this.cata({
      Right: x => that.cata({
        Right: y => Right(x[fl.concat](y)),
        Left: _ => this
      }),

      Left: _ => that
    })
  }
}

/* Functor (Either e) */ {
  Either.prototype[fl.map] = function (f) {
    return this.cata({
      Right: x => Right(f(x)),
      Left: () => this
    })
  }
}

/* Apply (Either e) */ {
  Either.prototype[fl.ap] = function (that) {
    return this.cata({
      Right: x => that.cata({
        Right: f => Right(f(x)),
        Left: _ => that
      }),

      Left: _ => that
    })
  }
}

/* Applicative (Either e) */ {
  Either[fl.of] = Right
}

/* Alt (Either e) */ {
  Either.prototype[fl.alt] = function (that) {
    return this.cata({
      Right: _ => this,
      Left: _ => that
    })
  }
}

/* Foldable (Either e) */ {
  Either.prototype[fl.reduce] = function (f, acc) {
    return this.cata({
      Right: x => f(acc, x),
      Left: _ => acc
    })
  }
}

/* Traversable (Either e) */ {
  Either.prototype[fl.traverse] = function (T, f) {
    return this.cata({
      Right: x => f(x)[fl.map](Right),
      Left: _ => T.of(this)
    })
  }
}

/* Chain (Either e) */ {
  Either.prototype[fl.chain] = function (f) {
    return this.cata({
      Right: f,
      Left: _ => this
    })
  }
}

/* Trainwreck (Either e) */ {
  Either.prototype.trainwreck = function (f) {
    let acc = Loop(Right(init))

    do {
      acc.loop instanceof Left
        ? (acc = Done(acc.loop))
        : (acc = f(acc.loop.right))
    } while (acc instanceof Loop)

    return acc.result
  }
}

/* ChainRec (Either e) */ {
  Either.prototype[fl.chainRec] = function (f) {
    let acc = Loop(Right(init))

    do {
      acc.loop instanceof Left
        ? (acc = Done(acc.loop))
        : (acc = f(Done, Loop, acc.loop.right))
    } while (acc instanceof Loop)

    return acc.result
  }
}

/* Monad (Either e) */

/* Extend (Either e) */ {
  Either.prototype[fl.extend] = function (f) {
    return this.cata({
      Right: _ => Right(f(this)),
      Left: _ => this
    })
  }
}

/* Bifunctor Either */ {
  Either.prototype[fl.bimap] = function (f, g) {
    return this.cata({ Right: g, Left: f })
  }
}

export default Either
