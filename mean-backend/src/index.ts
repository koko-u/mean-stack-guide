import { app } from './app'
import * as http from 'http'
import { normalizePort } from './normalize-port'
import { onError } from './error-handler'

const port = normalizePort(process.env.PORT ?? '3000')
app.set('port', port)

const server = http.createServer(app)
server.on('listening', () => {
  const addr = server.address()
  let bind = ''
  if (addr === null) {
    bind = `:${port}`
  } else {
    if (typeof addr === 'string') {
      bind = `${addr}:${port}`
    } else {
      bind = `${addr.address}:${port}`
    }
  }
  console.log(`Listening on ${bind}...`)
})
server.on('error', onError)

server.listen(port)
