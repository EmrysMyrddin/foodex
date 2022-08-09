import React, { useState } from "react"
import { useQuery, useMutation } from "urql"
import { ingredients, insert_one_ingredient } from "../../data/ingredient"
import "./ingredients.css"
import { useIntl } from "react-intl"
import { Input, Button, Modal, Select, Spin } from "antd"
import { capitalizeFirstLetter } from "../../helper/helper"
import { categories } from "../../data/category"
import { saisons } from "../../data/saison"
import { PlusOutlined } from "@ant-design/icons"
import FoodexGrid from "../../organisms/FoodexGrid"
import IngredientsItem from "../../molecules/Item/IngredientsItem"
import FoodexSearchFilter from "../../organisms/FoodexSearchFilter"
import IngredientsModal from "../../molecules/Modal/IngredientsModal"

const { Option } = Select

export default function Ingredients() {
  const intl = useIntl()
  const [isModalAddVisible, setIsModalAddVisible] = useState(false)
  const [addIngredientCategory, setAddIngredientCategory] = useState()
  const [addIngredientName, setAddIngredientName] = useState()
  const [addIngredientUrl, setAddIngredientUrl] = useState()
  const [variables, setVariables] = useState()

  const showModalAdd = () => {
    setIsModalAddVisible(true)
  }

  const [resultAdd, insertIngredient] = useMutation(insert_one_ingredient)

  const handleOkAdd = async () => {
    await insertIngredient({
      category_id: addIngredientCategory,
      name: addIngredientName,
      url_img: addIngredientUrl,
    })
    setIsModalAddVisible(false)
  }

  const handleCancelAdd = () => {
    setIsModalAddVisible(false)
  }

  const handleChangeSaison = (value) => {
    const { _or, ...allVariables } = variables || {}
    const other = _or && _or.filter((o) => o !== {})
    if (value.length !== 0) {
      allVariables._or = value.map((v) => ({
        _or: [
          { saison_ingredients: { saison_id: { _eq: v } } },
          {
            saison_ingredients: {
              saison_id: {
                _eq: saisonsData.saison.filter((dat) => dat.name === "all-year")[0].id,
              },
            },
          },
        ],
      }))
    }
    other && other.filter((o) => o !== {}).map((o) => allVariables?._or?.push(o))
    setVariables(allVariables)
  }

  const onSubmit = (value) => {
    const { name, ...allVariables } = variables || {}
    if (value) allVariables.name = { _ilike: value }
    setVariables(allVariables)
  }

  const [{ data: categoriesData, fetching: categoriesFetching, error: categoriesError }] = useQuery({
    query: categories,
  })

  const [{ data: saisonsData, fetching: saisonsFetching, error: saisonsError }] = useQuery({
    query: saisons,
  })

  const [{ data, fetching, error }] = useQuery({
    query: ingredients,
    variables: variables ? { where: variables } : undefined,
  })

  const form = (
    <FoodexSearchFilter
      onSearch={onSubmit}
      placeholder="Rechercher un ingrédient"
      button="Rechercher"
      Modal={IngredientsModal}
      setVariables={setVariables}
      variables={variables}
    />
  )

  if (fetching && categoriesFetching && saisonsFetching)
    return (
      <>
        {form}
        <div className="ingredients-container">
          <Spin />
        </div>
      </>
    )
  if (error || categoriesError || saisonsError)
    return <p>Oh no... {error?.message || categoriesError?.message || saisonsError?.message}</p>

  const addIngredient = (
    <Modal
      title="Ajouter un ingredient"
      visible={isModalAddVisible}
      onOk={handleOkAdd}
      onCancel={handleCancelAdd}
      confirmLoading={resultAdd.fetching}
    >
      <Input placeholder="Nom de l'ingredient" onChange={(e) => setAddIngredientName(e.target.value)} />
      <Input placeholder="Image de l'ingredient" onChange={(e) => setAddIngredientUrl(e.target.value)} />
      <Select
        loading={categoriesFetching}
        allowClear
        style={{ width: "100%" }}
        placeholder="Catégorie alimentaire"
        onChange={setAddIngredientCategory}
      >
        {categoriesData?.category?.map((cat) => (
          <Option key={cat.id}>{capitalizeFirstLetter(intl.formatMessage({ id: cat.name }))}</Option>
        ))}
      </Select>
      <Select
        loading={saisonsFetching}
        allowClear
        style={{ width: "100%" }}
        placeholder="Saisonalité alimentaire"
        onChange={handleChangeSaison}
      >
        {saisonsData?.saison?.map((sai) => (
          <Option key={sai.id}>{capitalizeFirstLetter(intl.formatMessage({ id: sai.name }))}</Option>
        ))}
      </Select>
    </Modal>
  )

  return (
    <>
      {form}
      {addIngredient}
      <FoodexGrid list={data?.ingredient} link="/ingredients/" Item={IngredientsItem} />
      <div className="add">
        <Button onClick={showModalAdd} type="primary" size="large" shape="circle" icon={<PlusOutlined />} />
      </div>
    </>
  )
}
