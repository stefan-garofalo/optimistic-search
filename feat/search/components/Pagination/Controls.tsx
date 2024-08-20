'use client'

import useOptimisticParams from '@/feat/search/hooks/useOptimisticParams'
import { ButtonPrimary } from '@/feat/UI/Buttons'
import IconArrow from '@/feat/UI/Icons/Arrow'

export default function Controls({ currentPage }: { currentPage: number }) {
	const [optimsticState, setOptimisticState, isPending] = useOptimisticParams(
		'page',
		currentPage
	)

	return (
		<div
			data-pending={isPending}
			className="relative flex items-center gap-x-2"
		>
			<span className="absolute top-0 -translate-y-0.5 -left-2 -translate-x-full">
				Page: {optimsticState}
			</span>
			<ButtonPrimary onClick={() => setOptimisticState(currentPage - 1)}>
				<IconArrow className="size-5 rotate-180" />
				<span className="sr-only">Prev</span>
			</ButtonPrimary>
			<ButtonPrimary onClick={() => setOptimisticState(currentPage + 1)}>
				<IconArrow className="size-5" />
				<span className="sr-only">Next</span>
			</ButtonPrimary>
		</div>
	)
}
