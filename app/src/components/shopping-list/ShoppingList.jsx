import React from "react"
import { shoppingListIngredients } from "../../data/shopping-lists"
import { Spin } from "antd"
import { useParams } from "react-router-dom"
import "./shopping-list.css"
import FoodexGrid from "../../organisms/FoodexGrid"
import ShoppingListRecipesItem from "../../molecules/Item/ShoppingListRecipesItem"
import { useQuery } from "urql"
import ShoppingListsIngredientsItem from "../../molecules/Item/ShoppingListIngredientsItem"

export default function ShoppingList() {
  const { id } = useParams("id")

  const [result] = useQuery({
    query: shoppingListIngredients,
    variables: { id },
  })

  const { data, fetching, error } = result

  if (fetching) return <Spin />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="shopping-list">
      <div className="title-shopping-list">
        <h1>
          {data.shopping_list_by_pk.name} ({data.shopping_list_by_pk.recipes.length} recettes)
        </h1>
      </div>
      {data.shopping_list_by_pk.recipes.filter((recipe) => !recipe.prepared).length > 0 && <h2>Recettes à préparer</h2>}
      <FoodexGrid
        list={data.shopping_list_by_pk.recipes.filter((recipe) => !recipe.prepared)}
        link="/recipes/"
        linkId="recipeId"
        Item={ShoppingListRecipesItem}
      />
      <h2>Ingredients</h2>
      <FoodexGrid
        list={data.shopping_list_by_pk.ingredients}
        link="/ingredients/"
        linkId="ingredient_id"
        Item={ShoppingListsIngredientsItem}
      />
      {data.shopping_list_by_pk.recipes.filter((recipe) => recipe.prepared).length > 0 && <h2>Recettes préparées</h2>}
      <FoodexGrid
        list={data.shopping_list_by_pk.recipes.filter((recipe) => recipe.prepared)}
        link="/recipes/"
        Item={ShoppingListRecipesItem}
      />
    </div>
  )
}
