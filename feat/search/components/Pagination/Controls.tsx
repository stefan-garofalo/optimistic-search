'use client'

import useOptimisticParams from '@/feat/search/hooks/useOptimisticParams'
import { LIMIT } from '@/feat/search/config'
import { ButtonPrimary } from '@/feat/UI/Buttons'
import IconArrow from '@/feat/UI/Icons/Arrow'

export default function Controls({
	currentPage,
	totalCount
}: {
	currentPage: number
	totalCount: number
}) {
	const { optimisticState, setOptimisticState, isPending } =
		useOptimisticParams('page', currentPage)
	console.log(optimisticState)
	return (
		<div className="relative flex items-center gap-x-2">
			<span className="absolute top-0 -left-2 -translate-x-full">
				Page: {optimisticState}
			</span>
			<ButtonPrimary
				onClick={() => setOptimisticState(currentPage - 1)}
				disabled={isPending || currentPage === 1}
				data-pending={isPending ? '' : undefined}
			>
				<IconArrow className="size-5 rotate-180" />
				<span className="sr-only">Prev</span>
			</ButtonPrimary>
			<ButtonPrimary
				onClick={() => setOptimisticState(currentPage + 1)}
				disabled={isPending || currentPage * LIMIT >= totalCount}
				data-pending={isPending ? '' : undefined}
			>
				<IconArrow className="size-5" />
				<span className="sr-only">Next</span>
			</ButtonPrimary>
		</div>
	)
}
