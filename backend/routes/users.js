const express = require('express');

const router = express.Router();

const { validateUserId, validateAvatarLink, validateUserInfo } = require('../helpers/validations');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:userId', validateUserId, getUserById);

router.patch('/me', validateUserInfo, updateUser);

router.patch('/me/avatar', validateAvatarLink, updateAvatar);

module.exports = router;
