import { getFilters } from '@/lib/api'
import type { SearchParams } from '@/feat/search/types'

import FilterList from './List'
import FilterReset from './Reset'
import SkeletonFilters from '../Skeletons/Filters'
import IconFilter from '@/UI/Icons/Filter'

export async function Filters({
	searchParams
}: {
	searchParams: SearchParams
}) {
	const filters = await getFilters(searchParams)

	return !!Object.values(filters).length ? (
		<div className="relative bg-background border border-border rounded-md max-h-full overflow-auto px-4 py-3 group-has-[[data-pending]]/query:animate-pulse">
			<h2 className="flex items-center gap-x-1.5 text-xl font-bold">
				<span>Filters</span>
				<IconFilter className="size-5" />
			</h2>
			<FilterReset className="absolute right-4 top-2" />
			<ul className="pt-4 flex flex-col gap-y-4">
				{Object.entries(filters).map(([key, items]) => (
					<li key={key}>
						<FilterList query={key} items={items} />
					</li>
				))}
			</ul>
		</div>
	) : null
}

export { SkeletonFilters as FiltersSkeleton }
