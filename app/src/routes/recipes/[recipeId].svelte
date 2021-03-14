<script context="module">
  export async function preload(page) {
    return page.params
  }
</script>

<script>
  import { subtitle } from '../../stores/page'
  import marked from 'marked'
  import { goto } from '@sapper/app'
  import Ingredient from '../../components/ingredient'
  import EditableTitle from '../../components/editable-title'
  import EditableMarkdown from '../../components/editable-markdown'
  import IngredientInput from './_ingredient-input'
  import AddToShoppingList from './_add-to-shopping-list'
  import { getRecipe, setName, setDescription, addIngredient, removeIngredient, deleteRecipe } from '../../data/recipes'
  import { addRecipe as addRecipeToShopingList } from '../../data/shoppingLists'
  import { userId } from '../../stores/user-id'
  import Grid from '../../components/grid'

  export let recipeId

  let recipeQuery = getRecipe(recipeId)

  $: $recipeQuery.then(({ data: { recipe: { name } } }) => subtitle.set(name))

  async function handleDelete() {
    if(!confirm('Êtes-vous sûre de vouloir supprimer cette recette ?')) return
    await deleteRecipe(recipeId)
    goto('/recipes', { replaceState: true})
  }

</script>

{#await $recipeQuery}
  <h1>Recette</h1>
  <p>Loading</p>
{:then { data: { recipe } } }
  <EditableTitle
    title={recipe.name}
    onChange={name => setName(recipeId, name)}
    onDelete={$userId === recipe.user.id ? handleDelete : null}
  />

  <p>Créé par {recipe.user.username}</p>

  <AddToShoppingList onAdd={(shoppingListId, qte) => addRecipeToShopingList(shoppingListId, recipeId, qte)}/>

  <h2>Étapes : </h2>
  <EditableMarkdown content={recipe.description} onChange={description => setDescription(recipeId, description)}/>

  <h2>Ingrédients : </h2>
  <Grid>
    {#each recipe.ingredients as { ingredientId, qte, unit} }
      <Ingredient id={ingredientId} {qte} {unit} onDelete={() => removeIngredient(id)} />
    {/each}
  </Grid>
  <IngredientInput onAdd={recipeIngredient => addIngredient(recipeId, recipeIngredient)}/>
{/await}
