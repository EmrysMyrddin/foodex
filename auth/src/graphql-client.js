const fetch = require('node-fetch')
const { error } = require('./errors')

module.exports = {
  query
}

const hasuraUrl = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/v1/graphql'
const hasuraAdminSecret = process.env.HASURA_ADMIN_SECRET || 'dev'

async function query (q) {
  const response = await fetch(hasuraUrl, {
    method: 'POST',
    body: JSON.stringify(q),
    headers: { 'x-hasura-role': 'auth', 'x-hasura-admin-secret': hasuraAdminSecret }
  })

  await checkResponseStatus(response)

  const graphqlResponse = await response.json()

  if (graphqlResponse.errors) {
    throw error(500, `GraphQL errors: ${JSON.stringify(graphqlResponse.errors, 0, 2)}`, { expose: false })
  }

  return graphqlResponse
}

async function checkResponseStatus (response) {
  if (!response.ok) {
    let message = `Fetch error: [${response.status} ${response.statusText}] `
    try {
      message += await response.text()
    } catch (error) {
      message += 'no body'
    }
    throw error(500, message, { expose: false })
  }
}
