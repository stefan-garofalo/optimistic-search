import { getRepos } from '@/lib/api'

import { SearchParams } from '@/feat/search/types'
import { LIMIT } from '@/feat/search/config'

import Controls from './Controls'

export default async function Pagination({
	searchParams,
	page
}: {
	searchParams: SearchParams
	page: number
}) {
	const { total_count: count } = await getRepos(searchParams)

	return (
		<div className="h-full flex items-center gap-x-2">
			<span className="mt-auto">
				{LIMIT * page} of {count?.toLocaleString()}
			</span>
			<Controls currentPage={page} />
		</div>
	)
}
