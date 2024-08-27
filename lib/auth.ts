import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

type SessionData = Record<string, unknown>
type SessionParams = {
	cookieName: string
	value: unknown
}

export async function getSessionCookie(
	cookieName: SessionParams['cookieName']
): Promise<SessionData['value']> {
	const session = await getIronSession<SessionData>(cookies(), {
		password: process.env.IRON_SESSION_SECRET as string,
		cookieName
	})

	return session[cookieName]
}
export async function setSessionCookie({ cookieName, value }: SessionParams) {
	const session = await getIronSession<SessionData>(cookies(), {
		password: process.env.IRON_SESSION_SECRET as string,
		cookieName
	})

	session[cookieName] = value
	await session.save()
}

export const OAuthAuthorizeUrl = `https://github.com/login/oauth/authorize?client_id=${
	process.env.GITHUB_CLIENT_ID
}&redirect_uri=${
	!!+(process.env?.IS_DEV ?? '0')
		? 'http://localhost:3000/api/auth'
		: `${process.env.PROD_URL}/api/auth`
}&state=${process.env.GITHUB_SALT}`

export const OAuthTokenUrl = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
