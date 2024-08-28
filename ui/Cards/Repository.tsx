import { merge } from '@/lib/tailwind'
import { ClassValue } from 'clsx'
import type { TRepositories } from '@/feat/search/types'

type CardRepositoryProps = Pick<
	TRepositories['items'][0],
	'name' | 'description' | 'html_url' | 'full_name' | 'owner' | 'stargazers_count'
> & { className?: ClassValue }

export default function CardRepository({
	name,
	owner,
	full_name,
	stargazers_count,
	description,
	html_url,
	className
}: CardRepositoryProps) {
	return (
		<article
			className={merge(
				'relative bg-background border border-border rounded-md px-3 py-2 has-[a:hover]:border-border-active transition-colors duration-300',
				className
			)}
		>
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold">
					<a
						className="after:absolute after:inset-0"
						target="_blank"
						href={html_url}
					>
						{name}
					</a>
				</h2>
				<span>{stargazers_count} ⭐️</span>
			</div>
			<h3 className="text-sm w-full opacity-75 pb-2 border-b border-border pointer-events-none">
				{owner ? (
					<a
						className="w-fit hover:underline pointer-events-auto"
						href={owner?.html_url}
						target="_blank"
					>
						{owner?.login}
					</a>
				) : (
					<span>{full_name.split('/')[0]}</span>
				)}
			</h3>
			<div className="pt-3 text-sm break-all line-clamp-4">{description}</div>
		</article>
	)
}
