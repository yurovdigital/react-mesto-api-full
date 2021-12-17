import React from 'react'

function Login(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [emailValid, setEmailValid] = React.useState(false)
  const [passwordValid, setPasswordValid] = React.useState(false)
  const [emailValidsMsg, setEmailValidMsg] = React.useState('')
  const [passwordValidMsg, setPasswordValidMsg] = React.useState('')
  const [formValid, setFormValid] = React.useState(false)

  function onEmailChange(e) {
    const target = e.target
    const targetValidity = target.validity.valid
    setEmail(e.target.value)
    targetValidity ? setEmailValid(true) : setEmailValid(false)
    targetValidity
      ? setEmailValidMsg('')
      : setEmailValidMsg(target.validationMessage)
  }

  function onPasswordChange(e) {
    const target = e.target
    const targetValidity = target.validity.valid
    setPassword(e.target.value)
    targetValidity ? setPasswordValid(true) : setPasswordValid(false)
    targetValidity
      ? setPasswordValidMsg('')
      : setPasswordValidMsg(target.validationMessage)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit(email, password)
  }

  React.useEffect(() => {
    emailValid && passwordValid ? setFormValid(true) : setFormValid(false)
  }, [emailValid, passwordValid])

  return (
    <main className="main">
      <section className="entry-page">
        <h1 className="entry-page__title">Вход</h1>
        <form
          className="entry-page__form"
          name="sign-in-form"
          onSubmit={handleSubmit}
          isValid={formValid}
        >
          <section className="entry-page__section">
            <input
              className="entry-page__input"
              type="email"
              placeholder="Email"
              name="email"
              minLength="2"
              maxLength="40"
              value={email}
              onChange={onEmailChange}
              required
            />
            <span
              className={`entry-page__error ${
                !formValid && 'entry-page__error_visible'
              }`}
            >
              {emailValidsMsg}
            </span>
          </section>
          <section className="entry-page__section">
            <input
              className="entry-page__input"
              type="password"
              placeholder="Пароль"
              name="password"
              minLength="4"
              maxLength="10"
              value={password}
              onChange={onPasswordChange}
              required
            />
            <span
              className={`entry-page__error ${
                !formValid && 'entry-page__error_visible'
              }`}
            >
              {passwordValidMsg}
            </span>
          </section>
          <button
            className={`entry-page__button ${
              !formValid && 'entry-page__button_disabled'
            }`}
            type="submit"
            disabled={!formValid && true}
          >
            Войти
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
