const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const { catchAll, notFound } = require('./error')

const app = express()
const userRouter = require('./user/user.router')
const movieRouter = require('./movie/movie.router')
const ticketRouter = require('./ticket/ticket.router')

app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json({ message: 'It works!' })
})

app.use('/api/users', userRouter)
app.use('/api/movies', movieRouter)
app.use('/api/tickets', ticketRouter)

app.use(notFound)
app.use(catchAll)

module.exports = app
