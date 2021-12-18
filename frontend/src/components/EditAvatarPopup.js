import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(evt) {
    evt.preventDefault()

    props.onUpdateAvatar({
      link: avatarRef.current.value,
    })
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen])

  return (
    /* POPUP - EDIT AVATAR */
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          className="popup__input popup__input_type_avatar-url"
          type="url"
          name="avatar"
          id="avatar-input"
          placeholder="Ссылка на изображение"
          ref={avatarRef}
          required
        />
      </section>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
