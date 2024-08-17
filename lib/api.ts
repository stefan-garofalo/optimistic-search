import { LIMIT } from '@/feat/search/config'
import { TRepositories } from '@/feat/search/types'
import { formatFilters } from '@/feat/search/utils'

async function get(segment: string, query: URLSearchParams) {
	const res = await fetch(`${process.env.API_ENDPOINT}/${segment}?${query}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28'
		},
		next: { revalidate: 60 }
	})
	return res.json() as Promise<unknown>
}

export async function getFilters({
	q = '',
	sort = '',
	order = '',
	limit = LIMIT,
	page = 1
} = {}) {
	const data = (await get(
		'repositories',
		new URLSearchParams({
			q,
			sort,
			order,
			per_page: limit.toString(),
			page: page.toString()
		})
	)) as TRepositories

	return formatFilters(data.items)
}

export async function getRepos({
	q = '',
	sort = '',
	order = '',
	limit = LIMIT,
	page = 1
}: {
	q?: string
	sort?: string
	order?: string
	limit?: number
	page?: number
} = {}) {
	const data = (await get(
		'repositories',
		new URLSearchParams({
			q,
			sort,
			order,
			per_page: limit.toString(),
			page: page.toString()
		})
	)) as TRepositories

	return data
}
