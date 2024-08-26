import { Endpoints } from '@octokit/types'

export type SearchParams = {
	[key: string]: string | number | undefined | string[]
}

export type ApiError = {
	message: string
	documentation_url: string
	status: number
	statusText: string
}

export type TRepositories =
	Endpoints['GET /search/repositories']['response']['data']
