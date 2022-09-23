import { Button, Form, Input, Modal, Select } from "antd"
import React, { useRef } from "react"
import { useState } from "react"
import { useQuery } from "urql"
import { ingredients } from "../../data/ingredient"
import { recipes } from "../../data/recipes"
import { units } from "../../data/unit"
import { capitalizeFirstLetter } from "../../helper/helper"
import "./modal.css"

const { Option } = Select

export function ShoppingListFormModal({ onOk, initialValues, ...props }) {
  const form = useRef()
  const [addRecipes, setAddRecipes] = useState([])
  const [addIngredients, setAddIngredients] = useState([])

  const [{ data: recipesData, fetching: recipesFetching, error: recipesError }] = useQuery({
    query: recipes,
  })

  const [{ data: ingredientsData, fetching: ingredientsFetching, error: ingredientsError }] = useQuery({
    query: ingredients,
  })

  const [{ data: unitsData, fetching: unitsFetching, error: unitsError }] = useQuery({
    query: units,
  })

  function handleOk() {
    const { name } = form.current.getFieldsValue()
    const result = {
      name,
      recipes: {
        data: addRecipes,
      },
      ingredient_entries: {
        data: addIngredients,
      },
    }
    onOk(result)
  }

  return (
    <Modal onOk={handleOk} {...props}>
      <Form
        ref={form}
        layout="vertical"
        autoComplete="off"
        className="shopping-list-form"
        initialValues={initialValues}
      >
        <div className="recipe-left">
          <div id="shopping-list-title">
            <Form.Item
              id="name"
              name="name"
              label="Nom de la liste de course à ajouter"
              rules={[{ required: true, message: "Veuillez entrer le nom de la liste de course" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div id="shooping-list-container">
            <div>
              <ul>
                {addRecipes?.map((recipe) => (
                  <li key={recipe.recipeId}>
                    {recipe.qte} {recipesData?.recipe.find((e) => e.id === recipe.recipeId).name}
                  </li>
                ))}
              </ul>
              <div id="shopping-list-add-recipes">
                <Form.Item name="qte" label="Quantité de la recette à ajouter">
                  <Input type="number" />
                </Form.Item>
                <Form.Item name="recipeId" label="Nom de la recette à ajouter">
                  <Select>
                    {recipesData?.recipe.map((r) => (
                      <Option key={r.id} value={r.id}>
                        {capitalizeFirstLetter(r.name)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <Button
                block
                onClick={(e) => {
                  e.preventDefault()
                  setAddRecipes([
                    ...addRecipes,
                    {
                      qte: form.current.getFieldsValue().qte,
                      recipeId: form.current.getFieldsValue().recipeId,
                    },
                  ])
                  form.current.setFieldValue("qte", "")
                  form.current.setFieldValue("recipeId", null)
                }}
              >
                Ajouter une recette
              </Button>
            </div>
            <div>
              <ul>
                {addIngredients?.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.qte} {unitsData?.unit.find((e) => e.id === ingredient.unitId).name}{" "}
                    {ingredientsData?.ingredient.find((e) => e.id === ingredient.ingredientId).name}
                  </li>
                ))}
              </ul>
              <div id="shopping-list-add-ingredients">
                <Form.Item name="ingredientQte" label="Quantité de l'ingredient à ajouter">
                  <Input type="number" />
                </Form.Item>
                <Form.Item name="unitId" label="Unité de l'ingredient à ajouter">
                  <Select>
                    {unitsData?.unit.map((r) => (
                      <Option key={r.id} value={r.id}>
                        {capitalizeFirstLetter(r.name)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="ingredientId" label="Nom de l'ingredient à ajouter">
                  <Select>
                    {ingredientsData?.ingredient.map((r) => (
                      <Option key={r.id} value={r.id}>
                        {capitalizeFirstLetter(r.name)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <Button
                block
                onClick={(e) => {
                  e.preventDefault()
                  setAddIngredients([
                    ...addIngredients,
                    {
                      ingredientId: form.current.getFieldsValue().ingredientId,
                      qte: form.current.getFieldsValue().ingredientQte,
                      unitId: form.current.getFieldsValue().unitId,
                    },
                  ])
                }}
              >
                Ajouter un ingréedient
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
