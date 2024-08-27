import { redirect } from 'next/navigation'
import { OAuthAuthorizeUrl } from '@/lib/auth'

export async function GET() {
	return redirect(OAuthAuthorizeUrl)
}
