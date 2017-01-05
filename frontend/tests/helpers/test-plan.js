import { expect as _expect } from 'chai'

// inspired by
// https://github.com/mochajs/mocha/wiki/Assertion-counting

let expected = 0
let actual = 0

function expect() {
  actual++
  return _expect(...arguments)
}

function plan(n) {
  expected = n
}

function reset() {
  expected = 0
  actual = 0
}

function check() {
  if (!expected || expected === actual) {
    return
  }

  let err = new Error(`expected ${expected} assertions, got ${actual}`)
  throw err
}

export default {
  expect, plan, reset, check
}
