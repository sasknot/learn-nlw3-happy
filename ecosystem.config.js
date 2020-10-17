module.exports = {
  apps: [{
    name: 'learn-nlw3-happy-api',
    cwd: './api/',
    script: 'npm',
    args: 'start',
    interpreter: 'node',
    instances: 1,
    // autorestart: false,
    // watch: ['src'],
    // watch_delay: 1000,
    exec_mode: 'fork',
    // wait_ready: true,
    // listen_timeout: 3000,
    // kill_timeout: 5000,
    // restart_delay: 2000,
    // max_restarts: 10
  }, {
    name: 'learn-nlw3-happy-web',
    cwd: './web/',
    script: 'npm',
    args: 'start',
    instances: 1,
    watch_delay: 1000,
    exec_mode: 'fork'
  }]
}
