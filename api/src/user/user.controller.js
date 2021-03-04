const User = require('./user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config')

module.exports.check = async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    throw Error('User not found.')
  }

  next()
}

module.exports.create = async (req, res) => {
  const user = new User(req.body)
  user.date = Date.now()
  user.password = bcrypt.hashSync(user.password, 10)
  await user.save()

  res.json(user)
}

module.exports.remove = async (req, res) => {
  await User.findByIdAndRemove(req.params.id)

  res.json(req.params.id)
}

module.exports.list = async (req, res) => {    
  const users = await User.find()
  
  res.json(users)
}

module.exports.login = async (req, res) => {
  const user = new User(req.body)
  const query = {}
  query.email = user.email
  
  const row = await User.findOne(query)

  if (row) {
    bcrypt.compare(user.password, row.password, function(err, login) {    
      if (err){
        return res.json({success: false, message: 'error'})
      }
      if (login) {
        const token = jwt.sign({email: row.email, name: row.name}, config.SECRET)
        res.json(token)
      } else {
        return res.json({success: false, message: 'password do not match'})
      }
    })
  } else {
    return res.json({success: false, message: 'email do not match'})
  }

}