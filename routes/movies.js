const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { movieIdValidation, addMovieValidation } = require('../middlewares/joiValidation');

router.get('/', getMovies);
router.post('/', addMovieValidation, addMovie);
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
