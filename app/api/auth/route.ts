import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'
import { OAuthTokenUrl, setSessionCookie } from '@/lib/auth'

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
	if (searchParams.get('state') !== process.env.GITHUB_SALT)
		return redirect('/')
	const res = await fetch(`${OAuthTokenUrl}&code=${searchParams.get('code')}`, {
		method: 'POST'
	})
	const authData = await res.formData()
	await setSessionCookie({
		cookieName: 'ghtoken',
		value: authData.get('access_token')
	})
	return redirect('/')
}
