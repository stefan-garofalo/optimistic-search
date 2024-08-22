'use client'

import { useOptimistic, useTransition } from 'react'
import useQueryParams from './useQueryParams'
import { SearchParams } from '../types'

export default function useOptimisticParams<T extends keyof SearchParams>(
	key: string,
	initialState: SearchParams[T]
) {
	const { setQueryParams, appendQueryParams } = useQueryParams(key)
	const [isPending, startTransition] = useTransition()
	const [optimisticState, addOptimistic] =
		useOptimistic<SearchParams[T]>(initialState)

	function set(
		updatedState: SearchParams[T],
		fn: (value: SearchParams[T]) => void
	) {
		startTransition(() => {
			if (isPending) return
			addOptimistic(updatedState)
			fn(updatedState)
		})
	}

	function setOptimisticState(updatedState: SearchParams[T]) {
		set(updatedState, setQueryParams)
	}

	function appendOptimisticState(updatedState: SearchParams[T]) {
		set(updatedState, appendQueryParams)
	}

	return {
		optimisticState,
		setOptimisticState,
		appendOptimisticState,
		isPending
	}
}
