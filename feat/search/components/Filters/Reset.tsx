'use client'

import useOptimisticParams from '@/feat/search/hooks/useOptimisticParams'
import { ButtonPrimary } from '@/feat/UI/Buttons'
import IconReset from '@/feat/UI/Icons/Reset'
import { merge } from '@/lib/tailwind'
import { ClassValue } from 'clsx'

export default function FilterReset({ className }: { className?: ClassValue }) {
	const { optimisticState, resetOptimisticState, isPending } =
		useOptimisticParams('filter')
	const filters = optimisticState as string[]
	return filters && filters?.length > 2 ? (
		<ButtonPrimary
			className={merge('', className)}
			onClick={resetOptimisticState}
			data-pending={isPending ? '' : undefined}
			disabled={isPending}
		>
			<IconReset className="size-4" />
			<span className="sr-only">Reset filters</span>
		</ButtonPrimary>
	) : null
}
