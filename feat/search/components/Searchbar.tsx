'use client'

import { useState } from 'react'
import IconSearch from '@/feat/UI/Icons/Search'

export default function SearchBar({ q }: { q: string | string[] }) {
	const [query, setQuery] = useState(q)
	return (
		<form className="bg-foreground text-background rounded-md flex items-center gap-x-2 py-2 px-3">
			<IconSearch className="size-5" />
			<input
				type="text"
				className="px-1 w-full"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</form>
	)
}
