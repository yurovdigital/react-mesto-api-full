import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  const [inputNameValid, setInputNameValid] = React.useState(false)
  const [inputLinkValid, setInputLinkValid] = React.useState(false)
  const [inputNameValidationMessage, setInputNameValidationMessage] =
    React.useState('')
  const [inputLinkValidationMessage, setInputLinkValidationMessage] =
    React.useState('')
  const [inputsValid, setInputsValid] = React.useState(false)

  function onChangeName(e) {
    const target = e.target
    const targetValidity = target.validity.valid
    setName(e.target.value)
    targetValidity ? setInputNameValid(true) : setInputNameValid(false)
    targetValidity
      ? setInputNameValidationMessage('')
      : setInputNameValidationMessage(target.validationMessage)
  }

  function onChangeLink(e) {
    const target = e.target
    const targetValidity = target.validity.valid
    setLink(e.target.value)
    targetValidity ? setInputLinkValid(true) : setInputLinkValid(false)
    targetValidity
      ? setInputLinkValidationMessage('')
      : setInputLinkValidationMessage(target.validationMessage)
  }

  React.useEffect(() => {
    inputLinkValid && inputNameValid
      ? setInputsValid(true)
      : setInputsValid(false)
  }, [inputLinkValid, inputNameValid])

  React.useEffect(() => {
    setName('')
    setLink('')
    setInputNameValid(false)
    setInputNameValidationMessage('')
    setInputLinkValid(false)
    setInputLinkValidationMessage('')
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault()

    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  return (
    /* POPUP - ADD PHOTO */
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={inputsValid}
    >
      <section className="popup__section">
        <input
          className="popup__input popup__input_type_photo-name"
          type="text"
          name="name"
          id="phototitle-input"
          placeholder="Название изображения"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={onChangeName}
          required
        />
        <span
          className={`popup__error ${!inputsValid && 'popup__error_visible'}`}
          id="phototitle-input-error"
        >
          {inputNameValidationMessage}
        </span>
      </section>
      <section className="popup__section">
        <input
          className="popup__input popup__input_type_photo-url"
          type="url"
          name="link"
          id="photourl-input"
          placeholder="Ссылка на изображение"
          value={link}
          onChange={onChangeLink}
          required
        />
        <span
          className={`popup__error ${!inputsValid && 'popup__error_visible'}`}
          id="photourl-input-error"
        >
          {inputLinkValidationMessage}
        </span>
      </section>
    </PopupWithForm>
  )
}
export default AddPlacePopup
