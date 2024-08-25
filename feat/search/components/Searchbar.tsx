'use client'

import { useState } from 'react'
import useQueryParams from '@/feat/search/hooks/useQueryParams'

import { SearchParams } from '../types'
import IconSearch from '@/ui/Icons/Search'
import { merge } from '@/lib/tailwind'
import { ClassValue } from 'clsx'

export default function SearchBar({
	q,
	className
}: {
	q: SearchParams[keyof SearchParams]
	className?: ClassValue
}) {
	const [keywords, setKeywords] = useState(q)
	const { setQueryParams } = useQueryParams('q')

	function search(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setQueryParams(keywords)
	}

	return (
		<form
			className={merge(
				'relative bg-background border border-border [&:hover:not(:has(input:focus))]:border-border-active transition-colors duration-300 rounded-md flex items-center',
				className
			)}
			onSubmit={search}
		>
			<IconSearch className="size-5 absolute top-1/2 -translate-y-1/2 left-3" />
			<input
				type="text"
				className="w-full bg-transparent py-2 pl-10 pr-3 focus:outline-2 focus:outline-foreground focus:outline-offset-4 rounded-[5px]"
				value={keywords}
				onChange={(e) => setKeywords(e.target.value)}
			/>
		</form>
	)
}
