export function login () {
  return (req, res) => {
    if (res.locals.session) {
      next()
    } else {
      res.send("not logged")
    }
  }
}