export const ingredients = `
    query($where: ingredient_bool_exp) {
        ingredient(
            order_by: {name: asc}, 
            where: $where
        ) {
            id
            name
            url_img
            diet {
                id
                name
            }
            nutrition {
                calorie
                carb
                fibre
                id
                lipid
                protein
                water
            }
            category {
                id
                name
            }
            saison_ingredients {
                id
                saison {
                  id
                  name
                  description
                }
            }
        }
    }
`;

export const ingredient = `
    query($id: uuid!) {
        ingredient_by_pk(id:  $id) {
            id
            name
            url_img
            diet {
                id
                name
            }
            nutrition {
                calorie
                carb
                fibre
                id
                lipid
                protein
                water
            }
            category {
                id
                name
            }
        }
    }
`