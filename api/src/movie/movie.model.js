const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    required: true
  },
  description:  {
    type: String,
    trim: true,
    required: true
  },
  image:  {
    type: String,
    trim: true,
    required: true
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  date: Date
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie
