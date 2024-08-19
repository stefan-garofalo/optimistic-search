import { Endpoints } from '@octokit/types'

export type SearchParams = {
	[key: string]: string | number | undefined
}

export type TRepositories =
	Endpoints['GET /search/repositories']['response']['data']
