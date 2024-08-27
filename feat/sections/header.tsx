import { SecondaryButtonLink } from '@/ui/ButtonLink'

export default function Header() {
	return (
		<header className="flex items-end justify-between">
			<div>
				<h1 className="text-2xl font-bold">Optimistic Git</h1>
				<h2 className="text-lg">
					All the new React and Next jazz to power GitHub&apos;s search API:
					<code>PPR</code>, <code>&lt;Suspense&gt;</code>, Streaming and
					<code>useOptimistic</code>.
				</h2>
			</div>
			<SecondaryButtonLink href="/api/login">Login</SecondaryButtonLink>
		</header>
	)
}
