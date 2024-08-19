import { useOptimistic, useTransition } from 'react'
import useQueryParams from './useQueryParams'
import { SearchParams } from '../types'

export default function useOptimisticParams(
	initialState: SearchParams[keyof SearchParams]
) {
	const { setQueryParams } = useQueryParams('page')
	const [isPending, startTransition] = useTransition()
	const [optimsticState, addOptimistic] = useOptimistic(initialState)

	function setOptimisticState(updatedState: SearchParams[keyof SearchParams]) {
		startTransition(() => {
			if (isPending) return
			addOptimistic(updatedState)
			setQueryParams(updatedState)
		})
	}

	return [optimsticState, setOptimisticState, isPending]
}
