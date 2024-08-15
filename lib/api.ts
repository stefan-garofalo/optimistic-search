import { LIMIT } from '@/feat/search/config'

async function get({
	segment,
	query
}: {
	segment: string
	query: URLSearchParams
}) {
	console.log(`${process.env.API_ENDPOINT}/${segment}?${query}`)
	const res = await fetch(`${process.env.API_ENDPOINT}/${segment}?${query}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})
	return res.json()
}

export async function getRepos({
	q = 'js',
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
	const data = await get({
		segment: 'repositories',
		query: new URLSearchParams({
			q,
			sort,
			order,
			per_page: limit.toString(),
			page: page.toString()
		})
	})
	return data
}
