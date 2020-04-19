<script>
import { goto } from '@sapper/app'

let username, password

async function handleLogin() {
  const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) })
  if(!response.ok) return
  sessionStorage.token = await response.text()
  goto('/recipes')
}
</script>

<div class="login-form" >
  <input bind:value={username} >
  <input type="password" bind:value={password} />
  <button on:click={handleLogin} >Se connecter</button>
</div>