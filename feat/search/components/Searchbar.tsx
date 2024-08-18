'use client'

import { useState } from 'react'
import useQueryParams from '@/feat/search/hooks/useQueryParams'

import { SearchParams } from '../types'
import IconSearch from '@/feat/UI/Icons/Search'

export default function SearchBar({
	q
}: {
	q: SearchParams[keyof SearchParams]
}) {
	const [keywords, setKeywords] = useState(q)
	const { setQueryParams } = useQueryParams('q')
	function search(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setQueryParams(keywords)
	}

	return (
		<form
			className="bg-foreground text-background rounded-md flex items-center gap-x-2 py-2 px-3"
			onSubmit={search}
		>
			<IconSearch className="size-5" />
			<input
				type="text"
				className="px-1 w-full bg-transparent"
				value={keywords}
				onChange={(e) => setKeywords(e.target.value)}
			/>
		</form>
	)
}
