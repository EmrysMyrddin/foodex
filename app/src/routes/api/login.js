import jwt from 'jsonwebtoken'
import gql from 'graphql-tag'
import { client } from '../../data/apollo-client'

export async function post(req, res, next) {
  const { username, password } = req.body

  const { data: { user: [ user ] } } = await client.query({
    query: gql`
      query getUser($username: String, $password: String) {
        user(where:{ _and: [
            { username: { _eq: $username } },
            { password: { _eq: $password } }
        ] }) {
          id
        }
      }
    `,
    variables: { username, password }
  })

  const claims = {
    sub: user.id,
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-id': user.id,
    },
  }

  const token = jwt.sign(
    claims,
    process.env.JWT_SECRET || 'this is a secret developpement key',
  )

  res.end(token)
}


