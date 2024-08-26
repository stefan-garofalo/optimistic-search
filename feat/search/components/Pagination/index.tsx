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
	const data = await getRepos(searchParams)
	if (data.isErr()) return null
	const { total_count: total, items } = data.value
	const count = items.length >= 11 ? LIMIT * page : items.length
	return (
		<div className="shrink-0 h-full flex items-center gap-x-2">
			<span className="mt-auto translate-y-0.5">
				{count} of {total?.toLocaleString()}
			</span>
			<Controls totalCount={total} currentPage={page} />
		</div>
	)
}
