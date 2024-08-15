import Results from '@/feat/search/components/Results'
import type { SearchParams } from '@/feat/search/types'

export const experimental_ppr = true

export default function Home({ searchParams }: SearchParams) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Results searchParams={searchParams} />
		</main>
	)
}
