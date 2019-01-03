const express = require('express')
const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.ENVIRON !== 'prod' })
const handler = routes.getRequestHandler(app)

// Configuration
require('dotenv').config()
const port = parseInt(process.env.PORT || 5000)

// update Messenger profile
app.prepare().then(() => {
  express()
    .use(handler)
    .listen(port, () => {
      console.log('Server running on port', port)
    })
})
