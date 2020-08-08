import { client, userId } from './apollo-client'
import { query, mutate } from 'svelte-apollo'
import gql from 'graphql-tag'

export function getUser () {
  return query(client, {
    query: gql`
      query getUser($userId: uuid!) {
        user: user_by_pk(id: $userId) {
          id, username,
          sharingWith { id }
          sharedBy { id, canWrite, canSeeShoppingLists, sharedBy { id, username } }
        }
      }
    `,
    variables: { userId: userId() }
  })
}

export function setName (username) {
  return mutate(client, {
    mutation: gql`
      mutation setUserName($username: String) {
        update_user(where: {}, _set: { username: $username }) {
          returning { id, username }
        }
      }
    `,
    variables: { username }
  })
}

export async function listUsers (searchText) {
  const { data: { user } } = await client.query({
    query: gql`
      query listAvailableUsers($userId: uuid!, $searchText: String) {
        user(where: { _and: [
          { id: { _neq: $userId } }
          { _not: { sharedBy: { ownerId: {_eq: $userId } } } }
          { username: { _ilike: $searchText }}
        ] }) {
          id, username
        }
      }
    `,
    variables: { userId: userId(), searchText: `%${searchText}%` }
  })

  return user
}

export function share (userId, canWrite, canSeeShoppingLists) {
  return mutate(client, {
    mutation: gql`
      mutation share($userId: uuid!, $canWrite: Boolean, $canSeeShoppingLists: Boolean) {
        insert_user_shares_one(object: { sharedToUserId: $userId, canWrite: $canWrite, canSeeShoppingLists: $canSeeShoppingLists }) {
          sharedBy {
            id
            sharingWith { id, canWrite, canSeeShoppingLists, sharedTo { id, username } }
          }
        }
      }
    `,
    variables: { userId, canWrite: Boolean(canWrite), canSeeShoppingLists: Boolean(canSeeShoppingLists) }
  })
}

export async function login (username, password) {
  await client.clearStore()

  const { data: { login } } = await client.query({
    query: gql`
      query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          userId
        }
      }
    `,
    variables: { username, password }
  })

  return login
}

export function getSharing (sharingId) {
  return query(client, {
    query: gql`
      query getUser($sharingId: uuid!) {
        sharing: user_shares_by_pk(id: $sharingId) {
          id, canWrite, canSeeShoppingLists, sharedTo { id, username }
        }
      }
    `,
    variables: { sharingId }
  })
}

export function updateSharing (sharingId, set) {
  return mutate(client, {
    mutation: gql`
      mutation updateSharing($set: user_shares_set_input!, $sharingId: uuid!) {
        update_user_shares_by_pk(pk_columns: { id: $sharingId }, _set: $set) {
          id, canSeeShoppingLists, canWrite, sharedTo { id, username }
        }
      }
    `,
    variables: { sharingId, set }
  })
}
