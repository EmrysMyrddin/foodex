import React, { useRef } from "react"
import { useMutation, useQuery } from "urql"
import { useParams } from "react-router"
import { capitalizeFirstLetter } from "../../helper/helper"
import { recipe } from "../../data/recipes"
import * as icons from "../icons"
import { Spin, Button, Modal, Input, Form } from "antd"
import { Link } from "react-router-dom"
import "./recipe.css"
import { useState } from "react"
import { marked } from "marked"
import FoodexCard from "../../molecules/FoodexCard"
import { useIntl } from "react-intl"
import { EditOutlined } from "@ant-design/icons"
import { toast } from "react-toastify"

export default function Recipe() {
  const { formatMessage } = useIntl()
  const { id } = useParams()

  const [editing, setEditing] = useState(false)

  const [result] = useQuery({
    query: recipe,
    variables: { id },
  })

  const [resultUpdate, updateRecipe] = useMutation(/* GraphQL */ `
    mutation updateRecipe($id: uuid!, $name: String, $img_url: String, $description: String) {
      update_recipe_by_pk(
        pk_columns: { id: $id }
        _set: { name: $name, img_url: $img_url, description: $description }
      ) {
        id
        name
        description
      }
    }
  `)

  const { data, fetching, error } = result

  if (fetching) return <Spin />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="container-details">
      <div className="recipe-right">
        {data.recipe_by_pk.img_url ? <img src={data.recipe_by_pk.img_url} alt={data.recipe_by_pk.name} /> : <></>}
        <div className="info">
          {data.recipe_by_pk.ingredients.map((i) => (
            <Link key={i.ingredient.id} to={`/ingredients/${i.ingredient.id}`}>
              <FoodexCard
                cover={
                  <div className="label">
                    {i.ingredient.category.diet_category?.diet.name === "vegan" ? (
                      <icons.VeganIcon />
                    ) : i.ingredient.category.diet_category?.diet.name === "vegetarian" ? (
                      <icons.VegetarianIcon />
                    ) : (
                      ""
                    )}
                    <p>{capitalizeFirstLetter(i.ingredient.name)}</p>
                  </div>
                }
                img={i.ingredient?.url_img ? <img src={i.ingredient.url_img} alt={i.ingredient.name} /> : <></>}
                description={`${formatMessage(
                  { id: i.ingredient.recipe_ingredients[0].unit.name },
                  { count: i.ingredient.recipe_ingredients[0].qte }
                )}`}
              />
            </Link>
          ))}
          {data.recipe_by_pk.recipe_needed_recipes.map((i) => (
            <Link key={i.recipeByNeededRecipeId.id} to={`/recipes/${i.recipeByNeededRecipeId.id}`}>
              <FoodexCard
                cover={
                  <div className="label">
                    {i.recipeByNeededRecipeId.ingredients.length < 1 ||
                    i.recipeByNeededRecipeId.ingredients.filter(
                      (i) => i.ingredient.category.diet_category?.diet.name === "carnivorous"
                    ).length > 0 ||
                    i.recipeByNeededRecipeId.ingredients.filter(
                      (i) => i.ingredient.category.diet_category?.diet === undefined
                    ).length > 0 ? (
                      ""
                    ) : i.recipeByNeededRecipeId.ingredients.filter(
                        (i) => i.ingredient.category.diet_category?.diet.name === "vegetarian"
                      ).length > 0 ? (
                      <icons.VegetarianIcon />
                    ) : (
                      <icons.VeganIcon />
                    )}
                    <p>{capitalizeFirstLetter(i.recipeByNeededRecipeId.name)}</p>
                  </div>
                }
                img={
                  i.recipeByNeededRecipeId?.img_url ? (
                    <img src={i.recipeByNeededRecipeId.img_url} alt={i.recipeByNeededRecipeId.name} />
                  ) : (
                    <></>
                  )
                }
                description={`${formatMessage({ id: i.unit.name }, { count: i.qte })}`}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="info-details">
        <div className="title-details">
          {data.recipe_by_pk.ingredients.filter((i) => i.ingredient.category.diet_category?.diet.name === "carnivorous")
            .length ||
          data.recipe_by_pk.ingredients.filter((i) => i.ingredient.category.diet_category?.diet === undefined).length >
            0 ||
          data.recipe_by_pk.ingredients.length < 1 ? (
            ""
          ) : data.recipe_by_pk.ingredients.filter(
              (i) => i.ingredient.category.diet_category?.diet.name === "vegetarian"
            ).length > 0 ? (
            <icons.VegetarianIcon />
          ) : (
            <icons.VeganIcon />
          )}
          <h1>{capitalizeFirstLetter(data.recipe_by_pk.name)}</h1>
        </div>
        <div className="recipe">
          <article
            dangerouslySetInnerHTML={{
              __html: marked.parse(data.recipe_by_pk.description),
            }}
          />
        </div>
      </div>

      <div className="add">
        <Button onClick={() => setEditing(true)} type="primary" size="large" shape="circle" icon={<EditOutlined />} />
      </div>
      <RecipFormModal
        title="Modifier la recette"
        visible={editing}
        onCancel={() => setEditing(false)}
        onOk={async (values) => {
          const result = await updateRecipe({ ...values, id })
          if (result.error) {
            toast.error(result.error.message)
          } else {
            setEditing(false)
            toast.success("La recette a été mise à jour")
          }
        }}
        confirmLoading={resultUpdate.fetching}
        initialValues={data.recipe_by_pk}
      />
    </div>
  )
}

export function RecipFormModal({ onOk, initialValues, ...props }) {
  const form = useRef()
  function handleOk() {
    onOk(form.current.getFieldsValue())
  }

  return (
    <Modal onOk={handleOk} {...props}>
      <Form
        ref={form}
        autoComplete="off"
        className="recipe-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        width="90vw"
      >
        <Form.Item
          name="name"
          label="Nom de la recette"
          rules={[{ required: true, message: "Veuillez entrer un nom de recette" }]}
        >
          <Input placeholder="Nom de la recette" name="name" />
        </Form.Item>
        <Form.Item name="img_url" label="Image de la recette">
          <Input placeholder="Image de la recette" name="img_url" />
        </Form.Item>
        <Form.Item name="description" label="Description de la recette">
          <Input.TextArea placeholder="Description de la recette" name="description" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
