<script>
import { title, titleIcon } from '../stores/page'
import { client } from '../data/apollo-client'
import { goto } from '@sapper/app'
import { userId as userIdStore } from '../stores/user-id'

let username, password

titleIcon.set(null)
title.set('Foodex')

async function handleLogin() {
  const response = await fetch('/api/login', { method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({ username, password }) })
  if(!response.ok) return

  const { userId, token } = await response.json()

  sessionStorage.token = token
  userIdStore.set(userId)

  await client.clearStore()

  goto('/recipes')
}
</script>

<form class="login-form" on:submit|preventDefault >
  <input bind:value={username} >
  <input type="password" bind:value={password} />
  <button on:click={handleLogin} disabled={!username || !password}>Se connecter</button>
</form>