import React from 'react'

function ImagePopup(props) {
  // console.log(props)
  return (
    <section
      className={`popup popup_image-fullscreen ${
        props.card.link && 'popup_opened'
      }`}
    >
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <p className="popup__image-fullscreen-text">{props.card.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup
