let app   = require('../src/app')
let http  = require('http')
let debug = require('debug')

const port = process.env.PORT || '3000'

app.set('port', port)
app.log = {}
app.log.error = debug('app:error')
app.log.debug = debug('app:debug')

let server = http.createServer(app)

server.listen(port)
