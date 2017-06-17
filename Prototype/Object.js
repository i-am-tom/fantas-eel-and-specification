import fl from 'fantasy-land'

/* Setoid a => Setoid (StrMap a) */ {
  Object.prototype[fl.equals] = function (that) {
    // @TODO: check `sort` actually works.
    const ks  = Object.keys(this).sort()
    const ks_ = Object.keys(that).sort()

    return ks[fl.equals](ks_) && ks.every(
      k => this[k][fl.equals](that[k])
    )
  }
}

/* Semigroup (StrMap a) */ {
  // @TODO: is this too specialised to Last?
  Object.prototype[fl.concat] = function (that) {
    return Object.assign({}, this, that)
  }
}

/* Monoid (StrMap a) */ {
  Object.prototype[fl.empty] = () => ({})
}

/* Functor StrMap */ {
  Object.prototype[fl.map] = function (f) {
    const result = {}

    for (const index in this)
      result[index] = f(this[index])

    return result
  }
}

/* Foldable StrMap */ {
  Object.prototype[fl.reduce] = function (f, acc) {
    let result = acc

    for (const value of this)
      result = f(result, value)

    return result
  }
}
