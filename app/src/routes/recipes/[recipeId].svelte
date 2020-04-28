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
  import IngredientInput from './_ingredient-input'
  import EditableMarkdown from '../../components/editable-markdown'
  import { getRecipe, setName, setDescription, addIngredient, removeIngredient, deleteRecipe } from '../../data/recipes'
  import { userId } from '../../stores/user-id'

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

  <h2>Étapes : </h2>
  <EditableMarkdown content={recipe.description} onChange={description => setDescription(recipeId, description)}/>

  <h2>Ingrédients : </h2>
  <ul>
    {#each recipe.ingredients as recipeIngredient}
      <li><Ingredient {recipeIngredient} onDelete={() => removeIngredient(recipeIngredient.id)} /></li>
    {/each}
    <li><IngredientInput onAdd={recipeIngredient => addIngredient(recipeId, recipeIngredient)}/></li>
  </ul>
{/await}
