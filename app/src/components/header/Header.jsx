import React from "react";
import { useIntl } from 'react-intl'
import capitalizeFirstLetter from "../../helper/helper";
import * as icons from '../icons'
import './header.css'

export default function Header(){
	const intl = useIntl()
	const pathName = window.location.href.split('/')[window.location.href.split('/').length -1]

    const menuEntries = [
		{ href: 'recipes', Icon: icons.RecipesIcon},
		{ href: 'ingredients', Icon: icons.IngredientsIcon },
		{ href: 'shopping-lists', Icon: icons.ShoppingListsIcon },
		{ href: 'account', Icon: icons.AccountIcon },
	]

    return (
        <div className={`header ${pathName}`}>
            {menuEntries.filter(({href}) => pathName === href).map(({href, Icon}) => <Icon key={href} className={href}/>)}
            <h1 className={pathName}>{capitalizeFirstLetter(intl.formatMessage({ id: pathName}))}</h1>
        </div>
    )
}