import { getFilters } from '@/lib/api'
import type { SearchParams } from '@/feat/search/types'

import FilterList from './List'
import FilterReset from './Reset'
import SkeletonFilters from '../Skeletons/Filters'
import IconFilter from '@/ui/Icons/Filter'
import { ClassValue } from 'clsx'
import { merge } from '@/lib/tailwind'

export default async function Filters({
	searchParams,
	className
}: {
	className?: ClassValue
	searchParams: SearchParams
}) {
	const filters = await getFilters(searchParams)

	return !!Object.values(filters).length ? (
		<div
			className={merge(
				'relative bg-background border border-border rounded-md max-h-full overflow-auto px-4 pb-2 lg:pb-3 group-has-[[data-pending]]/query:animate-pulse',
				className
			)}
		>
			<div className="isolate z-[1] border-b lg:border-b-0 border-border sticky top-0 flex items-center justify-between bg-background ">
				<h2 className="flex items-center gap-x-1.5 py-2 lg:py-3 text-lg lg:text-xl font-bold">
					<span>Filters</span>
					<IconFilter className="size-5" />
				</h2>
				<FilterReset />
			</div>
			<ul className="pt-1 flex flex-col gap-y-4">
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
