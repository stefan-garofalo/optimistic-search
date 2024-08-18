import { Endpoints } from '@octokit/types'

export type SearchParams = {
	[key: string]: string | undefined
}

export type TRepositories =
	Endpoints['GET /search/repositories']['response']['data']
