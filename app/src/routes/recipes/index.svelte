<script>
  import { subtitle } from '../../stores/page'
  import { goto } from '@sapper/app'
  import Recipe from '../../components/recipe'
  import Grid from '../../components/grid'
  import { listRecipes, createRecipe } from '../../data/recipes'

  let name, order = { name: 'asc' }

  subtitle.set(null)

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

  <Grid>
    {#each (data && data.recipe) || [] as { id }}
      <Recipe recipeId={id} />
    {/each}
  </Grid>

  <ul>

  </ul>
{/await}

<style>
.create-recipe-container {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
}

.order {
  margin-top: 1em;
}

.order > span {
  cursor: pointer;
}

.order > span.active {
  text-decoration: underline;
}
</style>