<script>
  import { subtitle } from '../../stores/page'
  import Ingredient from '../../components/ingredient'
  import { listIngredients, createIngredient } from '../../data/ingredients'

  subtitle.set(null)

  let ingredientsQuery = listIngredients()

  let name

  async function handleCreate() {
    await createIngredient(name)
    ingredientsQuery.refetch()
    name = ''
  }
</script>

<form class="ingredient-create-container" on:submit|preventDefault>
  <input bind:value={name} />
  <button on:click={handleCreate} disabled={!name}>Créer un ingredient</button>
</form>

{#await $ingredientsQuery}
  Chargement des ingrédients...
{:then { data } }
    {#each data.ingredient as { id,name } }
      <Ingredient ingredientId={id}></Ingredient>
    {/each}
{/await}

<style>
.ingredient-create-container {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
}
</style>