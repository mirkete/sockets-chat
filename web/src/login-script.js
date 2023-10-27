const usernameForm = document.querySelector('#username-form')
const username = document.querySelector('#username')

const url = new URL(window.location.href)

usernameForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (username) {
    window.localStorage.setItem('username', username.value)
    window.location.replace(url.origin)
  }
  username.value = ''
})
