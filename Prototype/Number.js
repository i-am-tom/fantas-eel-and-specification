import { equals, lte } from 'fantasy-land'

/* Setoid Number */ {
  Number.prototype[equals] = function (that) {
    return this === that
  }
}

/* Ord Number */ {
  Number.prototype[lte] = function (that) {
    return this <= that
  }
}
