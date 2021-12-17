import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${
    isOwn ? 'photo-grid__delete-button' : 'photo-grid__delete-button_hidden'
  }`

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id)

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `${
    isLiked
      ? 'photo-grid__like-button photo-grid__like-button_active'
      : 'photo-grid__like-button'
  }`

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleCardDelete() {
    props.onCardDelete(props.card)
  }

  return (
    <article className="photo-grid__card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить изображение"
        onClick={handleCardDelete}
      ></button>
      <img
        className="photo-grid__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="photo-grid__container">
        <h2 className="photo-grid__title">{props.card.name}</h2>
        <div className="photo-grid__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк фотографии"
            onClick={handleLikeClick}
          ></button>
          <p className="photo-grid__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card
