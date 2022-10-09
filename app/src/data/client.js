import { createClient } from "urql"

export const client = createClient({
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT || "/v1/graphql",
  fetchOptions: () => {
    const headers = localStorage.token ? { authorization: `Bearer ${localStorage.token}` } : null
    return {
      headers,
    }
  },
})
