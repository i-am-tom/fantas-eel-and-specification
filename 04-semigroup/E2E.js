const { tagged } = require('daggy')
const test = require('tape')

const First  = require('./First')
const Min    = require('./Min')
const Any    = require('./Any')
const Tuple4 = require('./Tuple4')

const Customer = tagged(
  'name',
  'favouriteThings',
  'registrationDate',
  'hasMadePurchase'
)

const myStrategy = {
  to: customer => Tuple4(
    First(customer.name),

    customer.favouriteThings,

    Min(customer.registrationDate),

    Any(customer.hasMadePurchase)
  ),

  from: ({ a, b, c, d }) =>
    Customer(a.val, b, c.val, d.val)
}

const merge = strategy => x => y =>
  strategy.from(
    strategy.to(x)
      .concat(strategy.to(y))
  )

const Tom1 = Customer('Tom', ['socks'], 100000, false)
const Tom2 = Customer('TomH', ['gloves'], 90000, true)

// { name: 'Tom'
// , favouriteThings: ['socks', 'gloves']
// , registrationDate: 90000
// , hasMadePurchase: true
// }
test('Semigroup - E2E', assert => {
  assert.same(
    merge(myStrategy)(Tom1)(Tom2),
    Customer('Tom', ['socks', 'gloves'], 90000, true),
    'The end-to-end example works')

  assert.end()
})
