<script>
  import { goto } from '@sapper/app'
  import { subtitle } from '../../stores/page'
  import { listShoppingLists, createShoppingList } from '../../data/shoppingLists'

  let newListName = ''

  subtitle.set(null)

  const shoppingListsQuery = listShoppingLists()

  async function handleCreate() {
    const { data: { shoppingList: { id } } } = await createShoppingList(newListName)
    newListName = ""
    goto(`/shopping-lists/${id}`)
  }
</script>

<div class="new-list-container">
  <input bind:value={newListName}>
  <button
    on:click={handleCreate}
    disabled={!newListName}
  >
    Créer un nouvelle liste
  </button>
</div>

{#await $shoppingListsQuery}

Chargement des listes de courses...

{:then { data: { shopping_list } } }
  <ul>
    {#each shopping_list as shoppingList}
      <li>
        <a href="/shopping-lists/{shoppingList.id}">{shoppingList.name}</a>
        ({shoppingList.recipes_aggregate.aggregate.count} recettes)
      </li>
    {/each}
  </ul>
{/await}

<style>
.new-list-container {
  grid-auto-flow: column;
  grid-gap: 1rem;
}
</style>