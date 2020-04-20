import { query, mutate } from 'svelte-apollo'
import gql from 'graphql-tag'
import { client, userId } from './apollo-client'
import { nonInputTypeOnVarMessage } from 'graphql/validation/rules/VariablesAreInputTypes'

export function listRecipes() {
  return query(client, {
    query: gql`
      query getRecipesList($userId: uuid!) {
        user: user_by_pk(id: $userId) {
          id
          recipes { id name }
        }
      }
    `,
    variables: {
      userId: userId()
    }
  })
}

export function getRecipe(recipeId) {
  return query(client, {
    query: gql`
      query getRecipe($recipeId: uuid!) {
        recipe: recipe_by_pk(id: $recipeId) {
          id
          name, description
          ingredients { id, ingredientId, qte, unit }
        }
      }
    `,
    variables: {
      recipeId
    }
  })
}

export function setName(recipeId, name) {
  return mutate(client, {
    mutation: gql`
      mutation setRecipeName($recipeId: uuid!, $name: String!) {
        update_recipe_by_pk(pk_columns: { id: $recipeId }, _set: { name: $name }) {
          name, id
        }
      }
    `,
    variables: { recipeId, name }
  })
}

export function setDescription(recipeId, description) {
  return mutate(client, {
    mutation: gql`
      mutation setRecipeDescription($recipeId: uuid!, $description: String!) {
        update_recipe_by_pk(pk_columns: { id: $recipeId }, _set: { description: $description }) {
          description, id
        }
      }
    `,
    variables: { recipeId, description }
  })
}

export function addIngredient(recipe_id, recipeIngredient) {
  console.log(recipe_id, recipeIngredient)
  return mutate(client, {
    mutation: gql`
      mutation addIngredient($recipeIngredient: recipe_ingredient_insert_input!) {
        insert_recipe_ingredient_one(object: $recipeIngredient) {
          recipe {
            id
            ingredients { id, ingredientId, qte, unit }
          }
        }
      }
    `,
    variables: { recipeIngredient: { ...recipeIngredient, recipeId } }
  })
}

export async function searchRecipe(searchText) {
  const { data: { recipe } } = await client.query({
    query: gql`
      query searchRecipes($searchText: String) {
        recipe(where: { name: { _ilike: $searchText } }) {
          id, name
        }
      }
    `,
    variables: { searchText: `%${searchText}%` }
  })

  return recipe
}

export async function deleteRecipe(recipeId) {
  return mutate(client, {
    mutation: gql`
      mutation deleteRecipe($recipeId: uuid!) {
        delete_recipe_by_pk(id: $recipeId) {
          user {
            id,
            recipes { id, name }
          }
        }
      }
    `
  })
}

export async function createRecipe(name) {
  return mutate(client, {
    mutation: gql`
      mutation createRecipe($name: String!) {
        insert_recipe_one(object: { name: $name, description: "" }) {
          user {
            id
            recipes { id, name }
          }
        }
      }
    `,
    variables: { userId, name }
  })
}