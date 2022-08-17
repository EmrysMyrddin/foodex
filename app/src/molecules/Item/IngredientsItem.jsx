import React from "react"
import { saison } from "../../components/icons/saison"
import { capitalizeFirstLetter, toIcon } from "../../helper/helper"
import FoodexCard from "../FoodexCard"
import * as icons from "../../components/icons"

export default function IngredientsItem({ item }) {
  return (
    <>
      <FoodexCard
        cover={
          <div className="label">
            {item.category.diet_category.diet.name === "vegan" ? (
              <icons.VeganIcon />
            ) : item.category.diet_category.diet.name === "vegetarian" ? (
              <icons.VegetarianIcon />
            ) : (
              ""
            )}
            <p>{capitalizeFirstLetter(item.name)}</p>
          </div>
        }
        img={item?.url_img ? <img src={item.url_img} alt={item.name} /> : <></>}
        description={
          <div className="icons">
            {saison(
              item?.saison_ingredients?.map((s) => s.saison.name).includes("spring") ||
                item?.saison_ingredients?.map((s) => s.saison.name).includes("all-year"),
              item?.saison_ingredients?.map((s) => s.saison.name).includes("summer") ||
                item?.saison_ingredients?.map((s) => s.saison.name).includes("all-year"),
              item?.saison_ingredients?.map((s) => s.saison.name).includes("fall") ||
                item?.saison_ingredients?.map((s) => s.saison.name).includes("all-year"),
              item?.saison_ingredients?.map((s) => s.saison.name).includes("winter") ||
                item?.saison_ingredients?.map((s) => s.saison.name).includes("all-year")
            )}
            {toIcon(item.category?.name)}
          </div>
        }
      />
    </>
  )
}
