import { auth } from '@/auth'
import { EventsContainer } from './events-container'
import { NoAuth } from '@/app/components/common/noauth'

export default async function Page() {
	const session = await auth()

	if (!session) {
		return (
			<div className='w-full h-[90vh] flex justify-center items-center'>
				<NoAuth />
			</div>
		)
	}
	return (
		<div className=' flex justify-center items-center py-8'>
			<EventsContainer token={session.accessToken} />
		</div>
	)
}
