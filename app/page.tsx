import { Suspense } from 'react'

import type { SearchParams } from '@/feat/search/types'
import SearchBar from '@/feat/search/components/Searchbar'
import Pagination from '@/feat/search/components/Pagination'
import Sort from '@/feat/search/components/Sort'
import { Results, ResultsSkeleton } from '@/feat/search/components/Results'
import {
	Filters,
	FiltersSkeleton
} from '@/feat/search/components/Filters/index'

import Header from '@/feat/sections/header'

export const experimental_ppr = true

export default function Home({ searchParams }: { searchParams: SearchParams }) {
	searchParams.q = searchParams.q || 'git'
	searchParams.page = +(searchParams.page || 1)
	return (
		<main className="group/query h-svh p-container flex flex-col gap-y-6">
			<section className="flex flex-col gap-y-4">
				<Header />
				<div className="flex items-center justify-between">
					<SearchBar q={searchParams.q} className="w-1/2" />
					<div className="flex items-center gap-x-2">
						<Pagination searchParams={searchParams} page={searchParams.page} />
						<Sort />
					</div>
				</div>
			</section>
			<section className="grid grid-cols-4 gap-6 first:*:col-span-1 last:*:col-span-3 h-[75svh]">
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
