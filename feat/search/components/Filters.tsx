import { getFilters } from '@/lib/api'
import type { SearchParams } from '@/feat/search/types'
import SkeletonFilters from './Skeletons/Filters'

export async function Filters({
	searchParams
}: {
	searchParams: SearchParams
}) {
	const filters = await getFilters(searchParams)
	return !!Object.values(filters).length ? (
		<div className="bg-background border border-border rounded-md h-full px-4 py-2">
			<span className="text-xl font-bold">Filters</span>
		</div>
	) : null
}

export { SkeletonFilters as FiltersSkeleton }
