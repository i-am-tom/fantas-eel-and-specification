const { True, False } = require('./Bool')
const assert = require('assert')

console.log('- Bool')

assert(1 == True.fold(1, 2), 'Folds a True')
assert(2 == False.fold(1, 2), 'Folds a False')

assert(True.not().fold(false, true), 'Negates a True')
assert(False.not().fold(true, false), 'Negates a False')

assert(True.and(True).fold(true, false), 'T&T')
assert(True.and(False).fold(false, true), 'T&F')
assert(False.and(True).fold(false, true), 'F&T')
assert(False.and(False).fold(false, true), 'F&F')

assert(True.or(True).fold(true, false), 'T|T')
assert(True.or(False).fold(true, false), 'T|F')
assert(False.or(True).fold(true, false), 'F|T')
assert(False.or(False).fold(false, true), 'F|F')

console.log('  - check!')
