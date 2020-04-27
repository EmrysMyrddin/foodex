<script>
  import { goto } from '@sapper/app'
  import Recipe from '../../components/recipe'
  import { listRecipes, createRecipe } from '../../data/recipes'

  let name, order = { name: 'asc' }

  let recipesQuery = listRecipes(order)
  $: recipesQuery.refetch({ order })

  async function handleCreate() {
    const { id } = await createRecipe(name)
    goto(`/recipes/${id}`)
  }

  const orderBy = (key) => () => {
    order = { [key]: order[key] === 'asc' ? 'desc' : 'asc' }
  }
</script>

<h1>Recettes</h1>

<form class="create-recipe-container" on:submit|preventDefault >
  <input bind:value={name}/>
  <button on:click={handleCreate} disabled={!name}>Créer une recette</button>
</form>

{#await $recipesQuery}
  <p>Loading ...</p>
{:then { data } }
  <div class="order">
    Trier par :
    <span class:active={order.name} on:click={orderBy('name')}>Nom</span>
    |
    <span class:active={order.createdAt} on:click={orderBy('createdAt')}>Date de création</span>
  </div>

  <ul>
    {#each (data && data.recipe) || [] as { id }}
      <li><Recipe recipeId={id} /></li>
    {/each}
  </ul>
{/await}

<style>
.create-recipe-container {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
}

.order > span {
  cursor: pointer;
}

.order > span.active {
  text-decoration: underline;
}
</style>