export const recipes = `
    query($where: recipe_bool_exp) {
        recipe(
            order_by: {name: asc}, 
            where: $where
        ) {
            id
            description
            name
            img_url
            tag_recipes {
              id
              tag {
                description
                id
                name
              }
            }
            ingredients {
              id
              ingredient {
                id
                category {
                  id
                  diet_category{
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
`;



export const recipe = `
    query($id: uuid!) {
        recipe_by_pk(id:  $id) {
            id
            description
            name
            img_url
            tag_recipes {
              id
              tag {
                description
                id
                name
              }
            }
            recipe_needed_recipes {
              id
              qte
              recipeByNeededRecipeId {
                id
                name
                img_url
                ingredients {
                  id
                  ingredient {
                    category {
                      diet_category {
                        diet {
                          id
                          name
                        }
                        id
                      }
                      id
                    }
                  }
                }
                
              }
              unit {
                id
                name
              }
            }
            ingredients(order_by: {ingredient: {name: asc}}) {
              id
              ingredient {
                id
                name
                url_img
                recipe_ingredients {
                  id
                  qte
                  unit {
                    id
                    name
                  }
                }
                category {
                  id
                  diet_category{
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