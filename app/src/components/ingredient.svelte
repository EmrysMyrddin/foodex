<script>
  import { getIngredient } from '../data/ingredients'
  export let recipeIngredient, onDelete

  const { ingredientId, unit, qte } = recipeIngredient

  const ingredientQuery = getIngredient(ingredientId)
</script>

<a href="/ingredients/{ingredientId}">
  {#await $ingredientQuery} ingrédient {:then { data: { ingredient } } } {ingredient.name} {/await}
</a>: {qte}{unit}

{#if onDelete}
  <span on:click={onDelete} class="delete-button" >🗑</span>
{/if}

<style>
.delete-button {
  cursor: pointer;
}
</style>