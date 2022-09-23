import React, { useState } from "react"
import { shoppingListIngredients } from "../../data/shopping-lists"
import { Button, Spin } from "antd"
import { useParams } from "react-router-dom"
import "./shopping-list.css"
import FoodexGrid from "../../organisms/FoodexGrid"
import ShoppingListRecipesItem from "../../molecules/Item/ShoppingListRecipesItem"
import { useMutation, useQuery } from "urql"
import ShoppingListsIngredientsItem from "../../molecules/Item/ShoppingListIngredientsItem"
import { ShoppingListFormModal } from "../../molecules/Modal/ShoppingListFormModal"
import { toast } from "react-toastify"
import { EditOutlined } from "@ant-design/icons"

export default function ShoppingList() {
  const { id } = useParams("id")

  const [createIngredientsResult, createIngredientsShoppingList] = useMutation(ADD_INGREDIENTS_SHOPPING_LIST_MUTATION)
  const [createRecipesResult, createRecipesShoppingList] = useMutation(ADD_RECIPES_SHOPPING_LIST_MUTATION)

  const [result] = useQuery({
    query: shoppingListIngredients,
    variables: { id },
  })

  const [editing, setEditing] = useState(false)

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

      <div className="add">
        <Button onClick={() => setEditing(true)} type="primary" size="large" shape="circle" icon={<EditOutlined />} />
      </div>
      <ShoppingListFormModal
        title="Modifier la liste de course"
        visible={editing}
        onCancel={() => setEditing(false)}
        confirmLoading={createIngredientsResult.fetching && createRecipesResult.fetching}
        onOk={async ({ ingredient_entries, recipes }) => {
          console.log(ingredient_entries)
          const resultIngredients = await createIngredientsShoppingList({
            ingredientsShoppingList: ingredient_entries.data.map((ie) => ({ ...ie, shoppingListId: id })),
          })
          const resultrecipes = await createRecipesShoppingList({
            recipesShoppingList: recipes.data.map((r) => ({ ...r, shoppingListId: id })),
          })
          if (resultIngredients.error || resultrecipes.error) {
            toast.error(resultIngredients.error.message || resultrecipes.error.message)
          } else {
            setEditing(false)
            toast.success("La liste de course a été mise à jour")
          }
        }}
        initialValues={data.shopping_list_by_pk}
      />
    </div>
  )
}

const ADD_INGREDIENTS_SHOPPING_LIST_MUTATION = /* GraphQL */ `
  mutation createIngredientsShoppingList($ingredientsShoppingList: [shopping_list_ingredient_entry_insert_input!]!) {
    insert_shopping_list_ingredient_entry(objects: $ingredientsShoppingList) {
      returning {
        id
      }
    }
  }
`

const ADD_RECIPES_SHOPPING_LIST_MUTATION = /* GraphQL */ `
  mutation createRecipesShoppingList($recipesShoppingList: [shopping_list_entry_insert_input!]!) {
    insert_shopping_list_entry(objects: $recipesShoppingList) {
      returning {
        id
      }
    }
  }
`
