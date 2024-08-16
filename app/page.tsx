import { Suspense } from 'react'

import Results from '@/feat/search/components/Results'
import type { SearchParams } from '@/feat/search/types'

export const experimental_ppr = true

export default function Home({ searchParams }: SearchParams) {
	searchParams.q = searchParams.q || 'js'

	return (
		<main className="min-h-svh px-container">
			<section className="py-10">
				<h1 className="text-2xl font-bold">Optimistic Git</h1>
				<h2 className="text-lg">
					All the new React and Next jazz to power GitHub&apos;s search API:
					<code>PPR</code>, <code>&lt;Suspense&gt;</code>, Streaming and
					<code>useOptimistic</code>.
				</h2>
			</section>
			<section className="grid grid-cols-4 gap-6 first:*:col-span-1 last:*:col-span-3">
				<Suspense>
					<div className="border border-current rounded-md h-full p-4">
						filters
					</div>
				</Suspense>
				<Suspense>
					<Results searchParams={searchParams} />
				</Suspense>
			</section>
		</main>
	)
}
