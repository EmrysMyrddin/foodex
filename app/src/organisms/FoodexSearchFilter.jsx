import React from "react"
import { useIntl } from "react-intl"
import { capitalizeFirstLetter } from "../helper/helper"
import FoodexSearch from "../molecules/FoodexSearch"
import "./foodexSearchFilter.css"

export default function FoodexSearchFilter({ onSearch, placeholder, button, Modal, setVariables, variables }) {
  const intl = useIntl()
  return (
    <div className="form-container">
      <FoodexSearch onSearch={onSearch} placeholder={placeholder} button={button} />
      <Modal
        cancelText={capitalizeFirstLetter(intl.formatMessage({ id: "cancel" }))}
        setVariables={setVariables}
        variables={variables}
      />
    </div>
  )
}
