const _ = require('lodash')
const faker = require('faker')
const {RemoteSyslog, SEVERITY, NILVALUE, FACILITY} = require('rsyslog')
const os = require('os')

function getRandomNumber() {
  return Math.floor(Math.random() * 10)
}

function getRandomSeverity() {
  return _.sample([
    SEVERITY.ALERT,
    SEVERITY.NOTICE,
    SEVERITY.WARNING,
    SEVERITY.CRIT,
    SEVERITY.DEBUG,
    SEVERITY.EMERG,
    SEVERITY.ERROR,
    SEVERITY.INFO
  ])
}

function getRandomFacility() {
  return _.sample([
    FACILITY.auth,
    FACILITY.clock,
    FACILITY.cron,
    FACILITY.daemon,
    FACILITY.ftp,
    FACILITY.kern,
    FACILITY.local0,
    FACILITY.local1,
    FACILITY.local2,
    FACILITY.local3,
    FACILITY.uucp,
    FACILITY.user,
    FACILITY.syslog,
    FACILITY.security,
    FACILITY.ntp,
    FACILITY.news,
    FACILITY.mail,
    FACILITY.lpr,
    FACILITY.logaudit,
    FACILITY.logalert,
    FACILITY.local7,
    FACILITY.local6,
    FACILITY.local5,
    FACILITY.local4,
  ])
}

function post() {
  const rsyslog = new RemoteSyslog({
    target_host: '127.0.0.1',
    target_port: 514,
    hostname: os.hostname(),
    appname: NILVALUE,
    procid: process.pid.toString(),
    facility: getRandomFacility(),
  })

  rsyslog.on('error', (err) => {
    console.error(err)
  })

  var count = getRandomNumber()

  for (var i = 0; i < count; i++) {
    rsyslog.send(getRandomSeverity(), faker.hacker.phrase(), {
      timestamp: Date.now(),
    })

    console.info('Message posted!')
  }

  rsyslog.disconnect()
}

setInterval(post, 10000)

