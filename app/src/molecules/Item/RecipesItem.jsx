import React from "react"
import { capitalizeFirstLetter } from "../../helper/helper"
import FoodexCard from "../FoodexCard"
import * as icons from "../../components/icons"
import { Tag } from "antd"

export default function RecipesItem({ item }) {
  return (
    <>
      <FoodexCard
        cover={
          <div className="label">
            {item.ingredients.length < 1 ||
            item.ingredients.filter((i) => i.ingredient.category.diet_category?.diet.name === "carnivorous").length >
              0 ||
            item.ingredients.filter((i) => i.ingredient.category.diet_category?.diet === undefined).length > 0 ? (
              ""
            ) : item.ingredients.filter((i) => i.ingredient.category.diet_category?.diet.name === "vegetarian").length >
              0 ? (
              <icons.VegetarianIcon />
            ) : (
              <icons.VeganIcon />
            )}
            <p>{capitalizeFirstLetter(item.name)}</p>
          </div>
        }
        img={item?.img_url ? <img src={item.img_url} alt={item.name} /> : <></>}
        description={
          item?.tag_recipes.length > 0 && (
            <div>
              {item?.tag_recipes.map((tag) => (
                <Tag key={tag.tag.id} color="magenta">
                  {tag.tag.name}
                </Tag>
              ))}
            </div>
          )
        }
      />
    </>
  )
}
