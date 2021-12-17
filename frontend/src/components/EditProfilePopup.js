import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const currentUser = React.useContext(CurrentUserContext)

  const [inputNameValid, setInputNameValid] = React.useState(false)
  const [inputDescriptionValid, setInputDescriptionValid] =
    React.useState(false)
  const [inputNameValidationMessage, setInputNameValidationMessage] =
    React.useState('')
  const [
    inputDescriptionValidationMessage,
    setInputDescriptionValidationMessage,
  ] = React.useState('')
  const [inputsValid, setInputsValid] = React.useState(false)

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
    setInputNameValid(true)
    setInputDescriptionValid(true)
  }, [currentUser, props.isOpen])

  React.useEffect(() => {
    inputDescriptionValid && inputNameValid
      ? setInputsValid(true)
      : setInputsValid(false)
  }, [inputDescriptionValid, inputNameValid])

  function onChangeName(e) {
    const target = e.target
    const targetValidity = target.validity.valid
    setName(e.target.value)
    targetValidity ? setInputNameValid(true) : setInputNameValid(false)
    targetValidity
      ? setInputNameValidationMessage('')
      : setInputNameValidationMessage(target.validationMessage)
  }

  function onChangeDescription(e) {
    const target = e.target
    const targetValidity = target.validity.valid
    setDescription(e.target.value)
    targetValidity
      ? setInputDescriptionValid(true)
      : setInputDescriptionValid(false)
    targetValidity
      ? setInputDescriptionValidationMessage('')
      : setInputDescriptionValidationMessage(target.validationMessage)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    /* POPUP - PROFILE EDIT */
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={inputsValid}
    >
      <section className="popup__section">
        <input
          className={`popup__input popup__input_type_title ${
            !inputsValid && 'popup__input_type_error'
          }`}
          type="text"
          name="name"
          id="profiletitle-input"
          placeholder="Имя профиля"
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={onChangeName}
          required
        />
        <span
          className={`popup__error ${!inputsValid && 'popup__error_visible'}`}
          id="profiletitle-input-error"
        >
          {inputNameValidationMessage}
        </span>
      </section>
      <section className="popup__section">
        <input
          className={`popup__input popup__input_type_subtitle ${
            !inputsValid && 'popup__input_type_error'
          }`}
          type="text"
          name="about"
          id="pofilesubtitle-input"
          placeholder="Описание профиля"
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={onChangeDescription}
          required
        />
        <span
          className={`popup__error ${!inputsValid && 'popup__error_visible'}`}
          id="pofilesubtitle-input-error"
        >
          {inputDescriptionValidationMessage}
        </span>
      </section>
    </PopupWithForm>
  )
}

export default EditProfilePopup
