<script context="module">
  export async function preload(page) {
    return page.params
  }
</script>

<script>
import sumBy from 'lodash/sumBy'
import partition from 'lodash/partition'
import { subtitle } from '../../stores/page'
import { getShoppingList, addRecipe, setRecipePrepared } from '../../data/shoppingLists'
import Ingredient from '../../components/ingredient'
import Recipe from '../../components/recipe'
import RecipeInput from './_recipe-input'

export let shoppingListId

let recipes = [], preparedRecipes = [], ingredients = []

let shoppingListQuery = getShoppingList(shoppingListId)

$: $shoppingListQuery.then(({ data: { shoppingList } }) => {
  const partitionedRecipes = partition(shoppingList.recipes, 'prepared')
  recipes = partitionedRecipes[1]
  preparedRecipes = partitionedRecipes[0]
  ingredients = shoppingList.ingredients
  subtitle.set(shoppingList.name)
})

</script>

<h2>Recettes ({sumBy(recipes, 'qte')})</h2>
<ul>
  {#each recipes as { id: entryId, recipe: { id }, qte } (entryId)}
    <li>
      <Recipe recipeId={id} {qte} />
      <span class="set-prepared-icon" on:click={setRecipePrepared(entryId, true)}>✅</span>
    </li>
  {/each}
  <RecipeInput onAdd={(recipeId, qte) => addRecipe(shoppingListId, recipeId, qte)}/>
</ul>

<h2>Ingrédients ({ingredients.length})</h2>
<ul>
  {#each ingredients as recipeIngredient}
    <li><Ingredient {recipeIngredient} /></li>
  {/each}
</ul>

<h2>Recettes prêtes ({sumBy(preparedRecipes, 'qte')})</h2>
<ul>
  {#each preparedRecipes as { id: entryId, recipe: { id }, qte } (entryId)}
    <li>
      <Recipe recipeId={id} {qte} />
      <span class="set-prepared-icon" on:click={setRecipePrepared(entryId, false)}>🚫</span>
    </li>
  {/each}
</ul>

<style>
  .set-prepared-icon {
    cursor: pointer;
  }
</style>