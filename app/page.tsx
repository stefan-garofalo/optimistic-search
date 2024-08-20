import { Suspense } from 'react'
import type { SearchParams } from '@/feat/search/types'

import { Results, ResultsSkeleton } from '@/feat/search/components/Results'
import { Filters, FiltersSkeleton } from '@/feat/search/components/Filters'
import SearchBar from '@/feat/search/components/Searchbar'
import Pagination from '@/feat/search/components/Pagination'
import Sort from '@/feat/search/components/Sort'

export const experimental_ppr = true

export default function Home({ searchParams }: { searchParams: SearchParams }) {
	searchParams.q = searchParams.q || 'git'
	searchParams.page = +(searchParams.page || 1)
	return (
		<main className="min-h-svh p-container flex flex-col gap-y-6">
			<section className="flex flex-col gap-y-4">
				<div>
					<h1 className="text-2xl font-bold">Optimistic Git</h1>
					<h2 className="text-lg">
						All the new React and Next jazz to power GitHub&apos;s search API:
						<code>PPR</code>, <code>&lt;Suspense&gt;</code>, Streaming and
						<code>useOptimistic</code>.
					</h2>
				</div>
				<div className="flex items-center justify-between">
					<SearchBar q={searchParams.q} className="w-1/2" />
					<div className="flex items-center gap-x-2">
						<Pagination searchParams={searchParams} page={searchParams.page} />
						<Sort />
					</div>
				</div>
			</section>
			<section className="grow grid grid-cols-4 gap-6 first:*:col-span-1 last:*:col-span-3 min-h-svh">
				{/* <FiltersSkeleton /> */}
				{/* <ResultsSkeleton /> */}
				<Suspense fallback={<FiltersSkeleton />}>
					<Filters searchParams={searchParams} />
				</Suspense>
				<Suspense fallback={<ResultsSkeleton />}>
					<Results searchParams={searchParams} />
				</Suspense>
			</section>
		</main>
	)
}
