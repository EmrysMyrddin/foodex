export const ingredients = `
    query {
        ingredient {
            id
            name
            url_img
        }
    }
`;

export const ingredient = `
    query($id: uuid!) {
        ingredient_by_pk(id:  $id) {
            id
            name
            url_img
        }
    }
`