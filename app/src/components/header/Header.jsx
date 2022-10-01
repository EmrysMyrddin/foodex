import React from "react"
import { useIntl } from "react-intl"
import { capitalizeFirstLetter } from "../../helper/helper"
import { useLocation } from "react-router-dom"
import * as icons from "../icons"
import "./header.css"

export default function Header() {
  const intl = useIntl()
  const location = useLocation()

  const menuEntries = [
    { href: "recipes", Icon: icons.RecipesIcon },
    { href: "ingredients", Icon: icons.IngredientsIcon },
    { href: "shopping-lists", Icon: icons.ShoppingListsIcon },
    { href: "account", Icon: icons.AccountIcon },
  ]

  const forIcon = location.pathname
    .split("/")
    .filter(
      (u) => !u.includes("http") && !u.includes("192") && !u.includes("localhost") && !u.includes("foodex") && u !== ""
    )[0]

  return (
    <div className={`header ${forIcon}`}>
      {menuEntries
        .filter(({ href }) => forIcon === href)
        .map(({ href, Icon }) => (
          <Icon key={href} className={href} />
        ))}
      <h1 className={forIcon}>{capitalizeFirstLetter(intl.formatMessage({ id: forIcon }))}</h1>
    </div>
  )
}
