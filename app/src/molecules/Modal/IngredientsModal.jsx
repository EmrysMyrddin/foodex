import React, { useState } from "react"
import { capitalizeFirstLetter } from "../../helper/helper"
import { Modal, Select } from "antd"
import { categories } from "../../data/category"
import { useQuery } from "urql"
import { saisons } from "../../data/saison"
import { diets } from "../../data/diet"
import { useIntl } from "react-intl"
import * as icons from "../../components/icons"

const { Option } = Select

export default function IngredientsModal({ variables, setVariables }) {
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

  const handleChangeCategory = (value) => {
    const { _or, ...allVariables } = variables || {}
    const other = _or && _or.filter((o) => o !== {})
    if (value.length !== 0) {
      allVariables._or = value.map((v) => ({
        category: { id: { _eq: v } },
      }))
    }
    other && other.filter((o) => o !== {}).map((o) => allVariables?._or?.push(o))
    setVariables(allVariables)
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

  const [{ data: categoriesData, fetching: categoriesFetching, error: categoriesError }] = useQuery({
    query: categories,
  })

  const [{ data: saisonsData, fetching: saisonsFetching, error: saisonsError }] = useQuery({
    query: saisons,
  })

  const [{ data: dietData, fetching: dietFetching, error: dietError }] = useQuery({
    query: diets,
  })

  if (categoriesError || saisonsError || dietError) return <p>Oups...</p>

  return (
    <>
      <icons.FilterIcon onClick={showModal} />
      <Modal title="Filtre pour les ingredients" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
          <Select
            loading={categoriesFetching}
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Catégorie alimentaire"
            onChange={handleChangeCategory}
          >
            {categoriesData?.category?.map((cat) => (
              <Option key={cat.id}>{capitalizeFirstLetter(intl.formatMessage({ id: cat.name }))}</Option>
            ))}
          </Select>
          <Select
            loading={saisonsFetching}
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Saisonalité alimentaire"
            onChange={handleChangeSaison}
          >
            {saisonsData?.saison?.map((sai) => (
              <Option key={sai.id}>{capitalizeFirstLetter(intl.formatMessage({ id: sai.name }))}</Option>
            ))}
          </Select>
        </div>
      </Modal>
    </>
  )
}
