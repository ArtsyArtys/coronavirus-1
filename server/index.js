const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const cluster = require('cluster')
const PORT = process.env.PORT || 1234
const app = express()
module.exports = app



const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'dist')))

  // routes middleware
  app.use('/api', require('./api'))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  if (cluster.isMaster) {
    let numWorkers = require('os').cpus().length

    console.log("Master cluster is setting up " + numWorkers + " workers")
    for (let i = 0; i < numWorkers; i++) {
      cluster.fork()
    }

    cluster.on('online', worker => {
      console.log("Worker " + worker.process.pid + " is online!");
    })

    cluster.on('exit', (worker, code, signal) => {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
      console.log('Starting a new worker')
      cluster.fork()
    })
  }
  else {
    app.all('/*', (req, res) => {
      res.send(`process ${process.pid} says hello`).end()
    })
    const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT} with worker ${process.pid}`)
  )}
}

async function bootApp() {
  await createApp()
  await startListening()
}

bootApp()
// listen()
