import { merge } from '@/lib/tailwind'

export default function SkeletonFilters() {
	return (
		<div className="bg-background border border-border rounded-md h-full px-4 py-3">
			<div className=" opacity-50">
				<div className="h-4 bg-foreground rounded animate-pulse w-1/3"></div>
				<div className="pt-8 flex flex-col gap-y-6">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={`filter-${i}`}>
							<div className="h-3 bg-foreground rounded animate-pulse w-1/2 mb-3.5"></div>
							{Array.from({ length: 8 }).map((_, i) => (
								<div
									key={`inner-${i}`}
									className={merge(
										'h-2 bg-foreground rounded animate-pulse mt-2',
										Math.floor(i * Math.random()) % 2 === 0 ? 'w-2/3' : 'w-full'
									)}
								></div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
