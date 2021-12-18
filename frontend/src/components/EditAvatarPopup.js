import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  // const avatarRef = React.useRef()

  const [avatar, setAvatar] = React.useState('')

  const [inputValid, setInputValid] = React.useState(false)
  const [inputValidationMessage, setInputValidationMessage] = React.useState('')

  // function handleSubmit(e) {
  //   e.preventDefault()

  //   props.onUpdateAvatar({
  //     avatar: avatarRef.current.value,
  //   })
  // }

  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateAvatar({
      avatar: avatar,
    })
  }

  function handleChange(e) {
    const target = e.target
    const targetValidity = target.validity.valid
    setAvatar(target.value)
    targetValidity ? setInputValid(true) : setInputValid(false)
    targetValidity
      ? setInputValidationMessage('')
      : setInputValidationMessage(target.validationMessage)
  }

  React.useEffect(() => {
    setAvatar('')
    setInputValid(false)
    setInputValidationMessage('')
  }, [props.isOpen])

  return (
    /* POPUP - EDIT AVATAR */
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={inputValid}
    >
      <section className="popup__section">
        <input
          className={`popup__input popup__input_type_avatar-url ${
            !inputValid && 'popup__input_type_error'
          }`}
          type="url"
          name="avatar"
          id="avatar-input"
          placeholder="Ссылка на изображение"
          //ref={avatarRef}
          value={avatar}
          onChange={handleChange}
          required
        />
        <span
          className={`popup__error ${!inputValid && 'popup__error_visible'}`}
          id="avatar-input-error"
        >
          {inputValidationMessage}
        </span>
      </section>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
