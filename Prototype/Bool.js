import { equals, lte } from 'fantasy-land'

/* Setoid Bool */ {
  Bool.prototype[equals] = function (that) {
    return this === that
  }
}

/* Ord Bool */ {
  Bool.prototype[lte] = function (that) {
    return this <= that
  }
}
