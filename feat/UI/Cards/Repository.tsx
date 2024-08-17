import type { TRepositories } from '@/lib/api'

export default function CardRepository({
	name,
	owner,
	full_name,
	stargazers_count,
	description,
	html_url
}: Pick<
	TRepositories['items'][0],
	| 'name'
	| 'description'
	| 'html_url'
	| 'full_name'
	| 'owner'
	| 'stargazers_count'
>) {
	return (
		<article className="relative border border-current rounded-md px-3 py-2">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold">
					<a
						className="after:absolute after:inset-0 hover:underline"
						href={html_url}
					>
						{name}
					</a>
				</h2>
				<span>{stargazers_count} ⭐️</span>
			</div>
			<h3 className="text-sm w-full opacity-75 pb-2 border-b border-secondary pointer-events-none">
				{owner ? (
					<a
						className="w-fit hover:underline pointer-events-auto"
						href={owner?.html_url}
					>
						{owner?.login}
					</a>
				) : (
					<span>{full_name.split('/')[0]}</span>
				)}
			</h3>
			<div className="pt-3">{description}</div>
		</article>
	)
}
