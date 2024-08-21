'use client'

import useOptimisticParams from '@/feat/search/hooks/useOptimisticParams'
import { merge } from '@/lib/tailwind'

export default function FilterElement({
	query,
	items
}: {
	query: string
	items: { name: string; value: string; color?: string }[]
}) {
  
	return (
		<>
			<h2 className="text-lg font-bold capitalize">{query}</h2>
			<ul className="flex flex-col gap-y-0.5">
				{items.map((filter) => (
					<li key={filter.value}>
						<span
							style={
								{ '--color': filter?.color as string } as React.CSSProperties
							}
							className={merge(
								'text-sm',
								'color' in filter &&
									`bg-[var(--color)] px-1 py-0.5 border border-border font-mono rounded-md`
							)}
						>
							{filter.name}
						</span>
					</li>
				))}
			</ul>
		</>
	)
}
