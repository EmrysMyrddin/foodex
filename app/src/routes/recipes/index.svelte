<script>
  import { goto } from '@sapper/app'
  import Recipe from '../../components/recipe'
  import { listRecipes, createRecipe } from '../../data/recipes'

  let name

  const recipesQuery = listRecipes()

  async function handleCreate() {
    const { id } = await createRecipe(name)
    goto(`/recipes/${id}`)
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
</style>