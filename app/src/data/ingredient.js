export const ingredients = `
    query($searchText: String) {
        ingredient(order_by: {name: asc}, where: {name: {_ilike: $searchText}}) {
            id
            name
            url_img
            isVegetable
            isAnimalProduct
            isAnimal
            nutrition {
              calorie
              carb
              fibre
              id
              lipid
              protein
              water
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
            isVegetable
            isAnimalProduct
            isAnimal
            nutrition {
              calorie
              carb
              fibre
              id
              lipid
              protein
              water
            }
        }
    }
`