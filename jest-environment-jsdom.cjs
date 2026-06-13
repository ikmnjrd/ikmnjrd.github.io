'use strict'

// There is for TextEncoder Support in JSDOM on test environment.
// reference to: https://github.com/jsdom/jsdom/issues/2524#issuecomment-1480930523
const { TextEncoder, TextDecoder } = require('util')
const {
  default: $JSDOMEnvironment,
  TestEnvironment,
} = require('jest-environment-jsdom')

Object.defineProperty(exports, '__esModule', {
  value: true,
})

class JSDOMEnvironment extends $JSDOMEnvironment {
  constructor(...args) {
    const { global } = super(...args)
    if (!global.TextEncoder) global.TextEncoder = TextEncoder
    if (!global.TextDecoder) global.TextDecoder = TextDecoder
    if (!global.Uint8Array) global.Uint8Array = Uint8Array
    // jsdom has no fetch; provide a no-network stub so client effects that
    // fetch on mount (e.g. the search index) resolve via their .catch handlers.
    if (!global.fetch) {
      global.fetch = () =>
        Promise.reject(new Error('fetch is disabled in tests'))
    }
  }
}

exports.default = JSDOMEnvironment
exports.TestEnvironment =
  TestEnvironment === $JSDOMEnvironment
    ? JSDOMEnvironment
    : TestEnvironment
