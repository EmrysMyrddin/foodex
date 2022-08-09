import React, { useState } from "react"
import { shoppingLists } from "../../data/shopping-lists"
import { useQuery } from "urql"
import { Spin } from "antd"
import FoodexGrid from "../../organisms/FoodexGrid"
import ShoppingListsItem from "../../molecules/Item/ShoppingListsItem"
import FoodexSearchFilter from "../../organisms/FoodexSearchFilter"
import ShoppingListsModal from "../../molecules/Modal/ShoppingListsModal"

export default function ShoppingLists() {
  const [variables, setVariables] = useState()
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
    </div>
  )
}
