import { useSearchParams, useRouter } from 'next/navigation'
import { SearchParams } from '../types'

export default function useQueryParams(key: string) {
	const searchParams = useSearchParams()
	const { push } = useRouter()
	const params = new URLSearchParams(searchParams.toString())

	function setQueryParams(value: SearchParams[keyof SearchParams]) {
		if (!value) params.delete(key)
		else if (params.getAll(key).includes(value))
			params.getAll(key).map((v) => v !== value && params.append(key, v))
		else params.set(key, value)
		push(`?${params.toString()}`)
	}

	function resetQueryParams() {
		params.delete(key)
		push(`?${params.toString()}`)
	}

	return { searchParams, setQueryParams, resetQueryParams }
}
