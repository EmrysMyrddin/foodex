<script>
  import { getIngredient } from '../data/ingredients'
  export let recipeIngredient

  const { ingredientId, unit, qte } = recipeIngredient

  const ingredientQuery = getIngredient(ingredientId)
</script>

<a href="/ingredients/{ingredientId}">
  {#await $ingredientQuery} ingrédient {:then { data: { ingredient } } } {ingredient.name} {/await}
</a>: {qte}{unit}