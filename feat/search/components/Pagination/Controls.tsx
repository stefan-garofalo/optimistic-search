'use client'

import { useOptimistic, useTransition } from 'react'
import useQueryParams from '@/feat/search/hooks/useQueryParams'
import { ButtonPrimary } from '@/feat/UI/Buttons'
import IconArrow from '@/feat/UI/Icons/Arrow'

export default function Controls({ currentPage }: { currentPage: number }) {
	const { setQueryParams } = useQueryParams('page')
	const [isPending, startTransition] = useTransition()
	const [optimsticState, addOptimistic] = useOptimistic(currentPage)

	function paginate(direction: -1 | 1) {
		startTransition(() => {
			if (isPending) return
			addOptimistic(currentPage + direction)
			setQueryParams(currentPage + direction)
		})
	}

	return (
		<div
			data-pending={isPending}
			className="relative flex items-center gap-x-2"
		>
			<span className="absolute top-0 -left-2 -translate-x-full">
				Page: {optimsticState}
			</span>
			<ButtonPrimary onClick={() => paginate(-1)}>
				<IconArrow className="size-5 rotate-180" />
				<span className="sr-only">Prev</span>
			</ButtonPrimary>
			<ButtonPrimary onClick={() => paginate(1)}>
				<IconArrow className="size-5" />
				<span className="sr-only">Next</span>
			</ButtonPrimary>
		</div>
	)
}
