/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

const test          = require('tape')
const eventLoopInfo = require('./')

function getType (t) {
  return Object.prototype.toString.call(t)
}

test('eventloop-info test', function (assert) {

  setTimeout(() => {
    assert.comment('`blocking the event loop`')
    for (let i = 0; i < 1e9; i++) {}
  }, 500)

  eventLoopInfo((err, delayInMs, addInfo) => {
    assert.deepEqual(err, null, '`err` should be null')
    assert.deepEqual(
      getType(delayInMs),
      '[object Number]',
      '`delay` should be a number'
    )
    assert.deepEqual(
      getType(addInfo),
      '[object Object]',
      '`addInfo` should be an object'
    )

    assert.end()
  })

  assert.timeoutAfter(5000)
})

