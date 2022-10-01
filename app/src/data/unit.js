export const units = /* GraphQL */ `
  query {
    unit(order_by: { name: asc }) {
      id
      name
      short
    }
  }
`
