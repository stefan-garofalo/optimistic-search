import { redirect } from 'next/navigation'
import { setSessionCookie } from '@/lib/auth'

export async function GET() {
	await setSessionCookie({
		cookieName: 'ghtoken',
		value: undefined
	})
	return redirect('/')
}
