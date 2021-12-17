import React from 'react'

function PopupWithForm(props) {
  return (
    <article
      className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          className="popup__form"
          name={`${props.name}`}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button
            className={`popup__submit-button ${
              !props.isValid && 'popup__submit-button_disabled'
            }`}
            type="submit"
            disabled={!props.isValid && true}
          >
            Сохранить
          </button>
        </form>
      </div>
    </article>
  )
}

export default PopupWithForm
