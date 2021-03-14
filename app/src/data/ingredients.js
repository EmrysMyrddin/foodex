import { client } from './apollo-client'
import gql from 'graphql-tag'
import { query, mutate } from 'svelte-apollo'

export function getIngredient(ingredientId) {
  return query(client, {
    query: gql`
      query getIngredient($ingredientId: uuid!) {
        ingredient: ingredient_by_pk(id: $ingredientId) {
          id, name
        }
      }
    `,
    variables: { ingredientId }
  })
}

export async function createIngredient(name) {
  const result = await client.mutate({
    mutation: gql`
      mutation createIgredient($name: String!) {
        ingredient: insert_ingredient_one(object: { name: $name }) {
          id, name
        }
      }
    `,
    variables: { name }
  })

  return result.data.ingredient
}

export async function searchIngredients(searchText = '') {
  const { data: { ingredient } } = await client.query({
    query: gql`
      query searchIngredients($searchText: String) {
        ingredient(where: { name: { _ilike: $searchText } }) {
          id, name
        }
      }
    `,
    variables: { searchText: `%${searchText}%` }
  })

  return ingredient
}

export async function deleteIngredient(ingredientId) {
  return mutate(client, {
    mutation: gql`
      mutation deleteIngredient($ingredientId: uuid) {
        id
      }
    `
  })
}

export function listIngredients() {
  return query(client, {
    query: gql`
      query listIngredients {
        ingredient(order_by: { name: asc }) { id, name }
      }
    `
  })
}

export async function setName(ingredientId, name) {
  return mutate(client, {
    mutation: gql`
      mutation setIngredientName($ingredientId: uuid!, $name: String) {
        update_ingredient_by_pk(pk_columns: { id: $ingredientId }, _set: { name: $name }) {
          id, name
        }
      }
    `,
    variables: { ingredientId, name }
  })
}
