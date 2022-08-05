import React from "react"
import FoodexSearch from "../molecules/FoodexSearch"
import './foodexSearchFilter.css'

export default function FoodexSearchFilter({onSearch, placeholder, button, Modal, setVariables, variables}){
    return (
        <div className="form-container">
            <FoodexSearch onSearch={onSearch} placeholder={placeholder} button={button} />
            <Modal
                setVariables={setVariables}
                variables={variables}
            />
        </div>
    )
}