import { Form, Input, Modal } from "antd"
import React, { useRef } from "react"
import { useIntl } from "react-intl"
import { capitalizeFirstLetter } from "../../helper/helper"
import { AddIngredientsToRecipe } from "./AddIngredientsToRecipe"
import "./modal.css"

export function RecipeFormModal({ onOk, initialValues, ...props }) {
  const intl = useIntl()
  const form = useRef()
  function handleOk() {
    onOk(form.current.getFieldsValue())
  }

  return (
    <Modal onOk={handleOk} {...props} cancelText={capitalizeFirstLetter(intl.formatMessage({ id: "cancel" }))}>
      <Form ref={form} layout="vertical" autoComplete="off" className="recipe-form" initialValues={initialValues}>
        <div className="recipe-left">
          <Form.Item
            name="name"
            label="Nom de la recette"
            rules={[{ required: true, message: "Veuillez entrer le nom de la recette" }]}
          >
            <Input placeholder="Nom de la recette" name="name" />
          </Form.Item>
          <Form.Item name="img_url" label="Image de la recette">
            <Input placeholder="Image de la recette" name="img_url" />
          </Form.Item>
          {/* <Form.Item name="tag_recipes" label="Tags de la recette">
            <Select placeholder="Selectionner les tags de la recette" name="tag_recipes" />
          </Form.Item> */}
        </div>
        <div className="recipe-middle">
          <AddIngredientsToRecipe initialValues={initialValues} />
        </div>
        <div className="recipe-right">
          <Form.Item name="description" className="description" label="Description de la recette">
            <Input.TextArea placeholder="Description de la recette" name="description" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}
