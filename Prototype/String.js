import { concat, empty, equals, lte } from 'fantasy-land'

/* Setoid String */ {
  String.prototype[equals] = function (that) {
    return this === that
  }
}

/* Ord String */ {
  String.prototype[lte] = function (that) {
    return this <= that
  }
}

/* Semigroup String */ {
  String.prototype[concat] = function (that) {
    return this + that
  }
}

/* Monoid String */ {
  String[empty] = () => ''
}
