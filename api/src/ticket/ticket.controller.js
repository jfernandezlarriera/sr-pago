const Ticket = require('./ticket.model')

module.exports.check = async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    throw Error('Ticket not found.')
  }

  next()
}

module.exports.create = async (req, res) => {
  const ticket = new Ticket(req.body)
  await ticket.save()

  res.json(ticket)
}

module.exports.remove = async (req, res) => {
  await Ticket.findByIdAndRemove(req.params.id)

  res.json(req.params.id)
}