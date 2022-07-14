<script>
  import { getIngredient } from '../data/ingredients'
  export let recipeIngredient, onDelete

  $: ({ ingredientId, unit, qte } = recipeIngredient)

  $: ingredientQuery = getIngredient(ingredientId)
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