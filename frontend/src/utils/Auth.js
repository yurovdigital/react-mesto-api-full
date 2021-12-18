export const BASE_URL = 'https://api.yurov.mesto.nomoredomains.rocks'

const hanldeResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  return res.json()
}

export const registration = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => hanldeResponse(res))
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => hanldeResponse(res))
    .then((data) => {
      return data
    })
}

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => hanldeResponse(res))
}
