import { getFilters } from '@/lib/api'
import { merge } from '@/lib/tailwind'
import type { SearchParams } from '@/feat/search/types'
import SkeletonFilters from '../Skeletons/Filters'
import IconFilter from '@/feat/UI/Icons/Filter'
import FilterElement from './Element'

export async function Filters({
	searchParams
}: {
	searchParams: SearchParams
}) {
	const filters = await getFilters(searchParams)
	return !!Object.values(filters).length ? (
		<div className="bg-background border border-border rounded-md max-h-full overflow-auto px-4 py-2">
			<h2 className="flex items-center justify-between text-xl font-bold">
				<span>Filters</span>
				<IconFilter className="size-5" />
			</h2>
			<ul className="pt-4 flex flex-col gap-y-4">
				{Object.entries(filters).map(([key, items]) => (
					<li key={key}>
						<FilterElement query={key} items={items} />
					</li>
				))}
			</ul>
		</div>
	) : null
}

export { SkeletonFilters as FiltersSkeleton }
