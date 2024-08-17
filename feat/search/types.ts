import { Endpoints } from '@octokit/types'

export type SearchParams = {
	searchParams: { [key: string]: string | string[] | undefined }
}
export type TRepositories =
	Endpoints['GET /search/repositories']['response']['data']
