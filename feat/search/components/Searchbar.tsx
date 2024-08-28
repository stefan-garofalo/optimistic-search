'use client'

import { useState } from 'react'
import useOptimisticParams from '../hooks/useOptimisticParams'
import { SearchParams } from '../types'

import { merge, ClassValue } from '@/lib/tailwind'
import IconSearch from '@/ui/Icons/Search'

export default function SearchBar({
	q,
	className
}: {
	q: SearchParams[keyof SearchParams]
	className?: ClassValue
}) {
	const [keywords, setKeywords] = useState(q)
	const { setOptimisticState, isPending } = useOptimisticParams('q', keywords)

	function search(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setOptimisticState(keywords)
	}

	return (
		<form
			className={merge(
				'relative bg-background border border-border [&:hover:not(:has(input:focus))]:border-border-active transition-colors duration-300 rounded-md flex items-center',
				'data-[pending]:animate-pulse data-[pending]:cursor-not-allowed',
				className
			)}
			onSubmit={search}
			data-pending={isPending ? '' : undefined}
		>
			<IconSearch className="size-5 absolute top-1/2 -translate-y-1/2 left-3" />
			<input
				disabled={isPending}
				type="text"
				className="w-full bg-transparent py-2 pl-10 pr-3 focus:outline-2 focus:outline-foreground focus:outline-offset-4 rounded-[5px] disabled:cursor-not-allowed"
				value={keywords}
				onChange={(e) => !isPending && setKeywords(e.target.value)}
			/>
		</form>
	)
}
