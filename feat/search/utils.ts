import { TRepositories } from './types'
import LANG_LIST from './langs.json'

type TLanguage = {
	aliases?: string[]
	color?: string
	name: string
}
type TFilterLanguage = Omit<TLanguage, 'aliases'> & {
	value: `language:${string}`
}
type TFilterOwner = {
	value: `${'org' | 'user'}:${string}` | string
	name: string
}
type TFilterStatus = {
	value: `is:${'archived' | 'forked'}`
	name: 'Archived' | 'Forked'
}
type TFilterTopic = { name: string; value: `topic:${string}` }

export function formatFilters(items: TRepositories['items']) {
	const languagesMap = new Map<string, TFilterLanguage>()
	const ownersMap = new Map<string, TFilterOwner>()
	const statusMap = new Map<string, TFilterStatus>()
	const topicsMap = new Map<string, TFilterTopic>()

	for (const item of items) {
		const [langKey, langs] = formatLanguage(item, LANG_LIST)
		if (langKey && langs && !languagesMap.has(langKey))
			languagesMap.set(langKey, langs)

		const [ownerKey, owner] = formatOwner(item?.owner)
		if (ownerKey && owner && !ownersMap.has(ownerKey))
			ownersMap.set(ownerKey, owner)

		const statuses = formatStatuses(item)
		for (const status of statuses) {
			if (status && !statusMap.has(status.value))
				statusMap.set(status.value, status)
		}

		const topics = formatTopics(item.topics)
		for (const topic of topics) {
			if (topic && !topicsMap.has(topic.value))
				topicsMap.set(topic.value, topic)
		}
	}

	return {
		...(!!languagesMap.size ? { languages: [...languagesMap.values()] } : {}),
		...(!!ownersMap.size ? { owners: [...ownersMap.values()] } : {}),
		...(!!statusMap.size ? { statuses: [...statusMap.values()] } : {}),
		...(!!topicsMap.size ? { topics: [...topicsMap.values()] } : {})
	}
}

const formatTopics = (topics?: string[]) =>
	topics?.map((topic) => ({ name: topic, value: `topic:${topic}` as const })) ??
	[]

const formatStatuses = ({ archived, forks }: TRepositories['items'][0]) =>
	[
		archived && ({ value: 'is:archived', name: 'Archived' } as const),
		forks && ({ value: 'is:forked', name: 'Forked' } as const)
	].filter(Boolean)

const formatOwner = (owner?: TRepositories['items'][0]['owner']) =>
	owner
		? ([
				owner.login,
				{
					value: `${owner.type === 'Organization' ? 'org' : 'user'}:${
						owner.login
					}`,
					name: owner.login
				}
		  ] as const)
		: [null, null]

const formatLanguage = (
	item: TRepositories['items'][0],
	langs: { [K in keyof typeof LANG_LIST]: TLanguage }
): [string | null, TFilterLanguage | null] =>
	!item.language
		? [null, null]
		: ([
				item.language,
				{
					...langs[item.language as keyof typeof langs],
					value: `language:${
						langs[item.language as keyof typeof langs]?.aliases ?? [
							item.language
						]
					}`,
					name: item.language
				}
		  ] as const)
