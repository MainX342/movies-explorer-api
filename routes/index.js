const router = require('express').Router();
const { loginValidation, registerValidation } = require('../middlewares/joiValidation');
const { login, createUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signin', loginValidation, login);
router.use('/signup', registerValidation, createUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая странница не найдена'));
});

module.exports = router;
