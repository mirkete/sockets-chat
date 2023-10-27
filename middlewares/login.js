export function login () {
  return (req, res, next) => {
    if (res.locals.session) {
      next()
    } else {
      res.send('not logged')
    }
  }
}
