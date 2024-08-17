import { LIMIT } from '@/feat/search/config'
import { Endpoints } from '@octokit/types'

async function get({
	segment,
	query
}: {
	segment: string
	query: URLSearchParams
}) {
	const res = await fetch(`${process.env.API_ENDPOINT}/${segment}?${query}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28'
		},
		next: {
			revalidate: 60
		}
	})
	return res.json() as Promise<unknown>
}

export type TRepositories =
	Endpoints['GET /search/repositories']['response']['data']
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
} = {}): Promise<TRepositories> {
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

	return data as Promise<TRepositories>
}
