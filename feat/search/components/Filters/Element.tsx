'use client'

import useOptimisticParams from '@/feat/search/hooks/useOptimisticParams'
import type {
	TFilterLanguage,
	TFilterOwner,
	TFilterStatus,
	TFilterTopic
} from '@/feat/search/utils'
import { merge } from '@/lib/tailwind'

export default function FilterElement({
	query,
	items
}: {
	query: string
	items: TFilterLanguage[] | TFilterOwner[] | TFilterStatus[] | TFilterTopic[]
}) {
	const { appendOptimisticState, isPending } = useOptimisticParams(query, '')
	return (
		<>
			<h2 className="text-lg font-bold capitalize">{query}</h2>
			<ul className="flex flex-col gap-y-1" data-pending={isPending}>
				{items.map((filter) => (
					<li key={filter.value}>
						<button
							onClick={() => appendOptimisticState(filter.value)}
							style={
								'color' in filter
									? ({
											'--color': filter?.color as string,
											'--text-color': getContrastColor(filter?.color as string)
									  } as React.CSSProperties)
									: {}
							}
							className={merge(
								'leading-none p-1',
								query === 'languages'
									? `bg-[var(--color)] text-[var(--text-color)] py-0.5 text-sm border border-border font-mono rounded-md hover:opacity-50 transition-opacity duration-300`
									: 'hover:bg-border-active transition-colors duration-300 rounded-md'
							)}
						>
							{filter.name}
						</button>
					</li>
				))}
			</ul>
		</>
	)
}

function getContrastColor(hexColor: string): '#000' | '#fff' {
	const hex = hexColor.replace(/^#/, '')
	const r = parseInt(hex.slice(0, 2), 16)
	const g = parseInt(hex.slice(2, 4), 16)
	const b = parseInt(hex.slice(4, 6), 16)

	return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? '#000' : '#fff'
}
