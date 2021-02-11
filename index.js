require('dotenv').config()
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const routes = require('./src/routes')

const app = express()
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(routes)

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started')
})