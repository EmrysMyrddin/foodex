import { createClient } from 'urql';

export const client = createClient({
  url: process.env.GRAPHQL_ENDPOINT || "http://192.168.1.48:8080/v1/graphql",
  fetchOptions: () => {
    const headers = localStorage.token ? {'authorization': `Bearer ${localStorage.token}`} : null
    return {
      headers
    };
  },
});