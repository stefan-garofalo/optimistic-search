import { getRepos } from '@/lib/api'

import { SearchParams } from '@/feat/search/types'
import CardRepository from '@/ui/Cards/Repository'
import Error from './Error'
import SkeletonResults from './Skeletons/Results'

export default async function Results({
	searchParams
}: {
	searchParams: SearchParams
}) {
	const data = await getRepos(searchParams)

	return data.isErr() ? (
		<Error {...data.error} />
	) : !!data.value.items.length ? (
		<div className="h-full grid grid-cols-1 lg:grid-cols-3 grid-rows-3 gap-2 group-has-[[data-pending]]/query:animate-pulse">
			{!!data.value.items.length &&
				data.value.items.map((item) => (
					<CardRepository
						className="last:mb-container lg:last:mb-0"
						key={item.id}
						{...item}
					/>
				))}
		</div>
	) : (
		<h3 className="text-xl font-bold">No results found!</h3>
	)
}

export { SkeletonResults as ResultsSkeleton }
