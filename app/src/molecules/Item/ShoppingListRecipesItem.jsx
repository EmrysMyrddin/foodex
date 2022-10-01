import { BorderOutlined, CheckSquareOutlined, DeleteOutlined } from "@ant-design/icons"
import { Button, Spin } from "antd"
import React from "react"
import { useParams } from "react-router-dom"
import { useMutation, useQuery } from "urql"
import { shoppingListIngredients, updated_shopping_list_entry_prepared } from "../../data/shopping-lists"
import { capitalizeFirstLetter } from "../../helper/helper"
import FoodexCard from "../FoodexCard"
import * as icons from "../../components/icons"

export default function ShoppingListRecipesItem({ item }) {
  const { id } = useParams("id")
  const [resultAdd, updatedShoppingListEntryPrepared] = useMutation(updated_shopping_list_entry_prepared)

  const onClick = async (e, recipeId, shoppingListId, prepared) => {
    e.preventDefault()
    await updatedShoppingListEntryPrepared({
      recipeId: recipeId,
      shoppingListId: shoppingListId,
      prepared: prepared,
    })
  }

  const [result] = useQuery({
    query: shoppingListIngredients,
    variables: { id },
  })

  const { data, fetching, error } = result

  if (fetching) return <Spin />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <FoodexCard
        cover={
          <div className="label">
            {item.recipe.ingredients.length < 1 ||
            item.recipe.ingredients.filter((i) => i.ingredient.category?.diet_category?.diet.name === "carnivorous")
              .length > 0 ||
            item.recipe.ingredients.filter((i) => i.ingredient.category?.diet_category?.diet === undefined).length >
              0 ? (
              ""
            ) : item.recipe.ingredients.filter((i) => i.ingredient.category?.diet_category?.diet.name === "vegetarian")
                .length > 0 ? (
              <icons.VegetarianIcon />
            ) : (
              <icons.VeganIcon />
            )}
            <p>
              {capitalizeFirstLetter(item.recipe.name)} (x
              {item.qte})
            </p>
          </div>
        }
        img={<img src={item.recipe.img_url} alt={item.recipe.name} />}
        description={
          <div className="body-container">
            {(!item.prepared && (
              <Button
                type="text"
                icon={<BorderOutlined />}
                loading={resultAdd.fetching}
                onClick={(e) => onClick(e, item.recipe.id, data.shopping_list_by_pk.id, true)}
              />
            )) || (
              <Button
                type="text"
                icon={<CheckSquareOutlined />}
                loading={resultAdd.fetching}
                onClick={(e) => onClick(e, item.recipe.id, data.shopping_list_by_pk.id, false)}
              />
            )}
            <Button type="text" icon={<DeleteOutlined />} />
          </div>
        }
      />
    </>
  )
}
