const express = require('express')
const catchErrors = require('express-catch-errors')
const jwt = require('jsonwebtoken')

const config = require('../config')

const router = express.Router()
const {
  check,
  create,
  remove
} = require('./ticket.controller')

router.use((req, res, next) => {
  const token = req.headers['Token']

  if (token) {
      jwt.verify(token, config.SECRET, (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Invalid token.' })    
      } else {
        req.decoded = decoded    
        next()
      }
    })
  } else {
    /*res.send({ 
        mensaje: 'No token.' 
    })*/
    next()
  }
})

router.route('/add').post(catchErrors(create))
router.route('/delete/:id').get(catchErrors(check), catchErrors(remove))

module.exports = router
