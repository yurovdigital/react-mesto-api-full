import logo from '../images/header-logo.svg'
import React from 'react'
import { Link, Route } from 'react-router-dom'

function Header(props) {
  return (
    <header className="header">
      <div className="header__container">
      <img className="header__logo" src={logo} alt="Логотип Mesto" />
      <div className="header__login-container">
        <Route exact path="/">
          <p className="header__user-email">{props.userEmail}</p>
          <Link
            to="/sign-in"
            className="header__link"
            onClick={props.onSignOut}
          >
            Выйти
          </Link>
        </Route>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
      </div>
      </div>
    </header>
  )
}

export default Header
