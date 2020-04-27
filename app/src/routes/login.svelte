<script>
import { client } from '../data/apollo-client'
import { goto } from '@sapper/app'
import { userId } from '../stores/user-id'

let username, password

async function handleLogin() {
  const response = await fetch('/api/login', { method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({ username, password }) })
  if(!response.ok) return

  const { user, token } = await response.json()

  sessionStorage.token = token
  userId.set(user.id)

  await client.clearStore()

  goto('/recipes')
}
</script>

<form class="login-form" on:submit|preventDefault >
  <input bind:value={username} >
  <input type="password" bind:value={password} />
  <button on:click={handleLogin} disabled={!username || !password}>Se connecter</button>
</form>