export const login = /* GraphQL */ `
  query ($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      token
      userId
    }
  }
`
