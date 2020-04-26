<script>
  import { getUser, setName, listUsers, share } from '../../data/users.js'
  import EditableTitle from '../../components/editable-title'
  import Select from 'svelte-select'

  let selectedUser, canWrite

  let userQuery = getUser()

  const getUsername = ({ username }) => username

  async function handleShare() {
    await share(selectedUser.id, canWrite)
    selectedUser = null
    canWrite = false
  }
</script>

{#await $userQuery}
  Chargement...
{:then { data: { user: { username, sharingWith, sharedBy } } } }
  <EditableTitle title={username} onChange={setName}></EditableTitle>

  <h2>Mes recettes sont partagées avec :</h2>

  <ul>
    {#each sharingWith as { sharedTo: { username }, canWrite } }
      <li>{username} {#if canWrite}(modification possible){/if}</li>
    {/each}
  </ul>

  <div class="share-form">
    <Select
      placeholder="Rechercher un utilisateur"
      optionIdentifier="id"
      getOptionLabel={getUsername}
      getSelectionLabel={getUsername}
      bind:selectedValue={selectedUser}
      loadOptions={listUsers}
    />

    <label>
      <input type="checkbox" bind:value={canWrite} />
      permettre les modifications
    </label>

    <button on:click={handleShare} disabled={!selectedUser}>Partager mes recettes</button>
  </div>


  <h2>Je peux voir les recettes de :</h2>

  <ul>
    {#each sharedBy as { sharedBy: { username }, canWrite } }
      <li>{username} {#if canWrite}(modification possible){/if}</li>
    {/each}
  </ul>
{/await}

<style>
h2 {
  margin-top: 2em;
}

.share-form {
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  grid-gap: 1rem;
  white-space: nowrap;
  align-items: center;
}
</style>