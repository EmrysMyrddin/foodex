export const categories = /* GraphQL */ `
  query {
    category(order_by: { name: asc }) {
      description
      id
      name
    }
  }
`
