import { client, userId } from './apollo-client'
import { query, mutate} from 'svelte-apollo'
import gql from 'graphql-tag'

export function getUser() {
  return query(client, {
    query: gql`
      query getUser($userId: uuid!) {
        user: user_by_pk(id: $userId) {
          id, username,
          sharingWith { id, canWrite, sharedTo { id, username } }
          sharedBy { id, canWrite, sharedBy { id, username } }
        }
      }
    `,
    variables: { userId: userId() }
  })
}

export function setName(username) {
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

export async function listUsers(searchText) {
  const {data: { user } } = await client.query({
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
    variables: {userId: userId(), searchText: `%${searchText}%`}
  })

  return user
}

export function share(userId, canWrite) {
  return mutate(client, {
    mutation: gql`
      mutation share($userId: uuid!, $canWrite: Boolean) {
        insert_user_shares_one(object: { sharedToUserId: $userId, canWrite: $canWrite }) {
          sharedBy {
            id
            sharingWith { id, canWrite, sharedTo { id, username } }
          }
        }
      }
    `,
    variables: { userId, canWrite: Boolean(canWrite) }
  })
}