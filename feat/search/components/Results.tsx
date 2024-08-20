import { getRepos } from '@/lib/api'
import { SearchParams } from '../types'
import CardRepository from '@/feat/UI/Cards/Repository'

export default async function Results({
	searchParams
}: {
	searchParams: SearchParams
}) {
	const { items } = await getRepos(searchParams)

	return !!items.length ? (
		<div className="grid grid-cols-3 grid-rows-4 gap-2">
			{!!items.length &&
				items.map((item) => <CardRepository key={item.id} {...item} />)}
		</div>
	) : (
		<h3 className="text-xl font-bold">No results found!</h3>
	)
}
