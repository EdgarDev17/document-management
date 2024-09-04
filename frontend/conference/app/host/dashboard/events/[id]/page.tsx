import { auth } from '@/auth'
import { apiClient } from '@/lib/api-service'
import { urlConference, urlInstitutions } from '@/lib/endpoints'
import { Conference } from '@/types/models/conference'
import { EventContainer } from './EventsContainer'

async function getEventAgenda(id: string, token: string) {
	try {
		const response = await apiClient.get(
			`${urlConference}/conferenceslisttopicsbyconferenceid?conferenceID=${id}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)

		return response.data.topics
	} catch (err) {
		return null
	}
}

async function getEventDetails(id: string, token: string) {
	try {
		const response = await apiClient.get(
			`${urlConference}/conferencesdetailsspecific?conferenceID=${id}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)

		console.log('detalles host', response.data.conference[0])
		return response.data.conference[0]
	} catch (err) {
		return err
	}
}

async function getInstitution(id: string, token: string) {
	try {
		const response = await apiClient.get(`${urlInstitutions}/${id}`, {
			headers: {
				'Authorization-Token': token,
			},
		})
		return response.data
	} catch (err) {
		return err
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	const session = await auth()

	if (!session) {
		return 'no auth'
	}

	const event: Conference = await getEventDetails(
		params.id,
		session.accessToken
	)
	const agenda = await getEventAgenda(params.id, session.accessToken)
	const institution = await getInstitution(
		event.institutionID.toString(),
		session.accessToken
	)
	const isAdmin = event.userID === parseInt(session.userId)

	return (
		<div className=' p-4 space-y-8 h-[70vh]'>
			<EventContainer
				event={event}
				agenda={agenda}
				institution={institution}
				isAdmin={isAdmin}
				token={session.accessToken}
			/>
		</div>
	)
}
