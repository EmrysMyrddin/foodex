import React, { useState } from "react"
import { useMutation, useQuery } from "urql"
import { recipes } from "../../data/recipes"
import { Spin, Empty, Button } from "antd"
import FoodexGrid from "../../organisms/FoodexGrid"
import RecipesItem from "../../molecules/Item/RecipesItem"
import FoodexSearchFilter from "../../organisms/FoodexSearchFilter"
import RecipesModal from "../../molecules/Modal/RecipesModal"
import { PlusOutlined } from "@ant-design/icons"
import { RecipFormModal } from "../repice/Recipe"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function Recipes() {
  const [variables, setVariables] = useState()
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [createResult, createRecipe] = useMutation(CREATE_RECIPE_MUTATION)
  const navigate = useNavigate()

  const onSubmit = (value) => {
    const { name, ...allVariables } = variables || {}
    if (value) allVariables.name = { _ilike: value }
    setVariables(allVariables)
  }

  const [{ data: recipesData, fetching: recipesFetching, error: recipesError }] = useQuery({
    query: recipes,
    variables: variables ? { where: variables } : undefined,
  })

  const form = (
    <FoodexSearchFilter
      onSearch={onSubmit}
      placeholder="Rechercher une recette"
      button="Rechercher"
      Modal={RecipesModal}
      setVariables={setVariables}
      variables={variables}
    />
  )

  if (recipesFetching)
    return (
      <>
        {form}
        <div className="ingredients-container">
          <Spin />
        </div>
      </>
    )

  if (recipesError) return <p>{recipesError.message}</p>

  return (
    <div>
      {form}
      {recipesData.recipe.length === 0 ? (
        <Empty />
      ) : (
        <FoodexGrid list={recipesData.recipe} link="/recipes/" Item={RecipesItem} />
      )}
      <div className="add">
        <Button
          onClick={() => setShowModalAdd(true)}
          type="primary"
          size="large"
          shape="circle"
          icon={<PlusOutlined />}
        />
      </div>
      <RecipFormModal
        visible={showModalAdd}
        onCancel={() => setShowModalAdd(false)}
        title="Création d'une recette"
        confirmLoading={createResult.fetching}
        onOk={async (values) => {
          const result = await createRecipe({ recipe: values })
          if (result.error) {
            toast.error(result.error.message)
          } else {
            toast.success("Recette créée")
            setShowModalAdd(false)
            navigate("/recipes/" + result.data.recipe.id)
          }
        }}
      />
    </div>
  )
}

const CREATE_RECIPE_MUTATION = /* GraphQL */ `
  mutation createRecipe($recipe: recipe_insert_input!) {
    recipe: insert_recipe_one(object: $recipe) {
      id
      name
      description
      img_url
    }
  }
`
