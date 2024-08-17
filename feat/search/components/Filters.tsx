import { getFilters } from '@/lib/api'
import type { SearchParams } from '../types'

export default async function Filters({ searchParams }: SearchParams) {
	const filters = await getFilters(searchParams)
	return (
		<div className="border border-current rounded-md h-full p-4">
			<span className="text-xl font-bold">Filters</span>
		</div>
	)
}
