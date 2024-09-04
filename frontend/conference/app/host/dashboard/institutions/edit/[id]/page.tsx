import { auth } from '@/auth'
import EditForm from './edit-form'
import { NoAuth } from '@/app/components/common/noauth'

export default async function Page({ params }: { params: { id: number } }) {
	const session = await auth()

	if (!session) {
		return <NoAuth />
	}

	return <EditForm id={params.id.toString()} token={session.accessToken} />
}
