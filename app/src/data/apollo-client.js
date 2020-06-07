import { get } from 'svelte/store'
import ApolloClient from 'apollo-boost'
import { userId as userIdStore } from '../stores/user-id'

if(typeof fetch !== 'function') {
  global.fetch = require('node-fetch')
}

if(typeof sessionStorage !== 'object') {
  global.sessionStorage = {}
}

const customFetch = (uri, options) => {
  const operationName = JSON.parse(options.body).operationName || ''

  const headers = {}
  if(sessionStorage.token) headers.authorization = `Bearer ${sessionStorage.token}`
  if(typeof process === 'object' && process.env.HASURA_ADMIN_SECRET) headers['x-hasura-admin-secret'] = process.env.HASURA_ADMIN_SECRET

  return fetch(`${uri}?op=${operationName}`, { ...options, headers })
}

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT || "http://localhost:8080/v1/graphql",
  fetch: customFetch,
})

export const userId = () => get(userIdStore)