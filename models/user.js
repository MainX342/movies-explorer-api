const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { emailRegex } = require('../utils/regexPatterns');
const UnautorizedError = require('../errors/UnautorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени 2 символа'],
    maxlength: [30, 'Макимальная длина имени 30 символов'],
    required: [true, 'Обязательное для заполнения поле'],
  },
  email: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
    unique: true,
    validate: {
      validator(email) {
        return emailRegex.test(email);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательное для заполнения поле'],
    select: false,
  },
}, { versionKey: false });

async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new UnautorizedError(`Пользователь с email: ${email} не найден`);
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new UnautorizedError('Неправильные почта или пароль');
  }

  return user;
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
