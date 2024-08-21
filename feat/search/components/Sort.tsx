'use client'

import useOptimisticParams from '@/feat/search/hooks/useOptimisticParams'
import { SORTS, DEFAULT_SORT } from '@/feat/search/config'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/feat/UI/Select'
import IconSort from '@/feat/UI/Icons/Sort'

export default function Sort() {
	const [_, setOptimisticState, isPending] = useOptimisticParams(
		'sort',
		DEFAULT_SORT.id
	)
	return (
		<Select
			onValueChange={(e) => setOptimisticState(e)}
			defaultValue={DEFAULT_SORT.id}
		>
			<SelectTrigger
				data-pending={isPending ? '' : undefined}
				className="gap-x-2"
			>
				<IconSort className="size-5" />
				<SelectValue placeholder="Select a verified email to display" />
			</SelectTrigger>

			<SelectContent>
				{SORTS.map((e) => (
					<SelectItem
						key={e.id}
						value={e.id}
						className="capitalize hover:bg-border"
					>
						{e.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
