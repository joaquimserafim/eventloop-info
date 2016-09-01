/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

module.exports = eventLoopInfo

function eventLoopInfo (cb, threshold = 10) {

  const interval    = 100
  const start       = process.hrtime()
  const startUsage  = process.cpuUsage()

  return setTimeout(() => {

    setImmediate(() => {

      const diff  = process.hrtime(start)
      const delay = (diff[0] * 1e9 + diff[1]) / 1e6 - interval

      if (delay > threshold) {
        cb(
          null,
          Math.round(delay),
          {memory: process.memoryUsage(), cpu: process.cpuUsage(startUsage)}
        )
      }

      eventLoopInfo(cb)
    })
  }, interval)
    .unref()
}

