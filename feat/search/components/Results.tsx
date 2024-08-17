import { getRepos } from '@/lib/api'
import { SearchParams } from '../types'
import CardRepository from '@/feat/UI/Cards/Repository'

export default async function Results({ searchParams }: SearchParams) {
	const data = await getRepos(searchParams)

	return (
		<div className="border border-current rounded-md p-4 grid grid-cols-3 gap-5">
			{!!data.items.length &&
				data?.items.map((item) => <CardRepository key={item.id} {...item} />)}
		</div>
	)
}