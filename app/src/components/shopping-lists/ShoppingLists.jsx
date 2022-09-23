import React, { useState } from "react"
import { shoppingLists } from "../../data/shopping-lists"
import { useMutation, useQuery } from "urql"
import { Button, Spin } from "antd"
import FoodexGrid from "../../organisms/FoodexGrid"
import ShoppingListsItem from "../../molecules/Item/ShoppingListsItem"
import FoodexSearchFilter from "../../organisms/FoodexSearchFilter"
import ShoppingListsModal from "../../molecules/Modal/ShoppingListsModal"
import { PlusOutlined } from "@ant-design/icons"
import { useIntl } from "react-intl"
import { ShoppingListFormModal } from "../../molecules/Modal/ShoppingListFormModal"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function ShoppingLists() {
  const { formatMessage } = useIntl()
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [variables, setVariables] = useState()

  const navigate = useNavigate()

  const [createResult, createShoppingList] = useMutation(CREATE_SHOPPING_LIST_MUTATION)
  const [result] = useQuery({
    query: shoppingLists,
    variables: variables ? { where: variables } : undefined,
  })

  const onSubmit = (value) => {
    const { name, ...allVariables } = variables || {}
    if (value) allVariables.name = { _ilike: value }
    setVariables(allVariables)
  }

  const { data, fetching, error } = result

  const form = (
    <FoodexSearchFilter
      onSearch={onSubmit}
      placeholder="Rechercher une liste de course"
      button="Rechercher"
      Modal={ShoppingListsModal}
      setVariables={setVariables}
      variables={variables}
    />
  )

  if (fetching)
    return (
      <>
        {form}
        <div className="ingredients-container">
          <Spin />
        </div>
      </>
    )

  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      {form}
      <FoodexGrid list={data?.shopping_list} link="/shopping-lists/" Item={ShoppingListsItem} />

      <div className="add">
        <Button
          onClick={() => setShowModalAdd(true)}
          type="primary"
          size="large"
          shape="circle"
          icon={<PlusOutlined />}
        />
      </div>
      <ShoppingListFormModal
        visible={showModalAdd}
        onCancel={() => setShowModalAdd(false)}
        title={formatMessage({ id: "create.shoppingList" })}
        confirmLoading={createResult.fetching}
        onOk={async (values) => {
          const result = await createShoppingList({ shoppingList: values })
          if (result.error) {
            toast.error(result.error.message)
          } else {
            toast.success("Recette créée")
            setShowModalAdd(false)
            navigate("/shopping-list/" + result.data.shopping_list.id)
          }
        }}
      />
    </div>
  )
}

const CREATE_SHOPPING_LIST_MUTATION = /* GraphQL */ `
  mutation createShoppingList($shoppingList: shopping_list_insert_input!) {
    shopping_list: insert_shopping_list_one(object: $shoppingList) {
      id
      name
    }
  }
`
