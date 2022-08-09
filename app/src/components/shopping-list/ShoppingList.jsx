import React from "react"
import { shoppingListIngredients, updated_shopping_list_entry_prepared } from "../../data/shopping-lists"
import { useMutation, useQuery } from "urql"
import { Spin, Button } from "antd"
import { Link, useParams } from "react-router-dom"
import { capitalizeFirstLetter } from "../../helper/helper"
import "./shopping-list.css"
import * as icons from "../icons"
import { CheckSquareOutlined, BorderOutlined, DeleteOutlined } from "@ant-design/icons"
import FoodexCard from "../../molecules/FoodexCard"
import { useIntl } from "react-intl"

export default function ShoppingList() {
  const { id } = useParams("id")
  const { formatMessage } = useIntl()

  const [result] = useQuery({
    query: shoppingListIngredients,
    variables: { id },
  })

  const [resultAdd, updatedShoppingListEntryPrepared] = useMutation(updated_shopping_list_entry_prepared)

  const { data, fetching, error } = result

  if (fetching) return <Spin />
  if (error) return <p>Oh no... {error.message}</p>

  const onClick = async (e, recipeId, shoppingListId, prepared) => {
    e.preventDefault()
    await updatedShoppingListEntryPrepared({
      recipeId: recipeId,
      shoppingListId: shoppingListId,
      prepared: prepared,
    })
  }

  console.log(data.shopping_list_by_pk.ingredients[0].ingredient)

  return (
    <div className="shopping-list">
      <div className="title-shopping-list">
        <h1>
          {data.shopping_list_by_pk.name} ({data.shopping_list_by_pk.recipes.length} recettes)
        </h1>
      </div>
      <div className="container">
        <h2>Recettes à préparer</h2>
        <div className="lists">
          {data.shopping_list_by_pk.recipes
            .filter((recipe) => !recipe.prepared)
            .map((recipe) => (
              <div key={recipe.recipe.id}>
                <Link to={`/recipes/${recipe.recipe.id}`} className="grid">
                  <FoodexCard
                    cover={
                      <>
                        <div className="label">
                          {recipe.recipe.ingredients.length < 1 ||
                          recipe.recipe.ingredients.filter(
                            (i) => i.ingredient.category.diet_category?.diet.name === "carnivorous"
                          ).length > 0 ||
                          recipe.recipe.ingredients.filter(
                            (i) => i.ingredient.category.diet_category?.diet === undefined
                          ).length > 0 ? (
                            ""
                          ) : recipe.recipe.ingredients.filter(
                              (i) => i.ingredient.category.diet_category?.diet.name === "vegetarian"
                            ).length > 0 ? (
                            <icons.VegetarianIcon />
                          ) : (
                            <icons.VeganIcon />
                          )}
                          <p>
                            {capitalizeFirstLetter(recipe.recipe.name)} (x
                            {recipe.qte})
                          </p>
                        </div>
                      </>
                    }
                    img={<img src={recipe.recipe.img_url} alt={recipe.recipe.name} />}
                    description={
                      <div className="body-container">
                        {!recipe.prepared && (
                          <Button
                            type="text"
                            icon={<BorderOutlined />}
                            loading={resultAdd.fetching}
                            onClick={(e) => onClick(e, recipe.recipe.id, data.shopping_list_by_pk.id, true)}
                          />
                        )}
                        <Button type="text" icon={<DeleteOutlined />} />
                      </div>
                    }
                  />
                </Link>
              </div>
            ))}
        </div>
        <h2>Ingredients</h2>
        <div className="lists">
          {data.shopping_list_by_pk.ingredients.map((ingredient) => (
            <div key={ingredient.ingredient.id}>
              <Link to={`/ingredients/${ingredient.ingredient.id}`} className="grid">
                <FoodexCard
                  cover={
                    <>
                      <div className="label">
                        {ingredient.ingredient.category.diet_category.diet.name === "vegan" ? (
                          <icons.VeganIcon />
                        ) : ingredient.ingredient.category.diet_category.diet.name === "vegetarian" ? (
                          <icons.VegetarianIcon />
                        ) : (
                          ""
                        )}
                        <p>{capitalizeFirstLetter(ingredient.ingredient.name)}</p>
                      </div>
                    </>
                  }
                  img={<img src={ingredient.ingredient.url_img} alt={ingredient.ingredient.name} />}
                  description={
                    <div className="body-container">
                      <p>{formatMessage({ id: ingredient.unit.name }, { count: ingredient.sum })}</p>
                    </div>
                  }
                />
              </Link>
            </div>
          ))}
        </div>
        {data.shopping_list_by_pk.recipes.filter((recipe) => recipe.prepared).length > 0 && <h2>Recettes préparées</h2>}
        <div className="lists">
          {data.shopping_list_by_pk.recipes
            .filter((recipe) => recipe.prepared)
            .map((recipe) => (
              <div key={recipe.recipe.id}>
                <Link to={`/recipes/${recipe.recipe.id}`} className="grid">
                  <FoodexCard
                    cover={
                      <>
                        <div className="label">
                          {recipe.recipe.ingredients.length < 1 ||
                          recipe.recipe.ingredients.filter(
                            (i) => i.ingredient.category.diet_category?.diet.name === "carnivorous"
                          ).length > 0 ||
                          recipe.recipe.ingredients.filter(
                            (i) => i.ingredient.category.diet_category?.diet === undefined
                          ).length > 0 ? (
                            ""
                          ) : recipe.recipe.ingredients.filter(
                              (i) => i.ingredient.category.diet_category?.diet.name === "vegetarian"
                            ).length > 0 ? (
                            <icons.VegetarianIcon />
                          ) : (
                            <icons.VeganIcon />
                          )}
                          <p>
                            {capitalizeFirstLetter(recipe.recipe.name)} (x
                            {recipe.qte})
                          </p>
                        </div>
                      </>
                    }
                    img={<img src={recipe.recipe.img_url} alt={recipe.recipe.name} />}
                    description={
                      <div className="body-container">
                        {recipe.prepared && (
                          <Button
                            type="text"
                            icon={<CheckSquareOutlined />}
                            loading={resultAdd.fetching}
                            onClick={(e) => onClick(e, recipe.recipe.id, data.shopping_list_by_pk.id, false)}
                          />
                        )}
                        <Button type="text" icon={<DeleteOutlined />} />
                      </div>
                    }
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
