import { getRepos } from '@/lib/api'
import { SearchParams } from '../types'

export default async function Results({ searchParams }: SearchParams) {
	const data = await getRepos()
	console.log(data)
	return <div></div>
}
