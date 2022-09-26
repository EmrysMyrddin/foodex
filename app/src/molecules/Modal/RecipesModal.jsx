import React, { useState } from "react"
import { capitalizeFirstLetter } from "../../helper/helper"
import { Modal, Select } from "antd"
import { useQuery } from "urql"
import { diets } from "../../data/diet"
import { useIntl } from "react-intl"
import * as icons from "../../components/icons"

const { Option } = Select

export default function RecipesModal({ variables, setVariables }) {
  const intl = useIntl()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleChangeDiet = (value) => {
    const { _or, ...allVariables } = variables || {}
    const other = _or && _or.filter((o) => o !== {})
    if (value.length !== 0) {
      allVariables._or = value.map((v) => ({
        diet: { id: { _eq: v } },
      }))
    }
    other && other.filter((o) => o !== {}).map((o) => allVariables?._or?.push(o))
    setVariables(allVariables)
  }

  const [{ data: dietData, fetching: dietFetching }] = useQuery({
    query: diets,
  })

  return (
    <>
      <icons.FilterIcon onClick={showModal} />
      <Modal title="Filtre pour les recettes" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <Select
            loading={dietFetching}
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Régime alimentaire"
            onChange={handleChangeDiet}
          >
            {dietData?.diet?.map((d) => (
              <Option key={d.id}>{capitalizeFirstLetter(intl.formatMessage({ id: d.name }))}</Option>
            ))}
          </Select>
        </div>
      </Modal>
    </>
  )
}
