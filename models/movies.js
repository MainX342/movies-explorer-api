const mongoose = require('mongoose');
const { urlRegex } = require('../utils/regexPatterns');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
  },
  director: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
  },
  duration: {
    type: Number,
    required: [true, 'Обязательное для заполнения поле'],
  },
  year: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
  },
  description: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
  },
  image: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Обязательное для заполнения поле'],
  },
  nameRU: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
  },
  nameEN: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
