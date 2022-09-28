import { Button, Form, Input, Modal, Select } from "antd"
import React, { useRef } from "react"
import { useState } from "react"
import { useIntl } from "react-intl"
import { useQuery } from "urql"
import { ingredients } from "../../data/ingredient"
import { recipes } from "../../data/recipes"
import { units } from "../../data/unit"
import { capitalizeFirstLetter } from "../../helper/helper"
import "./modal.css"

const { Option } = Select

export function ShoppingListFormModal({ onOk, initialValues, ...props }) {
  const intl = useIntl()
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
    <Modal onOk={handleOk} {...props} cancelText={capitalizeFirstLetter(intl.formatMessage({ id: "cancel" }))}>
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
              rules={[{ required: true, message: "Veuillez entrer le nom de la liste de course" }]}
            >
              <Input placeholder="Nom de la liste de course à ajouter" />
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
                <Form.Item name="qte">
                  <Input type="number" placeholder="Quantité de la recette à ajouter" />
                </Form.Item>
                <Form.Item name="unitId">
                  <Select placeholder="Unité de la recette à ajouter">
                    {unitsData?.unit.map((r) => (
                      <Option key={r.id} value={r.id}>
                        {capitalizeFirstLetter(r.name)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="recipeId">
                  <Select placeholder="Nom de la recette à ajouter">
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
                <Form.Item name="ingredientQte">
                  <Input type="number" placeholder="Quantité de l'ingrédient à ajouter" />
                </Form.Item>
                <Form.Item name="unitId">
                  <Select placeholder="Unité de l'ingrédient à ajouter">
                    {unitsData?.unit.map((r) => (
                      <Option key={r.id} value={r.id}>
                        {capitalizeFirstLetter(r.name)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="ingredientId">
                  <Select placeholder="Nom de l'ingrédient à ajouter">
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
                Ajouter un ingrédient
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
