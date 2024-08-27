import { ok, err } from 'neverthrow'
import { getSessionCookie } from '@/lib/auth'
import { LIMIT } from '@/feat/search/config'
import { TRepositories, ApiError } from '@/feat/search/types'
import { formatFilters } from '@/feat/search/utils'

type ApiParams = {
	q?: string
	sort?: string
	order?: string
	limit?: number
	page?: number
	filter?: string | string[]
}

async function get(segment: string, query: URLSearchParams) {
	const token = await getSessionCookie('ghtoken')
	const res = await fetch(`${process.env.API_ENDPOINT}/${segment}?${query}`, {
		method: 'GET',
		headers: {
			...(token ? { Authorization: `bearer ${token}` } : {}),
			'Content-Type': 'application/vnd.github.text-match+json',
			'X-GitHub-Api-Version': '2022-11-28'
		},
		cache: 'force-cache'
	})

	const data = await res.json()
	return !res.ok
		? err({
				message: data.message.replace(
					/for \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b\s?\.\s/g,
					'. '
				),
				documentation_url: data.documentation_url,
				status: res.status,
				statusText: res.statusText
		  } as ApiError)
		: ok(data as TRepositories)
}

export async function getFilters(params: ApiParams = {}) {
	const data = await getRepos(params)
	return data.isErr() ? [] : formatFilters(data.value.items)
}

export async function getRepos({
	q = '',
	sort = '',
	order = '',
	limit = LIMIT,
	page = 1,
	filter = []
}: ApiParams = {}) {
	const data = await get(
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
	)

	return data
}
