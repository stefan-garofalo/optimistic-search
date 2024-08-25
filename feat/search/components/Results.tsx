import { getRepos } from '@/lib/api'
import { SearchParams } from '@/feat/search/types'
import CardRepository from '@/UI/Cards/Repository'
import SkeletonResults from './Skeletons/Results'

export async function Results({
	searchParams
}: {
	searchParams: SearchParams
}) {
	const { items } = await getRepos(searchParams)

	return !!items.length ? (
		<div className="h-full grid grid-cols-3 grid-rows-3 gap-2 group-has-[[data-pending]]/query:animate-pulse">
			{!!items.length &&
				items.map((item) => <CardRepository key={item.id} {...item} />)}
		</div>
	) : (
		<h3 className="text-xl font-bold">No results found!</h3>
	)
}

export { SkeletonResults as ResultsSkeleton }
