import { Suspense } from 'react'
import { generate } from '@/lib/metadata'

import type { SearchParams } from '@/feat/search/types'
import SearchBar from '@/feat/search/components/Searchbar'
import Results, { ResultsSkeleton } from '@/feat/search/components/Results'
import Filters, { FiltersSkeleton } from '@/feat/search/components/Filters/index'
import Pagination, { PaginationSkeleton } from '@/feat/search/components/Pagination'
import Sort from '@/feat/search/components/Sort'

import Header from '@/feat/sections/header'

export const experimental_ppr = true
export function generateMetadata() {
	return generate({
		title: 'Optimistic Git',
		description:
			'All the new React and Next jazz to power Github Search API. ft: PPR, Suspense, Streaming, optimistic updates and auth',
		canonical: '/'
	})
}
export default function Home({ searchParams }: { searchParams: SearchParams }) {
	searchParams.q = searchParams.q || 'git'
	searchParams.page = +(searchParams.page || 1)

	return (
		<main className="group/query max-lg:overflow-auto max-lg:min-h-svh lg:h-svh p-container flex flex-col gap-y-4 lg:gap-y-6">
			<section className="flex flex-col gap-y-4">
				<Header />
				<div className="flex flex-col lg:flex-row items-center justify-between gap-y-4">
					<SearchBar q={searchParams.q} className="w-full lg:w-1/2" />
					<div className="w-full lg:w-auto h-full flex flex-row-reverse lg:flex-row lg:items-center lg:justify-start gap-2">
						<Suspense fallback={<PaginationSkeleton />}>
							<Pagination
								className="lg:h-full"
								searchParams={searchParams}
								page={searchParams.page}
							/>
						</Suspense>
						<Sort />
					</div>
				</div>
			</section>
			<section className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:first:*:col-span-1 lg:last:*:col-span-3 lg:h-[75svh]">
				<Suspense fallback={<FiltersSkeleton />}>
					<Filters className="h-[30svh] lg:h-full" searchParams={searchParams} />
				</Suspense>
				<Suspense fallback={<ResultsSkeleton />}>
					<Results searchParams={searchParams} />
				</Suspense>
			</section>
		</main>
	)
}
