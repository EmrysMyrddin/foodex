import React from "react"
import { Link } from "react-router-dom"
import "./foodexGrid.css"

export default function FoodexGrid({ list, link, Item, linkId = "id" }) {
  return (
    <div className="container-foodex">
      {list?.map((item) => (
        <div key={item[linkId]} className="grid">
          <Link to={`${link}${item[linkId]}`}>
            <Item item={item} />
          </Link>
        </div>
      ))}
    </div>
  )
}
