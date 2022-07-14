import React from 'react'
import { IntlProvider as IntlProviderReact } from 'react-intl'

import en from './languages/en.json'
import fr from './languages/fr.json'

const locale = navigator.language.split(/[-_]/)[0] || 'fr'
const languages = { en, fr }

const IntlProvider = ({ children }) => {
	return (
		<IntlProviderReact locale={locale} messages={languages[locale]}>
			{children}
		</IntlProviderReact>
	)
}

export default IntlProvider
