require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// ENV
const { NODE_ENV, JWT_SECRET } = process.env;

// ERRORS
// 400
const BadRequestError = require('../errors/BadRequestError');

// 401
// const UnauthorizedError = require('../errors/UnauthorizedError');

// 404
const NotFoundError = require('../errors/NotFoundError');

// 409
const ConflictError = require('../errors/ConflictError');

// Получение списка пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

// Получение ID пользователя
module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};

// Создание пользователя
module.exports.postUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с такими данными уже есть в базе'));
      } else {
        next(err);
      }
    });
};

// Обновление пользователя
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.create({ name, about })
    .orFail(new Error('NotValidId'))
    .then((user) => res
      .status(200)
      .send(req.user._id, { data: user }, { new: true, runValidators: true }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};

// Обновление аватара пользователя
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.create({ avatar })
    .orFail(new Error('NotValidId'))
    .then((user) => res
      .status(200)
      .send(req.user._id, { data: user }, { new: true, runValidators: true }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};

// Логин
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};
