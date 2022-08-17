export const units = `
    query{
        unit(
          order_by: {name: asc},
        ) {
            id
            name
            short
        }
    }
`
