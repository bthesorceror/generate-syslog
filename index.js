const _ = require('lodash')
const faker = require('faker')
const {RemoteSyslog, SEVERITY, NILVALUE, FACILITY} = require('rsyslog')
const os = require('os')

const rsyslog = new RemoteSyslog({
  target_host: '127.0.0.1',
  target_port: 514,
  hostname: os.hostname(),
  appname: NILVALUE,
  procid: process.pid.toString(),
  facility: FACILITY.local0,
})

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


function post() {
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
}

setInterval(post, 10000)

