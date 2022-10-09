import { DeleteOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select } from "antd"
import React from "react"
import { useState } from "react"
import { useIntl } from "react-intl"
import { Link, useParams } from "react-router-dom"
import { useMutation, useQuery } from "urql"
import { ingredients as ingredientsQuery } from "../../data/ingredient"
import { recipes as recipesQuery, recipe as recipeQuery } from "../../data/recipes"
import { units } from "../../data/unit"
import { capitalizeFirstLetter } from "../../helper/helper"

const { Option, OptGroup } = Select

const recipeQueryContext = {
  additionalTypenames: ["recipe_needed_recipe", "recipe_ingredient"],
}

export function AddIngredientsToRecipe() {
  const { formatMessage } = useIntl()
  const { id } = useParams()
  const [tmp, setTmp] = useState([])

  const [{ data: recipesData, fetching: recipesFetching }] = useQuery({
    query: recipesQuery,
  })

  const [{ data: ingredientsData, fetching: ingredientsFetching }] = useQuery({
    query: ingredientsQuery,
  })

  const [{ data: recipeData }] = useQuery({
    query: recipeQuery,
    variables: { id },
    context: recipeQueryContext,
  })

  const [{ data: unitsData, fetching: unitsFetching }] = useQuery({
    query: units,
  })

  const [{ fetching: addingIngredient }, addIngredient] = useMutation(/* GraphQL */ `
    mutation addIngredientToRecipe($recipeId: uuid!, $id: uuid!, $qte: numeric!, $unitId: uuid!) {
      insert_recipe_ingredient_one(object: { recipeId: $recipeId, ingredientId: $id, qte: $qte, unit_id: $unitId }) {
        id
      }
    }
  `)

  const [{ fetching: addingRecipeNeeded }, addRecipeNeeded] = useMutation(/* GraphQL */ `
    mutation addRecipeNeeded($recipeId: uuid!, $id: uuid!, $qte: numeric!, $unitId: uuid!) {
      insert_recipe_needed_recipe_one(
        object: { recipe_id: $recipeId, needed_recipe_id: $id, qte: $qte, unit_id: $unitId }
      ) {
        id
      }
    }
  `)

  const [{ fetching: deletingIngredient }, deleteIngredient] = useMutation(/* GraphQL */ `
    mutation deleteRecipeIngredient($id: uuid!) {
      delete_recipe_ingredient_by_pk(id: $id) {
        id
      }
    }
  `)

  const [{ fetching: deletingRecipeNeeded }, deleteRecipeNeeded] = useMutation(/* GraphQL */ `
    mutation deleteRecipeNeeded($id: uuid!) {
      delete_recipe_needed_recipe_by_pk(id: $id) {
        id
      }
    }
  `)

  const onClick = async () => {
    const handler = tmp.type === "ingredient" ? addIngredient : addRecipeNeeded
    await handler({ recipeId: id, id: tmp.id, qte: tmp.qte, unitId: tmp.unitId })
  }

  return (
    <div className="recipe-add-form">
      <h2>Ingrédients pour la recette</h2>
      <div>
        {recipeData?.recipe_by_pk.ingredients?.length > 0 && (
          <>
            <p>Les ingredients</p>
            <ul>
              {recipeData?.recipe_by_pk.ingredients?.map((r) => (
                <li key={r.id} className="item">
                  <p>
                    {r.qte} {formatMessage({ id: `unit.${r.unit?.name}` }, { count: r.qte })} {r.ingredient?.name}
                  </p>
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => deleteIngredient({ id: r.id })}
                    loading={deletingIngredient}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
        {recipeData?.recipe_by_pk?.recipe_needed_recipes.length > 0 && (
          <>
            <p>Les recettes</p>
            <ul>
              {recipeData.recipe_by_pk?.recipe_needed_recipes.map((r) => (
                <li key={r?.id} className="item">
                  {r.qte} {formatMessage({ id: `unit.${r?.unit?.name}` }, { count: r?.qte })} &nbsp;
                  <Link to={`/recipes/${r?.recipeByNeededRecipeId?.id}`}>{r?.recipeByNeededRecipeId?.name}</Link>
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => deleteRecipeNeeded({ id: r.id })}
                    loading={deletingRecipeNeeded}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="ingredient-recipe-form">
        <div id="selects">
          <Form.Item
            name="qte"
            rules={[{ required: true, message: "Veuillez entrer la quantité de l'ingrédient/recette" }]}
          >
            <Input
              placeholder="Définissez la quantité"
              name="qte"
              onChange={(e) => setTmp({ ...tmp, qte: e.target.value })}
            />
          </Form.Item>
          <Form.Item name="unit" rules={[{ required: true, message: "Veuillez sélectionner l'unité'" }]}>
            <Select
              placeholder="Sélectionnez l'unité"
              name="unit"
              loading={unitsFetching}
              onSelect={(e) => setTmp({ ...tmp, unitId: e.split("/")[0] })}
            >
              {unitsData?.unit?.map((i) => (
                <Option key={i.id} value={`${i.id}/${i.name}`}>
                  {capitalizeFirstLetter(formatMessage({ id: `unit.${i.name}` }, { count: 0 }))}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="ingredient" rules={[{ required: true, message: "Veuillez sélectionner l'ingredient'" }]}>
            <Select
              placeholder="Sélectionner un ingredient ou une recette"
              name="ingredient"
              loading={recipesFetching && ingredientsFetching}
              onSelect={(e) => {
                setTmp({ ...tmp, type: e.split("/")[0], id: e.split("/")[1] })
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
        </div>
        <Form.Item>
          <Button block onClick={onClick} loading={addingIngredient || addingRecipeNeeded}>
            Ajouter
          </Button>
        </Form.Item>
      </div>
    </div>
  )
}
