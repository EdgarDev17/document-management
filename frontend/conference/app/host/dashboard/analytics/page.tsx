import { NoAuth } from '@/app/components/common/noauth'
import { auth } from '@/auth'
import { AnalyticsDataContainer } from './data-container'
import { apiClient } from '@/lib/api-service'
import { Conference } from '@/types/models/conference'

async function getAllEvents(
	token: string,
	userId: number
): Promise<Conference[]> {
	try {
		const response = await apiClient.get(
			'/Conference/ConferencesDetailsByUser',
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)
		console.log('eventos sin filtrar', response.data.conference)

		const adminEvents: Conference[] = response.data.conference.filter(
			(conference: Conference) => {
				console.log(conference.userID == userId)
				return conference.userID === userId
			}
		)

		return adminEvents
	} catch (error) {
		return []
	}
}

export default async function Page() {
	const session = await auth()

	if (!session) {
		return <NoAuth />
	}

	// consumiento la API
	const events: Conference[] = await getAllEvents(
		session.accessToken,
		parseInt(session.userId)
	)

	console.log(events)

	return <AnalyticsDataContainer events={events} />
}
