<script>
  import Recipe from '../../components/recipe'
  import { listRecipes, createRecipe } from '../../data/recipes'

  let name

  const recipesQuery = listRecipes()

  function handleCreate() {
    createRecipe(name)
    name = ''
  }
</script>

<h1>Recettes</h1>

<div class="create-recipe-container">
  <input bind:value={name}/>
  <button on:click={handleCreate}>Créer un recette</button>
</div>

{#await $recipesQuery}
  <p>Loading ...</p>
{:then { data: { recipe } } }
  <ul>
    {#each recipe as { id }}
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