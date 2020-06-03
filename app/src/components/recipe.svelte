<script>
import { query } from 'svelte-apollo'
import gql from 'graphql-tag'
import { client } from '../data/apollo-client'
export let recipeId

let recipeQuery = query(client, {
  query: gql`
    query getRecipeForList($recipeId: uuid!) {
      recipe: recipe_by_pk(id: $recipeId) { id, name, user { id, username } }
    }
  `,
  variables: { recipeId }
})

</script>

{#await $recipeQuery}
  Recette
{:then { data: { recipe } } }
  <a href="/recipes/{recipe.id}">
    <div>
      {recipe.name}
    </div>
    <slot></slot>
  </a>
{/await }

<style>
a {
  display: block;
  border: rgb(var(--PRIMARY_COLOR)) solid 1px;
  border-radius: 0.5em;
  padding: 0.5em;
  text-decoration: none;
}
</style>