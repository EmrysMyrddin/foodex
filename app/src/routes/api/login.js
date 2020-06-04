import jwt from 'jsonwebtoken'
import gql from 'graphql-tag'
import { client } from '../../data/apollo-client'

export async function post(req, res, next) {
  const { username, password } = req.body.input || req.body

  const { data: { user: users } } = await client.query({
    query: gql`
      query getUser($username: String, $password: String) {
        user(where:{ _and: [
            { username: { _eq: $username } },
            { password: { _eq: $password } }
        ] }) {
          id, username
        }
      }
    `,
    variables: { username, password }
  })


  const [{id: userId}] = users

  const claims = {
    sub: userId,
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-id': userId,
    },
  }

  const token = jwt.sign(
    claims,
    process.env.JWT_SECRET || 'this is a secret developpement key',
  )

  res.writeHeader(200, { 'content-type': 'application/json' })
  res.end(JSON.stringify({ userId, token }))
}


