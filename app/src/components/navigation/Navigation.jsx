import React from "react";
import { useIntl } from 'react-intl'
import {isMobile} from 'react-device-detect';
import {capitalizeFirstLetter} from "../../helper/helper";
import {NavLink} from 'react-router-dom'
import * as icons from '../icons'
import './navigation.css'

export default function Navigation(){
    const intl = useIntl()
	const path = window.location.href

	function isCurrent(href, segment) {
		const parts = href.split('/')
		if(segment.split('/').includes(parts[parts.length - 1])) return 'page'
	}

    const menuEntries = [
		{ href: 'recipes', Icon: icons.RecipesIcon},
		{ href: 'ingredients', Icon: icons.IngredientsIcon },
		{ href: 'shopping-lists', Icon: icons.ShoppingListsIcon },
		{ href: 'account', Icon: icons.AccountIcon },
	]

    return (
        <div className="nav-container">
            <div className={`menu-border ${path.split('/')[path.split('/').length - 1]}`}/>
            <nav>
                <ul>
                    {menuEntries.map(({href, Icon}) =>
                        <li key={href}>
                            <NavLink to={`/${href}`} aria-current={isCurrent(href, path)}>
                                <div className={`menu-button ${href.split('/')[href.split('/').length - 1]}`}>
                                    <Icon />
                                    {!isMobile ? <div className="desktop">{capitalizeFirstLetter(intl.formatMessage({ id: href}))}</div> : <></>}
                                </div>
                            </NavLink>
                        </li>
                    )}
                    <li> 
                        <div>
                            <div className='menu-button'>
                                <icons.LogoutIcon/>
                                {!isMobile ? <div>Déconnexion</div> : <></>}
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}