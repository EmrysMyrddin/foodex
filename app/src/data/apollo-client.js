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
  return fetch(`${uri}?op=${operationName}`, {
    ...options,
    headers: sessionStorage.token && { authorization: `Bearer ${sessionStorage.token}` }
  })
}

console.log(process.env.GRAPHQL_ENDPOINT || "http://localhost:8080/v1/graphql")

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT || "http://localhost:8080/v1/graphql",
  fetch: customFetch,
})

export const userId = () => get(userIdStore)