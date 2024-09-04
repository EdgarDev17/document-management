import { NoAuth } from '@/app/components/common/noauth'
import { auth } from '@/auth'
import { AddRubrica } from './rubrica-form'

export default async function Page() {
	const session = await auth()

	if (!session) {
		return <NoAuth />
	}

	return <AddRubrica token={session.accessToken} />
}
