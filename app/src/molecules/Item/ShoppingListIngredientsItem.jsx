import React from "react"
import { capitalizeFirstLetter } from "../../helper/helper"
import FoodexCard from "../FoodexCard"
import * as icons from "../../components/icons"
import { useIntl } from "react-intl"

export default function ShoppingListsIngredientsItem({ item }) {
  const { formatMessage } = useIntl()

  return (
    <>
      <FoodexCard
        cover={
          <>
            <div className="label">
              {item.ingredient.category.diet_category.diet.name === "vegan" ? (
                <icons.VeganIcon />
              ) : item.ingredient.category.diet_category.diet.name === "vegetarian" ? (
                <icons.VegetarianIcon />
              ) : (
                ""
              )}
              <p>{capitalizeFirstLetter(item.ingredient.name)}</p>
            </div>
          </>
        }
        img={<img src={item.ingredient.url_img} alt={item.ingredient.name} />}
        description={
          <div className="body-container">
            <p>{formatMessage({ id: item.unit.name }, { count: item.sum })}</p>
          </div>
        }
      />
    </>
  )
}
