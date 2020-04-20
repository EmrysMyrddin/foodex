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

const shoppingListsFragment = gql`
  fragment shoppingLists on user {
    id
    shopping_lists {
      id, name
      recipes_aggregate { aggregate { count } }
    }
  }
`

const recipesFragment = gql`
  fragment recipesFragment on shopping_list {
    recipes {
      id, qte,
      recipe { id, name }
    }
    ingredients {
      qte, unit
      ingredientId
    }
  }
`