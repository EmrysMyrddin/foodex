<script context="module">
  export async function preload(page) {
    return page.params
  }
</script>

<script>
import { getShoppingList, addRecipe } from '../../data/shoppingLists'
import Ingredient from '../../components/ingredient'
import Recipe from '../../components/recipe'
import RecipeInput from './_recipe-input'

export let shoppingListId

let shoppingListQuery = getShoppingList(shoppingListId)
</script>

{#await $shoppingListQuery}
Chargement de la liste de course
{:then { data: { shoppingList } } }
  <h1>{shoppingList.name}</h1>

  <h2>Recettes</h2>
  <ul>
    {#each shoppingList.recipes as { recipe: { id }, qte }}
      <li><Recipe recipeId={id} {qte} /></li>
    {/each}
    <RecipeInput onAdd={(recipeId, qte) => addRecipe(shoppingListId, recipeId, qte)}/>
  </ul>

  <h2>Ingrédients</h2>
    {#each shoppingList.ingredients as recipeIngredient }
      <li><Ingredient {recipeIngredient} /></li>
    {/each}
  <ul>
  </ul>
{/await}