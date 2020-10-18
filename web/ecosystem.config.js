module.exports = {
  apps: [{
    name: 'learn-nlw3-happy-web',
    script: 'npm',
    args: 'start',
    instances: 1,
    watch_delay: 1000,
    exec_mode: 'fork'
  }]
}
