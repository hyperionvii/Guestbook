const db = require('./db.json')
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// this is in memory.  Data will keep for only as long as the app is running.

const data = []

// databases are persitant.

app.prepare().then(() => {
  const server = express()
  server.use(express.json()) // allows you to consume JSON data

  // these are listeners (consumes AND produces data)

  // this is techincally a server file that uses next.js.  This is express.

  server.post('/api/guestbook', (req, res, next) => {
    data.push(req.body)
    res.send(req.body)
  })

  server.get('/api/guestbook', (req, res, next) => {
    res.send(data)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(4899, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:4899')
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
