<script>
  import Ingredient from '../../components/ingredient'
  import { listIngredients, createIngredient } from '../../data/ingredients'

  let ingredientsQuery = listIngredients()

  let name

  async function handleCreate() {
    await createIngredient(name)
    ingredientsQuery.refetch()
    name = ''
  }
</script>

<h1>Ingrédients</h1>

<div class="ingredient-create-container" >
  <input bind:value={name} /><button on:click={handleCreate}>Créer un ingredient</button>
</div>

{#await $ingredientsQuery}
Chargement des ingrédients...
{:then { data } }
  <ul>
    {#each data.ingredient as { id,name } }
      <li><a href="/ingredients/{id}" >{name}</a></li>
    {/each}
  </ul>
{/await}

<style>
.ingredient-create-container {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
}
</style>