<script>
import { onMount } from 'svelte'
import { title, titleIcon } from '../stores/page'
import { client } from '../data/apollo-client'
import { goto } from '@sapper/app'
import { userId as userIdStore } from '../stores/user-id'

let username, password

onMount(() => {
  document.body.style.setProperty('--PRIMARY_COLOR', '16, 162, 227')
})

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
  <h2>Connexion</h2>
  <input bind:value={username} >
  <input type="password" bind:value={password} />
  <a id="forgotten-password" href="./#">Mot de passe oublié</a>
  <button on:click={handleLogin} disabled={!username || !password}>Se connecter</button>
</form>

<style>
h2 {
  text-align: center;
}

form {
  margin: auto;
  display: flex;
  flex-direction: column;
  max-width: 20em;
}

input, button {
  margin-top: 1em;
  height: 2.5em;
}

button {
  border-radius: 1em;
  border: #707070 solid 1px;
  background: #10A2E3;
  color: white;
  text-transform: uppercase;
}

button:disabled {
  background-color: #0A76A7;
}

#forgotten-password {
  align-self: flex-end
}
</style>