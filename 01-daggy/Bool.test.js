const { True, False } = require('./Bool')
const test = require('tape')

test('fold', assert => {
  assert.equals(True.fold(1, 2), 1,
                'Folds a True')

  assert.equals(False.fold(1, 2), 2,
                'Folds a False')

  assert.end()
})

test('not', assert => {
  assert.ok(True.not()
                .fold(false, true),
            'Negates a True')

  assert.ok(False.not()
                 .fold(true, false),
            'Negates a False')

  assert.end()
})

test('&& Truth Table', assert => {
  assert.ok(True.and(True)
                .fold(true, false),
            'T&T')

  assert.ok(True.and(False)
                .fold(false, true),
            'T&F')

  assert.ok(False.and(True)
                 .fold(false, true),
            'F&T')

  assert.ok(False.and(False)
                 .fold(false, true),
            'F&F')

  assert.end()
})

test('|| Truth Table', assert => {
  assert.ok(True.or(True)
                .fold(true, false),
            'T|T')

  assert.ok(True.or(False)
                .fold(true, false),
            'T|F')

  assert.ok(False.or(True)
                 .fold(true, false),
            'F|T')

  assert.ok(False.or(False)
                 .fold(false, true),
            'F|F')

  assert.end()
})
