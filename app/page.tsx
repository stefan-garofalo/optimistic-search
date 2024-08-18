import { Suspense } from 'react'

import Results from '@/feat/search/components/Results'
import type { SearchParams } from '@/feat/search/types'
import Filters from '@/feat/search/components/Filters'
import SearchBar from '@/feat/search/components/Searchbar'

export const experimental_ppr = true

export default function Home({ searchParams }: { searchParams: SearchParams }) {
	searchParams.q = searchParams.q || 'js'

	return (
		<main className="min-h-svh p-container flex flex-col gap-y-10">
			<section className="flex flex-col gap-y-4">
				<div>
					<h1 className="text-2xl font-bold">Optimistic Git</h1>
					<h2 className="text-lg">
						All the new React and Next jazz to power GitHub&apos;s search API:
						<code>PPR</code>, <code>&lt;Suspense&gt;</code>, Streaming and
						<code>useOptimistic</code>.
					</h2>
				</div>
				<SearchBar q={searchParams.q} />
			</section>
			<section className="grow grid grid-cols-4 gap-6 first:*:col-span-1 last:*:col-span-3">
				<Suspense>
					<Filters searchParams={searchParams} />
				</Suspense>
				<Suspense>
					<Results searchParams={searchParams} />
				</Suspense>
			</section>
		</main>
	)
}
