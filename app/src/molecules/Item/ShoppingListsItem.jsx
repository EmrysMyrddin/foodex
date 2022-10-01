import React from "react"
import { capitalizeFirstLetter } from "../../helper/helper"
import FoodexCard from "../FoodexCard"

export default function ShoppingListsItem({ item }) {
  return (
    <>
      <FoodexCard
        cover={
          <div className="label">
            <p>
              {capitalizeFirstLetter(item.name)} ({item.recipes.length} recettes)
            </p>
          </div>
        }
      />
    </>
  )
}
