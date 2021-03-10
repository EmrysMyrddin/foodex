<script>
  import { getIngredient } from '../data/ingredients'
  export let id, qte, unit, onDelete

  $: ingredientQuery = getIngredient(id)
</script>

<a href="/ingredients/{id}">
  {#await $ingredientQuery} ingrédient {:then { data: { ingredient } } } {ingredient.name} {/await}
  {#if unit}: {qte}{unit}{/if}
  {#if onDelete}
    <span on:click|preventDefault={onDelete} class="delete-button" >🗑</span>
  {/if}
</a>

<style>
.delete-button {
  cursor: pointer;
}

a {
  display: block;
  border: rgb(var(--PRIMARY_COLOR)) solid 1px;
  border-radius: 0.5em;
  padding: 0.5em;
  text-decoration: none;
}
</style>