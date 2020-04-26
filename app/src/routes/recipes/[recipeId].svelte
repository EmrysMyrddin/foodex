<script context="module">
  export async function preload(page) {
    return page.params
  }
</script>

<script>
  import marked from 'marked'
  import Ingredient from '../../components/ingredient'
  import EditableTitle from '../../components/editable-title'
  import IngredientInput from './_ingredient-input'
  import EditableMarkdown from '../../components/editable-markdown'
  import { getRecipe, setName, setDescription, addIngredient, removeIngredient } from '../../data/recipes'

  export let recipeId

  let recipeQuery = getRecipe(recipeId)

</script>

<a href="/recipes" rel="preload">Retour à la liste des recettes</a>

{#await $recipeQuery}
  <h1>Recette</h1>
  <p>Loading</p>
{:then { data: { recipe } } }
  <EditableTitle title={recipe.name} onChange={name => setName(recipeId, name)} />

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
