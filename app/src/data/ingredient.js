export const ingredients = /* GraphQL */ `
  query ($where: ingredient_bool_exp) {
    ingredient(order_by: { name: asc }, where: $where) {
      id
      name
      url_img
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
        diet_category {
          id
          diet {
            id
            name
          }
        }
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
`

export const ingredient = /* GraphQL */ `
  query ($id: uuid!) {
    ingredient_by_pk(id: $id) {
      id
      name
      url_img
      unit_ingredients {
        id
        value
        unit {
          id
          name
          short
        }
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
        diet_category {
          id
          diet {
            id
            name
          }
        }
      }
    }
  }
`

export const insert_one_ingredient = /* GraphQL */ `
  mutation ($category_id: uuid, $name: String, $url_img: String) {
    insert_ingredient_one(object: { category_id: $category_id, name: $name, url_img: $url_img }) {
      id
    }
  }
`
