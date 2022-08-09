import React from "react"
import { Link } from "react-router-dom"
import "./foodexGrid.css"

export default function FoodexGrid({ list, link, Item }) {
  return (
    <div className="container">
      {list?.map((item) => (
        <div key={item.id} className="grid">
          <Link to={`${link}${item.id}`}>
            <Item item={item} />
          </Link>
        </div>
      ))}
    </div>
  )
}
