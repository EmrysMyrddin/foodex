import React, { useState } from "react"
import { Modal } from "antd"
import * as icons from "../../components/icons"
import { capitalizeFirstLetter } from "../../helper/helper"
import { useIntl } from "react-intl"

export default function ShoppingListsModal({ variables, setVariables }) {
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

  return (
    <>
      <icons.FilterIcon onClick={showModal} />
      <Modal
        title="Filtre pour les listes de courses"
        cancelText={capitalizeFirstLetter(intl.formatMessage({ id: "cancel" }))}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div></div>
      </Modal>
    </>
  )
}
