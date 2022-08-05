import React, { useState } from "react";
import { capitalizeFirstLetter } from "../../helper/helper";
import { Modal, Select } from "antd";
import { categories } from "../../data/category";
import { useQuery } from "urql";
import { saisons } from "../../data/saison";
import { diets } from "../../data/diet";
import { useIntl } from "react-intl";
import * as icons from '../../components/icons'

const { Option } = Select;

export default function ShoppingListsModal({variables, setVariables}){
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
            <icons.FilterIcon onClick={showModal}/>
            <Modal 
                title="Filtre pour les listes de courses" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <div>
                </div>
            </Modal>
        </>
    )
}