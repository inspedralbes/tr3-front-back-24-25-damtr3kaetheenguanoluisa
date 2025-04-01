module.exports = {
    apps: [
      {
        name: 'NuxtAppName',
        port: 22212,
        NITRO_HOST: '0.0.0.0',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
      }
    ]
  }
  