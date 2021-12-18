const Card = require('../models/card');
// 400
// eslint-disable-next-line semi
const BadRequestError = require('../errors/BadRequestError')

// 403
const ForbiddenError = require('../errors/ForbiddenError');

// 404
const NotFoundError = require('../errors/NotFoundError');

// Получение списка карточек
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

// Создание карточки
module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

// Удаление карточки
// module.exports.deleteCard = (req, res, next) => {
//   Card.findById(req.params.cardId)
//     .orFail(new Error('NotValidId'))
//     .then((card) => {
//       if (card.owner.toString() === req.user._id.toString()) {
//         card.remove()
//         res.status(200).send({ message: 'Карточка удалена' })
//       } else {
//         next(new ForbiddenError('Вы не можете удалить не свою карточку'))
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError('Переданы некорректные данные.'))
//       } else if (err.message === 'NotValidId') {
//         next(new NotFoundError('Карточка с указанным _id не найдена.'))
//       } else {
//         next(err)
//       }
//     })
// }

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не можете удалить не свою карточку'));
      }
      return card.remove().then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

// Установка лайка на карточку
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};

// Снятие лайка с карточки
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};
