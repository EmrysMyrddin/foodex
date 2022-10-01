import React from "react"
import { Saison } from "../../components/icons/saison"
import { capitalizeFirstLetter, toIcon } from "../../helper/helper"
import FoodexCard from "../FoodexCard"
import * as icons from "../../components/icons"

export default function IngredientsItem({ item }) {
  const allYear = item?.saison_ingredients?.map((s) => s.saison.name).includes("all-year")
  return (
    <>
      <FoodexCard
        cover={
          <div className="label">
            {item.category?.diet_category.diet.name === "vegan" ? (
              <icons.VeganIcon />
            ) : item.category?.diet_category.diet.name === "vegetarian" ? (
              <icons.VegetarianIcon />
            ) : (
              ""
            )}
            <p>{capitalizeFirstLetter(item.name)}</p>
          </div>
        }
        img={item?.url_img ? <img src={item.url_img} alt={item.name} /> : <></>}
        description={
          <div className="flex justify-start items-center">
            <Saison
              spring={allYear || item?.saison_ingredients?.map((s) => s.saison.name).includes("spring")}
              summer={allYear || item?.saison_ingredients?.map((s) => s.saison.name).includes("summer")}
              fall={allYear || item?.saison_ingredients?.map((s) => s.saison.name).includes("fall")}
              winter={allYear || item?.saison_ingredients?.map((s) => s.saison.name).includes("winter")}
            />
            {item.category && toIcon(item.category.name)}
          </div>
        }
      />
    </>
  )
}
