const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { query } = require('./graphql-client')
const { error } = require('./errors')

module.exports = {
  createUser,
  login
}

const saltRounds = Number(process.env.SALT_ROUNDS) || 10

async function createUser ({ username, password }) {
  if (await getUser(username)) throw error(400, 'username already exists')

  const { id: userId } = await insertUser({
    username, password: await hashPassword(password)
  })

  return { userId, token: createJWToken(userId) }
}

async function login ({ username, password }) {
  const user = await getUser(username)

  if (!await checkUserPassword(user, password)) throw error(401, 'wrong username or password')

  return { userId: user.id, token: createJWToken(user.id) }
}

async function getUser (username) {
  const { data: { user: [user] } } = await query({
    query: `query($username: String!) {
      user(where: { username: { _eq: $username } }) {
        id, password
      }
    }`,
    variables: { username }
  })

  return user
}

async function insertUser (userInput) {
  const { data: { user } } = await query({
    query: `mutation($username: String!, $password: String!) {
      user: insert_user_one(object: { username: $username, password: $password }) {
        id
      }
    }`,
    variables: userInput
  })

  return user
}

async function checkUserPassword (user, password) {
  if (!user) return false
  return bcrypt.compare(password, user.password)
}

function hashPassword (password) {
  return bcrypt.hash(password, saltRounds)
}

function createJWToken (userId) {
  return jwt.sign(
    {
      sub: userId,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': userId
      }
    },
    process.env.JWT_SECRET || 'this is a secret developpement key'
  )
}
