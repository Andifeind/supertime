Supertime
=========

High precision timer module for node.js.
It calculates a timespan in nanosecond precision.

```js
const supertime = require('supertime')

// start a timer
const timer = supertime.start()

// do some fancy stuff
const sum = 1 + 1
if (sum === 2) {
  result = 'yeah!'
}

const duration = timer.stop()

console.log(`My high complex calculation took ${duration}`)
```

The `supertime.start()` method returns a `Supertime` object which represents the timer.
To stop a timer, call `timer.stop()`. It returns a duration object, which contains the timespan in nanoseconds and returns the timespan as readable string if it gets converted into a string.

```js
const supertime = require('supertime')

// start a timer
const timer = supertime.start()

// do some fancy stuff

const duration = timer.stop()

console.log(duration.time) // logs the timespan in nanoseconds
console.log(duration) // logs the timespan as a readable string
```
