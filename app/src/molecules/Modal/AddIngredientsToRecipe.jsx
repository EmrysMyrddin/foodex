import { Button, Form, Input, Select } from "antd"
import React, { useRef } from "react"
import { useState } from "react"
import { useIntl } from "react-intl"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "urql"
import { ingredients } from "../../data/ingredient"
import { recipes } from "../../data/recipes"
import { units } from "../../data/unit"
import { capitalizeFirstLetter } from "../../helper/helper"

const { Option, OptGroup } = Select

export function AddIngredientsToRecipe() {
  const { formatMessage } = useIntl()
  const { id } = useParams()
  const form = useRef()
  const [recipesAdded, setRecipesAdded] = useState([])
  const [ingredientsAdded, setIngredientsAdded] = useState([])
  const [tmp, setTmp] = useState([])

  const [{ data: recipesData, fetching: recipesFetching, error: recipesError }] = useQuery({
    query: recipes,
  })

  const [{ data: ingredientsData, fetching: ingredientsFetching, error: ingredientsError }] = useQuery({
    query: ingredients,
  })

  const [{ data: unitsData, fetching: unitsFetching, error: unitsError }] = useQuery({
    query: units,
  })

  const onClick = () => {
    console.log(ingredientsAdded)
    if (tmp.type === "ingredient") {
      setIngredientsAdded([
        ...ingredientsAdded,
        { qte: tmp.qte, unit: tmp.unit, ingredient: { id: tmp.result.id, name: tmp.result.name } },
      ])
    } else
      setRecipesAdded([
        ...recipesAdded,
        { qte: tmp.qte, unit: tmp.unit, recipe: { id: tmp.result.id, name: tmp.result.name } },
      ])
  }

  return (
    <div className="recipe-add-form">
      <div>
        {ingredientsAdded?.length > 0 && <p>Les ingredients</p>}
        {ingredientsAdded?.length > 0 && (
          <ul>
            {ingredientsAdded?.map((r) => (
              <li key={r.ingredient.id}>
                {r.qte} {formatMessage({ id: `unit.${r?.unit.name}` }, { count: r.qte })}{" "}
                {r?.ingredient.name.startsWith("a") ||
                r?.ingredient.name.startsWith("e") ||
                r?.ingredient.name.startsWith("i") ||
                r?.ingredient.name.startsWith("o") ||
                r?.ingredient.name.startsWith("u") ||
                r?.ingredient.name.startsWith("h")
                  ? "d'"
                  : "de "}
                {r?.ingredient.name}
              </li>
            ))}
          </ul>
        )}
        {recipesAdded?.length > 0 && <p>Les recettes</p>}
        {recipesAdded?.length > 0 && (
          <ul>
            {recipesAdded?.map((r) => (
              <li key={r.recipe.id}>
                {r.qte} {formatMessage({ id: `unit.${r?.unit.name}` }, { count: r.qte })}{" "}
                {r?.recipe.name.startsWith("a") ||
                r?.recipe.name.startsWith("e") ||
                r?.recipe.name.startsWith("i") ||
                r?.recipe.name.startsWith("o") ||
                r?.recipe.name.startsWith("u") ||
                r?.recipe.name.startsWith("h")
                  ? "d'"
                  : "de "}
                <Link to={`/recipes/${r.recipe.id}`}>{r?.recipe.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="ingredient-recipe-form">
        <Form.Item
          name="qte"
          label="Quantité"
          rules={[{ required: true, message: "Veuillez entrer la quantité de l'ingrédient/recette" }]}
        >
          <Input placeholder="Quantité" name="qte" onChange={(e) => setTmp({ ...tmp, qte: e.target.value })} />
        </Form.Item>
        <Form.Item name="unit" label="Unité" rules={[{ required: true, message: "Veuillez sélectionner l'unité'" }]}>
          <Select
            placeholder="Sélectionner l'unité"
            name="unit"
            loading={unitsFetching}
            onSelect={(e) => setTmp({ ...tmp, unit: { id: e.split("/")[0], name: e.split("/")[1] } })}
          >
            {unitsData?.unit?.map((i) => (
              <Option key={i.id} value={`${i.id}/${i.name}`}>
                {capitalizeFirstLetter(formatMessage({ id: `unit.${i.name}` }, { count: 0 }))}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="ingredient"
          label="Ingredient de la recette"
          rules={[{ required: true, message: "Veuillez sélectionner l'ingredient'" }]}
        >
          <Select
            placeholder="Sélectionner un ingredient"
            name="ingredient"
            loading={recipesFetching && ingredientsFetching}
            onSelect={(e) => {
              setTmp({ ...tmp, type: e.split("/")[0], result: { id: e.split("/")[1], name: e.split("/")[2] } })
            }}
          >
            <OptGroup label="Ingredients">
              {ingredientsData?.ingredient.map((i) => (
                <Option key={i.id} value={`ingredient/${i.id}/${i.name}`}>
                  {capitalizeFirstLetter(i.name)}
                </Option>
              ))}
            </OptGroup>
            <OptGroup label="Recettes">
              {recipesData?.recipe
                .filter((r) => r.id !== id)
                .map((r) => (
                  <Option key={r.id} value={`recipe/${r.id}/${r.name}`}>
                    {capitalizeFirstLetter(r.name)}
                  </Option>
                ))}
            </OptGroup>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={(e) => onClick(e)}>Ajouter</Button>
        </Form.Item>
      </div>
    </div>
  )
}
