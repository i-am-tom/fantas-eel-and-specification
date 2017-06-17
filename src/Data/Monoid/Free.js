import { taggedSum } from 'daggy'
import fl from 'fantasy-land'

//- Free allows us to build up a description of a monoidal computation
//- without actually doing it. In short, we use constructors to label
//- all the things we _could_ do with a monoid, and then we build our
//- type up like a tree. At the end, we can use a given monoid to
//- perform the fold and produce an eventual result!

//+ data Free a = Identity | Value a | Concat (Free a) (Free a)
const Free = taggedSum('Data.Monoid.Free', {
  Identity: [],
  Value: ['value']
  Concat: ['left', 'right']
})

const { Identity, Value, Concat } = Free

/* Setoid a => Setoid (Free a) */ {
  Free.prototype[fl.equals] = function (that) {
    return this.cata({
      Identity: () => that instanceof Identity,

      Value: x => that instanceof Value
        && x[fl.equals](that.x),

      Concat: (left, right) =>
        that instanceof Concat
          && left[fl.equals](that.left)
          && right[fl.equals](that.right)
    })
  }
}

/* Semigroup (Free a) */ {
  Free.prototype[fl.concat] = function (that) {
    return Concat(this, that)
  }
}

/* Monoid (Free a) */ {
  Free[fl.empty] = () => Free.Identity
}

/* Functor Free */ {
  Free.prototype[fl.map] = function (f) {
    return this.cata({
      Identity: () => this,
      Value: x => Value(f(x)),

      Concat: (left, right) => {
        const l = left[fl.map](f)
        const r = right[fl.map](f)

        return Concat(l, r)
      }
    })
  }
}

/* Apply Free */ {
  Free.prototype[fl.ap] = function (that) {
    return that[fl.chain](f => this[fl.map](f))
  }
}

/* Applicative Free */ {
  Free[fl.of] = Value
}

/* Foldable Free */ {
  Free.prototype[fl.reduce] = function (f, acc) {
    return this.cata({
      Identity: () => acc,
      Value: x => f(x, acc),
      Concat: (left, right) =>
        right[fl.reduce](f,
          left[fl.reduce](f, acc))
    })
  }
}

/* Traversable Free */ {
  Free.prototype[fl.traverse] = function (T, f) {
    return this.cata({
      Identity: () => T[fl.of](this),
      Value: x => f(x)[fl.map](Value),

      Concat: (left, right) =>
        lift2(Concat, left[fl.traverse](T, f)
                    , right[fl.traverse](T, f))
    })
  }
}

/* Chain Free */ {
  Free.prototype[fl.chain] = function (f) {
    return this.cata({
      Identity: () => this,
      Value: f,

      Concat: (left, right) => Concat(
        left[fl.chain](f), right[fl.chain](f))
    })
  }
}

/* Extend Free */ {
  Free.prototype[fl.extend] = function (f) {
    return this.cata({
      Identity: () => this,
      Value: _ => Value(f(this)),

      Concat: (left, right) => Concat(
        f(this),
        Concat(
          left[fl.extend](f),
          right[fl.extend](f)))
    })
  }
}

//- Interpret the free monoid structure.
//+ foldMap :: Monoid m => Free a
//+                     ~> TypeRep m
//+                     -> (a -> m) -> m
Free.prototype.foldMap = function (M, f) {
  return this.cata({
    Identity: M.empty,
    Value: f,

    Concat: (left, right) => {
      const l = left.foldMap(M, f)
      const r = right.foldMap(M, f)

      return l[fl.concat](r)
    }
  })
}

export default Free
