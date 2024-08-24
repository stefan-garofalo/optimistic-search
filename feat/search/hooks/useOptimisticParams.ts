'use client'

import { useOptimistic, useTransition } from 'react'
import useQueryParams from './useQueryParams'
import { SearchParams } from '../types'

export default function useOptimisticParams<
	V extends SearchParams[keyof SearchParams] = SearchParams[keyof SearchParams]
>(key: string, initialState?: V) {
	const { searchParams, setQueryParams, appendQueryParams, resetQueryParams } =
		useQueryParams(key.toString())
	const [isPending, startTransition] = useTransition()
	const [optimisticState, addOptimistic] = useOptimistic<V>(
		(initialState ?? searchParams.getAll(key.toString())) as V
	)

	function set(updatedState: V | undefined, fn: (value: V) => void) {
		startTransition(() => {
			if (isPending || !updatedState) return
			addOptimistic(updatedState)
			fn(updatedState)
		})
	}

	function setOptimisticState(updatedState: V) {
		set(updatedState, setQueryParams)
	}

	function appendOptimisticState(updatedState: V) {
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
