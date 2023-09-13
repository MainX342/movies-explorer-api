const router = require('express').Router();
const { getUserInfo, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/joiValidation');

router.get('/me', getUserInfo);
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;
