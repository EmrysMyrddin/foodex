import * as sapper from '@sapper/app'

if (!sessionStorage.token && !location.pathname.startsWith('/login')) {
  sapper.goto('/login', { replaceState: true })
}

sapper.start({
  target: document.querySelector('#sapper')
})
