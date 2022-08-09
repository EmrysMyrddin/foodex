export const categories = `
    query {
        category(order_by: {name: asc}) {
            description
            id
            name
        }
    }
`
