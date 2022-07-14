import React from "react";
import * as icons from '../icons'
import './navigation.css'

export default function Navigation(){
	const path = window.location.href

	function isCurrent(href, segment) {
		const parts = href.split('/')
        console.log(segment.split('/').includes(parts[parts.length - 1]))
		if(segment.split('/').includes(parts[parts.length - 1])) return 'page'
	}

    const menuEntries = [
		{ label: 'Recettes', href: '/recipes', Icon: icons.RecipesIcon},
		{ label: 'Ingredients', href: '/ingredients', Icon: icons.IngredientsIcon },
		{ label: 'Listes de course', href: '/shopping-lists', Icon: icons.ShoppingListsIcon },
		{ label: 'Mon compte', href: '/account', Icon: icons.AccountIcon },
	]

    return (
        <>
            <div className={`menu-border ${path.split('/')[path.split('/').length - 1]}`}/>
            <nav>
                <ul>
                    {menuEntries.map(({label, href, Icon}) =>
                        <li key={label}>
                            <a href={href} aria-current={isCurrent(href, path)}>
                                <div className={`menu-button ${href.split('/')[href.split('/').length - 1]}`}>
                                    <Icon />
                                    <div>{label}</div>
                                </div>
                            </a>
                        </li>
                    )}
                </ul>
                <div className="logout extra">
                    <div className="menu-button" role="button">
                        <icons.LogoutIcon/>
                        <div>Déconnexion</div>
                    </div>
                </div>
            </nav>
        </>
    )
}