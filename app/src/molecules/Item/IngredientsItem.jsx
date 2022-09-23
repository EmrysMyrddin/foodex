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
          <div className="flex justify-center items-center">
            {item.category.diet_category.diet.name === "vegan" ? (
              <icons.VeganIcon />
            ) : item.category.diet_category.diet.name === "vegetarian" ? (
              <icons.VegetarianIcon />
            ) : (
              ""
            )}
            <p className="justify-self-end">{capitalizeFirstLetter(item.name)}</p>
          </div>
        }
        img={item?.url_img ? <img className=" h-40 w-60 object-cover" src={item.url_img} alt={item.name} /> : <></>}
        description={
          <div className="flex justify-start items-center">
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
