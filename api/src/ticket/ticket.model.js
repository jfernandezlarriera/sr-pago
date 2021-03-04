const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
  dni: { 
    type: Number,
    trim: true,
    required: true
  },
  movie:  {
    type: String,
    trim: true,
    required: true
  },
  date:  {
    type: Date,
    trim: true,
    required: true
  },
  cinema: {
    type: String,
    trim: true,
    required: true
  }
})

const Ticket = mongoose.model('Ticket', TicketSchema)

module.exports = Ticket
