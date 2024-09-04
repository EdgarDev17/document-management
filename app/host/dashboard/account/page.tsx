import { NoAuth } from '@/app/components/common/noauth'
import { auth } from '@/auth'
import { UserProfileData } from './user-profile-data'

export default async function Page() {
	const session = await auth()

	if (!session) {
		return <NoAuth />
	}

	return <UserProfileData token={session.accessToken} />
}
