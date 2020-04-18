<script>
import { query } from 'svelte-apollo'
import gql from 'graphql-tag'
import { client } from '../data/apollo-client'
export let recipeId, qte = null

let recipeQuery = query(client, {
  query: gql`
    query getRecipeForList($recipeId: uuid!) {
      recipe: recipe_by_pk(id: $recipeId) { id, name }
    }
  `,
  variables: { recipeId }
})

</script>

{#await $recipeQuery} Recette {:then { data: { recipe } } } <a href="/recipes/{recipe.id}">{recipe.name}</a> {/await }
{#if qte !== null}(x{qte}){/if}