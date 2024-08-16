export default function CardRepository({
	name,
	owner,
	stargazers_count,
	description,
	html_url
}: {
	name: string
	description: string
	html_url: string
	owner: { login: string; html_url: string }
	stargazers_count: number
}) {
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
			<h3 className="text-sm w-full opacity-75 pb-2 border-b border-secondary">
				<a className="w-fit hover:underline " href={owner.html_url}>
					{owner.login}
				</a>
			</h3>
			<div className="pt-3">{description}</div>
		</article>
	)
}
