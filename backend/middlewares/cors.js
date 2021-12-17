const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'

const allowedCors = [
  'https://yurov.mesto.nomoredomains.rocks',
  'http://yurov.mesto.nomoredomains.rocks',
  'localhost:3000',
]

module.exports = (req, res, next) => {
  const { origin } = req.headers

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)

    res.header('Access-Control-Allow-Credentials', 'true')
  }

  const { method } = req

  const requestHeaders = req.headers['access-control-request-headers']

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS)

    res.header('Access-Control-Allow-Methods', requestHeaders)

    res.end()
  }

  next()
}
