const { celebrate, Joi, Segments } = require('celebrate');
const { urlRegex, emailRegex } = require('../utils/regexPatterns');

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required(),
  }),
});

const registerValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailRegex),
  }),
});

const movieIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const addMovieValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    year: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  loginValidation,
  registerValidation,
  updateUserValidation,
  movieIdValidation,
  addMovieValidation,
};
