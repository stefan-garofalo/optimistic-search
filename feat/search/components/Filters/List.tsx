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
	const { optimisticState, appendOptimisticState, isPending } =
		useOptimisticParams<string[]>('filter')

	return (
		<>
			<h2 className="text-lg font-bold capitalize">{query}</h2>
			<ul
				className="flex flex-col gap-y-1"
				data-pending={isPending ? '' : undefined}
			>
				{items.map((filter) => (
					<li key={filter.value}>
						<FilterElement
							active={(optimisticState as string[]).includes(filter.value)}
							query={query}
							filter={filter}
							onClick={(value) => appendOptimisticState(value as string[])}
							disabled={isPending}
						/>
					</li>
				))}
			</ul>
		</>
	)
}
