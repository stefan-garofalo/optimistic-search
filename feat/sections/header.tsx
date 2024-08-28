import { getSessionCookie } from '@/lib/auth'
import { SecondaryButtonLink } from '@/ui/ButtonLink'

export default async function Header() {
	const isLoggedIn = !!(await getSessionCookie('ghtoken'))
	return (
		<header className="flex items-start lg:items-end justify-between">
			<div>
				<h1 className="text-xl lg:text-2xl font-bold">Optimistic Git</h1>
				<h2 className="text lg:text-lg">
					All the new React and Next jazz to power Github&apos;s search API:
					<code>PPR</code>, <code>&lt;Suspense&gt;</code>, Streaming and
					<code>useOptimistic</code>.
				</h2>
			</div>
			<SecondaryButtonLink
				{...(isLoggedIn ? { href: '/api/logout' } : { href: '/api/login' })}
			>
				{isLoggedIn ? 'Logout' : 'Login'}
			</SecondaryButtonLink>
		</header>
	)
}
