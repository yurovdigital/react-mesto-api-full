require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Валидация
const { celebrate, Joi, errors } = require('celebrate')

// База данных
const mongoose = require('mongoose')
// ПОРТ
const { PORT = 3000 } = process.env

// // CRASH-TEST
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт')
//   }, 0)
// })

// Роуты
const usersRoutes = require('./routes/users')
const cardRoutes = require('./routes/cards')
const { postUser, login } = require('./controllers/users')

// Middlewares
const auth = require('./middlewares/auth')
const error = require('./middlewares/error')
const { requestLogger, errorLogger } = require('./middlewares/logger')

const app = express()

// BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/mestodb')

// Логгер запросов
app.use(requestLogger)

app.use(
  cors({
    origin: [
      'https://yurov.mesto.nomoredomains.rocks',
      'http://yurov.mesto.nomoredomains.rocks',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: 'GET, PUT, PATCH, POST, DELETE',
    allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  })
)

// Роуты для логина и регистрации
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
    }),
  }),
  login
)
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
      ),
    }),
  }),
  postUser
)

// Авторизация
app.use(auth)

app.use('/', usersRoutes)
app.use('/', cardRoutes)

// Логгер ошибок
app.use(errorLogger)

app.use(errors())
app.use(error)

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`)
})
