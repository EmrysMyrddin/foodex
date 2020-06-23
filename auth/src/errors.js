function error (status, message, options) {
  const err = new Error(message)
  err.status = status
  err.expose = true
  Object.assign(err, options)
  return err
}

module.exports = {
  error
}
