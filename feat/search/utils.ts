import { TRepositories } from './types'
import LANG_LIST from './langs.json'

type TLanguage = {
	aliases?: string[]
	color?: string
	name: string
}
type TFilterLanguage = Omit<TLanguage, 'aliases'> & { link: string }

export function formatFilters(items: TRepositories['items']) {
	const LanguagesMap = new Map<string, TFilterLanguage>()

	for (const item of items) {
		const [langKey, langs] = formatLanguage({ item, langs: LANG_LIST })
		if (langKey && langs && !LanguagesMap.has(langKey)) {
			LanguagesMap.set(langKey, langs)
		}
	}

	return {
		languages: Array.from(LanguagesMap.values())
	}
}

function formatOwner(item: TRepositories['items'][0]) {}

const formatLanguage = ({
	item,
	langs
}: {
	item: TRepositories['items'][0]
	langs: { [K in keyof typeof LANG_LIST]: TLanguage }
}): [string | null, TFilterLanguage | null] =>
	!item.language
		? [null, null]
		: [
				item.language,
				{
					...langs[item.language as keyof typeof langs],
					link: `/language:${
						langs[item.language as keyof typeof langs]?.aliases ?? [
							item.language
						]
					}`,
					name: item.language
				}
		  ]
