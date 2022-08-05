import React from "react";
import { useIntl } from 'react-intl'
import {isMobile} from 'react-device-detect';
import {capitalizeFirstLetter} from "../../helper/helper";
import {NavLink} from 'react-router-dom'
import * as navigation from '../icons/navigation'
import './navigation.css'

export default function Navigation(){
    const intl = useIntl()
	const path = window.location.href

	function isCurrent(href, segment) {
		const parts = href.split('/')
		if(segment.split('/').includes(parts[parts.length - 1])) return 'page'
	}

    const menuEntries = [
		{ href: 'recipes', Icon: navigation.BurgerIcon},
		{ href: 'ingredients', Icon: navigation.PimentsIcon },
		{ href: 'shopping-lists', Icon: navigation.PanierIcon },
		{ href: 'market', Icon: navigation.MarketIcon },
		{ href: 'freeze', Icon: navigation.FreezeIcon },
		{ href: 'account', Icon: navigation.SettingIcon },
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
                </ul>
            </nav>
        </div>
    )
}