<script>
import { client } from '../data/apollo-client'
import { goto } from '@sapper/app'

let username, password

async function handleLogin() {
  const response = await fetch('/api/login', { method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({ username, password }) })
  if(!response.ok) return

  const { user, token } = await response.json()

  sessionStorage.token = token
  sessionStorage.userId = user.id

  await client.clearStore()

  goto('/recipes')
}
</script>

<div class="login-form" >
  <input bind:value={username} >
  <input type="password" bind:value={password} />
  <button on:click={handleLogin} >Se connecter</button>
</div>