const Product = require('./Product')
const test = require('tape')

test('Product > concat', assert => {
  assert.same(
    Product(2).concat(Product(5)).val,
    10, 'Multiplies')

  assert.same(
    Product(2.5).concat(Product(5.5)).val,
    13.75, 'Multiplies floats')

  assert.end()
})
