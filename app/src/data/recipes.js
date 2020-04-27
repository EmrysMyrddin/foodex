import { query, mutate } from 'svelte-apollo'
import gql from 'graphql-tag'
import { client, userId } from './apollo-client'
import { nonInputTypeOnVarMessage } from 'graphql/validation/rules/VariablesAreInputTypes'

export function listRecipes() {
  return query(client, {
    query: gql`
      query listRecipes {
        recipe(order_by: { name: asc }) {
          id, name
          user { id, username }
        }
      }
    `,
    fetchPolicy: 'cache-and-network',
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
          user { id, username }
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

export function addIngredient(recipeId, recipeIngredient) {
  console.log(recipeId, recipeIngredient)
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
  const { data: { createdRecipe } } = await mutate(client, {
    mutation: gql`
      mutation createRecipe($name: String!) {
        createdRecipe: insert_recipe_one(object: { name: $name, description: "" }) {
          id, name
        }
      }
    `,
    variables: { name }
  })
  return createdRecipe
}

export function removeIngredient(recipeIngredientId) {
  return mutate(client, {
    mutation: gql`
      mutation removeRecipeIngredient($recipeIngredientId: uuid!) {
        delete_recipe_ingredient_by_pk(id: $recipeIngredientId) {
          recipe {
            id
            ingredients { id }
          }
        }
      }
    `,
    variables: { recipeIngredientId }
  })
}