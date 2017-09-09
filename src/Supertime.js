class Supertime {
  constructor() {
    this.hrtime = process.hrtime()
  }

  humanize(duration) {
    const d = duration || this.duration
    let timeStr

    if (d < 1e3) {
      timeStr = d + 'ns';
    }
    else if (d < 1e6) {
      timeStr = Math.floor(d / 1e3) + 'μs'
    }
    else if (d < 1e9) {
      timeStr = Math.floor(d / 1e6) + 'ms'
    }
    else {
      timeStr = Math.floor(d / 1e9) + 's'
    }

    return {
      time: d,
      toString: () => timeStr
    }
  }

  start() {
    this.hrtime = process.hrtime()
    return this
  }

  stop() {
    const t = process.hrtime(this.hrtime)
    this.duration = t[0] * 1e9 + t[1]
    return this.humanize()
  }
}

module.exports = Supertime
