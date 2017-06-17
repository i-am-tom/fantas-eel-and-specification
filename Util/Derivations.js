//- This file provides all the derivations as specified in
//- the Fantasy Land spec. Import and patch as you wish.

import fl from 'fantasy-land'
import { compose, id } from './Prelude'

export const Ord = {
  [fl.equals]: function (that) {
    return this[fl.lte](that)
      && that[fl.lte](this)
  }
}

export const Applicative = {
  [fl.map]: function (f) {
    return this[fl.ap](
      this[fl.of](f)
    )
  }
}

export const Traversable = {
  [fl.map]: function (f) {
    return this.traverse(compose(Id)(f), Id)
               .value
  },

  [fl.reduce]: function (f, acc) {
    console.error('Implement correctly')
  }
}

export const Chain = {
  [fl.ap]: function (fs) {
    return fs[fl.chain](
      f => this[fl.map](f)
    )
  }
}

export const Monad = {
  [fl.map]: function (f) {
    return this[fl.chain](
      compose(this[fl.of])(f)
    )
  }
}

export const Bifunctor = {
  [fl.map]: function (f) {
    return this[fl.bimap](id, f)
  }
}

export const Profunctor = {
  [fl.map]: function (f) {
    return this[fl.promap](id, f)
  }
}
