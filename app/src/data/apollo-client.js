import ApolloClient from 'apollo-boost'

if(typeof fetch !== 'function') {
  global.fetch = require('node-fetch')
}

if(typeof sessionStorage !== 'object') {
  global.sessionStorage = {}
}

const customFetch = (uri, options) => {
  const operationName = JSON.parse(options.body).operationName || ''
  return fetch(`${uri}?op=${operationName}`, {
    ...options,
    headers: sessionStorage.token && { authorization: `Bearer ${sessionStorage.token}` }
  })
}

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT || "http://localhost:8080/v1/graphql",
  fetch: customFetch,
})

export const userId = 'b59b20eb-562b-4510-a2ff-6e44805e08fe'