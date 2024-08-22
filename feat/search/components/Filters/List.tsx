'use client'

import useOptimisticParams from '@/feat/search/hooks/useOptimisticParams'
import type {
	TFilterLanguage,
	TFilterOwner,
	TFilterStatus,
	TFilterTopic
} from '@/feat/search/utils'
import FilterElement from './Element'

export default function FilterList({
	query,
	items
}: {
	query: string
	items: TFilterLanguage[] | TFilterOwner[] | TFilterStatus[] | TFilterTopic[]
}) {
	const { appendOptimisticState, isPending } = useOptimisticParams('filter')
	return (
		<>
			<h2 className="text-lg font-bold capitalize">{query}</h2>
			<ul className="flex flex-col gap-y-1" data-pending={isPending}>
				{items.map((filter) => (
					<li key={filter.value}>
						<FilterElement
							query={query}
							filter={filter}
							onClick={appendOptimisticState}
						/>
					</li>
				))}
			</ul>
		</>
	)
}
