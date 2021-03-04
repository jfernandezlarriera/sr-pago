const Movie = require('./movie.model')

module.exports.check = async (req, res, next) => {
  const movie = await Movie.findById(req.params.id)
  if (!movie) {
    throw Error('Movie not found.')
  }

  next()
}

module.exports.create = async (req, res) => {
  const movie = new Movie(req.body)
  movie.date = Date.now()
  await movie.save()

  res.json(movie)
}

module.exports.remove = async (req, res) => {
  await Movie.findByIdAndRemove(req.params.id)

  res.json(req.params.id)
}

module.exports.list = async (req, res) => {
  const movie = new Movie(req.body)
  const query = {}
  if (movie.city) {
    query.city = movie.city
  }
  const movies = await Movie.find(query)

  res.json(movies)
}