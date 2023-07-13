const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ValidationError, CastError } = require('mongoose').Error;
const User = require('../models/user');
const { formatUser } = require('../helpers/formatUser');
const { secretKey } = require('../config');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users.map(formatUser));
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.send(formatUser(user)))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Предоставлены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.status(200).send(formatUser(user)))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.send(formatUser(user));
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Предоставлены некорректные данные'));
      } else if (err.code === 11000) {
        next(
          new ConflictError('Пользователь с таким email уже зарегистрирован')
        );
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
          sameSite: 'none',
        })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Вы успешно вышли' });
};

const updateUserData = (req, res, next, ...params) => {
  const update = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const param of params) {
    if (req.body[param] !== undefined) {
      update[param] = req.body[param];
    }
  }
  User.findByIdAndUpdate(req.user._id, update, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.send(formatUser(user)))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Предоставлены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  updateUserData(req, res, next, 'name', 'about');
};

const updateAvatar = (req, res, next) => {
  updateUserData(req, res, next, 'avatar');
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  logout,
  updateUser,
  updateAvatar,
  getUserInfo,
};
