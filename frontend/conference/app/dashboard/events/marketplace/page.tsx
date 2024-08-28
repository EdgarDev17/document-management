import { NoAuth } from '@/app/components/common/noauth'
import { EventSearch } from '@/app/components/features/eventsearch'
import { auth } from '@/auth'

export default async function Page() {
	const session = await auth()

	if (!session) {
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				<NoAuth />
			</div>
		)
	}

	return (
		<div>
			<EventSearch token={session.accessToken} />
		</div>
	)
}
