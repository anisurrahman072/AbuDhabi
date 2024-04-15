// All localized texts
import LOCALIZATIONS from './localizations'

/*
 * @parameter screenName. Ex: 'loginScreen'
 * @parameter local. Ex: 'en' or 'ar'
 * @parameter attribute. Ex: 'title'
 */
export default function findLocalText({ screenName, local, attribute }) {
	console.log(screenName, local, attribute)
	return LOCALIZATIONS[screenName][local][attribute]
}
