export const shoppingLists = /* GraphQL */ `
  query ($where: shopping_list_bool_exp) {
    shopping_list(order_by: { created_at: desc }, where: $where) {
      id
      name
      recipes {
        id
      }
    }
  }
`

export const shoppingListIngredients = /* GraphQL */ `
  query ($id: uuid!) {
    shopping_list_by_pk(id: $id) {
      id
      name
      recipes(order_by: { recipe: { name: asc } }) {
        id
        prepared
        qte
        recipeId
        recipe {
          name
          id
          img_url
          ingredients {
            id
            ingredient {
              id
              category {
                id
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
        }
      }
      ingredients(order_by: { ingredient: { name: asc } }) {
        ingredient_id
        sum
        unit {
          id
          name
        }
        ingredient {
          id
          name
          url_img
          category {
            id
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
    }
  }
`

export const updated_shopping_list_entry_prepared = /* GraphQL */ `
  mutation ($recipeId: uuid!, $shoppingListId: uuid!, $prepared: Boolean) {
    update_shopping_list_entry(
      where: { recipeId: { _eq: $recipeId }, shoppingListId: { _eq: $shoppingListId } }
      _set: { prepared: $prepared }
    ) {
      affected_rows
      returning {
        id
        prepared
        qte
      }
    }
  }
`
