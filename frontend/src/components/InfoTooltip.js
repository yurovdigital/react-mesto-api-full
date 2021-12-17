import React from 'react'
import RegistrationSuccess from '../images/registration-success.svg'
import RegistrationError from '../images/registration-error.svg'

function InfoTooltip(props) {
  return (
    <article
      className={`popup ${props.isOpen && 'popup_opened'}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__icon"
          src={
            props.isRegistrationSuccess
              ? RegistrationSuccess
              : RegistrationError
          }
          alt={props.isRegistrationSuccess
          ? 'Круг с галкой в центре'
          : 'Круг с крестом в центре'
          }
        />
        <h2 className="popup__text">
          {props.isRegistrationSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз.'}
        </h2>
      </div>
    </article>
  )
}

export default InfoTooltip
