import { client, userId } from './apollo-client'
import gql from 'graphql-tag'
import { query, mutate } from 'svelte-apollo'

export function listShoppingLists() {
  return query(client, {
    query: gql`
      query listShoppingLists($userId: uuid!) {
        user: user_by_pk(id: $userId) {
          ...shoppingLists
        }
      }
      ${shoppingListsFragment}
    `,
    variables: { userId: userId() }
  })
}

export async function createShoppingList(name) {
  return mutate(client, {
    mutation: gql`
      mutation createShoppingList($name: String) {
        insert_shopping_list_one(object: { name: $name }) {
          user { ...shoppingLists }
        }
      }
      ${shoppingListsFragment}
    `,
    variables: { name }
  })
}

export function getShoppingList(shoppingListId) {
  return query(client, {
    query: gql`
      query getShoppingList($shoppingListId: uuid!) {
        shoppingList: shopping_list_by_pk(id: $shoppingListId) {
          id, name, ...recipesFragment
        }
      }

      ${recipesFragment}
    `,
    variables: { shoppingListId }
  })
}

export async function addRecipe(shoppingListId, recipeId, qte) {
  return mutate(client, {
    mutation: gql`
      mutation addRecipe($recipeId: uuid, $qte: Int, $shoppingListId: uuid) {
        insert_shopping_list_entry_one(object: { qte: $qte, recipeId: $recipeId, shoppingListId: $shoppingListId}) {
          shopping_list { id, ...recipesFragment }
        }
      }

      ${recipesFragment}
    `,
    variables: { recipeId, shoppingListId, qte }
  })
}

export async function searchShoppingLists(searchText) {
  const { data: { shoppingLists } } = await client.query({
    query: gql`
      query searchShoppingList($searchText: String!) {
        shoppingLists: shopping_list(where: { name: { _ilike: $searchText } }) {
          id, name
        }
      }
    `,
    variables: { searchText: `%${searchText}%` },
  })

  return shoppingLists
}

export async function setRecipePrepared(shoppingListEntryId, prepared) {
  await client.mutate({
    mutation: gql`
      mutation setRecipePrepared($shoppingListEntryId: uuid!, $prepared: Boolean) {
        update_shopping_list_entry_by_pk(
          pk_columns: { id: $shoppingListEntryId }
          _set: { prepared: $prepared}
        ) {
          id, prepared
          shopping_list { id, ...ingredientsFragment }
        }
      }
      ${recipesFragment}
    `,
    variables: { shoppingListEntryId, prepared }
  })
}

const shoppingListsFragment = gql`
  fragment shoppingLists on user {
    id
    shopping_lists {
      id, name
      recipes_aggregate { aggregate { count } }
    }
  }
`

const ingredientsFragment = gql`
  fragment ingredientsFragment on shopping_list {
    ingredients(order_by: { ingredient: { name: asc } }) {
      qte, unit ingredientId
    }
  }
`

const recipesFragment = gql`
  fragment recipesFragment on shopping_list {
    recipes {
      id, qte, prepared
      recipe { id, name }
    }
    ...ingredientsFragment
  }
  ${ingredientsFragment}
`
