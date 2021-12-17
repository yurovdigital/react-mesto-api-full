const router = require('express').Router()
// Валидация
const { celebrate, Joi } = require('celebrate')

const {
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users')

router.get('/users', getUsers)

router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24).required(),
    }),
  }),
  getUserId
)

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser
)

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .pattern(
          /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
        )
        .required(),
    }),
  }),
  updateUserAvatar
)

module.exports = router
