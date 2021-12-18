import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/Api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import { Route, Redirect, Switch, useHistory } from 'react-router-dom'
import * as auth from '../utils/Auth'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlaceOpen] = React.useState(false)
  // Popup авторизации
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = React.useState({})
  // Карточки
  const [cards, setCards] = React.useState([])

  // Авторизация
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isRegistrationSuccess, setIsRegistrationSuccess] =
    React.useState(false)
  const history = useHistory()
  const [email, setEmail] = React.useState('')

  //Loading
  const [loading, setLoading] = React.useState(false)

  // API
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Auth
  // Регистрация пользователя
  function handleRegistrationSubmit(email, password) {
    setLoading(true)
    auth
      .registration(email, password)
      .then((res) => {
        if (res) {
          setIsRegistrationSuccess(true)
          setIsInfoTooltipOpen(true)
          history.push('/sign-in')
        }
      })

      .catch((err) => {
        setIsRegistrationSuccess(false)
        setIsInfoTooltipOpen(true)
        console.log(err)
      })
    setLoading(false)
  }

  // Логин пользователя
  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token)
          setIsLoggedIn(true)
          setEmail(email)
          history.push('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Проверка токена
  React.useEffect(() => {
    const jwt = localStorage.getItem('token')
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true)
          setEmail(res.data.email)
          history.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })

  // Выход из аккаунта
  function handleSignOut() {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    history.push('/sign-in')
  }

  // Обновление данных профиля
  function handleUpdateUser(data) {
    api
      .patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Обновление аватара
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Получение изначальных карточек
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Лайк карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
    })
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api
      .deletePhoto(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Добавление карточки
  function handleAddPlaceSubmit(card) {
    api
      .addNewPhoto(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // Открытие Popup'ов
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setEditAvatarOpen(false)
    setAddPlaceOpen(false)
    setSelectedCard({ name: '', link: '' })
    setIsInfoTooltipOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {/* HEADER */}
          <Header userEmail={email} onSignOut={handleSignOut} />
          {/* MAIN */}
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              isLoggedIn={isLoggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
            <Route path="/sign-in">
              <Login onSubmit={handleLoginSubmit} />
            </Route>
            <Route path="/sign-up">
              <Register onSubmit={handleRegistrationSubmit} />
            </Route>
            <Route path="/">
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          {/* FOOTER */}
          <Footer />
        </div>

        {/* POPUP - INFO TOOLTIP */}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegistrationSuccess={isRegistrationSuccess}
        />
        {/* POPUP - PROFILE EDIT */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* POPUP - EDIT AVATAR */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* POPUP - ADD PHOTO */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* POPUP - IMAGE FULLSCREEN */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
