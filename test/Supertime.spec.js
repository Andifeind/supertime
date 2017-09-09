const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Supertime = require('../src/Supertime')

describe('Supertime', () => {
  describe('instance', () => {
    it('creates a Supertime instance', () => {
      const supertime = new Supertime()
      inspect(supertime).isInstanceOf(Supertime)
    })
  })

  describe('start()', () => {
    it('starts a timer', () => {
      const supertime = new Supertime()

      const hrtime = supertime.hrtime
      inspect(hrtime).isArray()
      inspect(hrtime[0]).isNumber()
      inspect(hrtime[1]).isNumber()

      supertime.start()
      const hrtime2 = supertime.hrtime

      inspect(hrtime2).isArray()
      inspect(hrtime2[0]).isNumber()
      inspect(hrtime2[1]).isNumber()

      inspect(hrtime).isNotEql(hrtime2)
    })
  })

  describe('stop()', () => {
    it('stops a timer and returns a duration object', () => {
      const supertime = new Supertime()
      inspect(supertime).hasMethod('stop')

      const duration = supertime.stop()
      inspect(duration).isObject()
      inspect(duration.time).isNumber()
      inspect(`${duration}`).isString().doesMatch(/^\d+(μ|n)?s$/)
    })

    it('calculates a timespan in ns precision', () => {
      const sandbox = sinon.sandbox.create()
      const stub = sandbox.stub(process, 'hrtime')
      stub.returns([ 0, 132 ])

      const supertime = new Supertime()
      const duration = supertime.stop()

      inspect(stub).wasCalledTwice()
      inspect(duration.time).isEql(132)
      inspect(duration.toString()).isEql('132ns')
      sandbox.restore()
    })

    it('calculates a timespan in μs precision', () => {
      const sandbox = sinon.sandbox.create()
      const stub = sandbox.stub(process, 'hrtime')
      stub.returns([ 0, 1328 ])

      const supertime = new Supertime()
      const duration = supertime.stop()

      inspect(stub).wasCalledTwice()
      inspect(duration.time).isEql(1328)
      inspect(duration.toString()).isEql('1μs')
      sandbox.restore()
    })

    it('calculates a timespan in ms precision', () => {
      const sandbox = sinon.sandbox.create()
      const stub = sandbox.stub(process, 'hrtime')
      stub.returns([ 0, 1328000 ])

      const supertime = new Supertime()
      const duration = supertime.stop()

      inspect(stub).wasCalledTwice()
      inspect(duration.time).isEql(1328000)
      inspect(duration.toString()).isEql('1ms')
      sandbox.restore()
    })
  })

  describe('humanize()', () => {
    [
      [1, '1ns'],
      [132, '132ns'],
      [999, '999ns'],
      [1000, '1μs'],
      [132800, '132μs'],
      [999999, '999μs'],
      [1000000, '1ms'],
      [132800000, '132ms'],
      [999999999, '999ms'],
      [1000000000, '1s'],
      [132800000000, '132s'],
      [999999999999, '999s'],
      [99999999999999, '99999s']
    ].forEach((t) => {
      it(`converts ${t[0]} nanosecond into a readable string (${t[1]})`, () => {
        const supertime = new Supertime()
        inspect(supertime.humanize(t[0]).toString()).isEql(t[1])
      })
    })
  })
})
