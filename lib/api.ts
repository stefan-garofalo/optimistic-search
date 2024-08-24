import { LIMIT } from '@/feat/search/config'
import { TRepositories } from '@/feat/search/types'
import { formatFilters } from '@/feat/search/utils'
import { isArray } from 'util'

async function get(segment: string, query: URLSearchParams) {
	const res = await fetch(`${process.env.API_ENDPOINT}/${segment}?${query}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.github.text-match+json',
			'X-GitHub-Api-Version': '2022-11-28'
		},
		cache: 'force-cache'
	})

	return res.json() as Promise<unknown>
}

type ApiParams = {
	q?: string
	sort?: string
	order?: string
	limit?: number
	page?: number
	filter?: string | string[]
}

export async function getFilters(params: ApiParams = {}) {
	const data = await getRepos(params)
	return formatFilters(data.items)
}

export async function getRepos({
	q = '',
	sort = '',
	order = '',
	limit = LIMIT,
	page = 1,
	filter = []
}: ApiParams = {}) {
	const data = (await get(
		'repositories',
		new URLSearchParams({
			q: [q, ...(Array.isArray(filter) ? filter : [filter])]
				.filter(Boolean)
				.join(' '),
			sort,
			order,
			per_page: limit.toString(),
			page: page.toString()
		})
	)) as TRepositories

	return data
}
