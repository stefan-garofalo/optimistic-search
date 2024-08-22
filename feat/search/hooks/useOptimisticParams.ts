'use client'

import { useOptimistic, useTransition } from 'react'
import useQueryParams from './useQueryParams'
import { SearchParams } from '../types'

export default function useOptimisticParams<T extends keyof SearchParams>(
	key: string,
	initialState?: SearchParams[T]
) {
	const { searchParams, setQueryParams, appendQueryParams, resetQueryParams } =
		useQueryParams(key)
	const [isPending, startTransition] = useTransition()
	const [optimisticState, addOptimistic] = useOptimistic<
		SearchParams[T] | SearchParams[T][]
	>(initialState || searchParams.getAll(key))

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

	function resetOptimisticState() {
		set(undefined, resetQueryParams)
	}

	return {
		optimisticState,
		setOptimisticState,
		appendOptimisticState,
		resetOptimisticState,
		isPending
	}
}
