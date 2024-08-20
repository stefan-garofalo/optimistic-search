'use client'

import { useOptimistic, useTransition } from 'react'
import useQueryParams from './useQueryParams'
import { SearchParams } from '../types'

export default function useOptimisticParams<T extends keyof SearchParams>(
	key: string,
	initialState: SearchParams[T]
): [SearchParams[T], (updatedState: SearchParams[T]) => void, boolean] {
	const { setQueryParams } = useQueryParams(key)
	const [isPending, startTransition] = useTransition()
	const [optimisticState, addOptimistic] =
		useOptimistic<SearchParams[T]>(initialState)

	function setOptimisticState(updatedState: SearchParams[T]) {
		startTransition(() => {
			if (isPending) return
			addOptimistic(updatedState)
			setQueryParams(updatedState)
		})
	}

	return [optimisticState, setOptimisticState, isPending]
}
