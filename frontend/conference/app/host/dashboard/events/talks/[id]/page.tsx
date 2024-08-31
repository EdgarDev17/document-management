import { auth } from '@/auth'
import { DataContainer } from './data-container'
import { NoAuth } from '@/app/components/common/noauth'
import { apiClient } from '@/lib/api-service'
import { TalkClientWrapper } from './wrapper'
import { Conference } from '@/types/models/conference'

async function getTalkData(token: string, talkId: string) {
	console.log('PIDIENDO DATOS EN GETTALK...', talkId)
	try {
		const response = await apiClient.get(
			`/conference/ConferencesListTopicsByTopicsID?TopicsID=${talkId}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)
		return response.data.topics[0]
	} catch (err) {
		console.log(err)
	}
}

async function getEventDetailts(id: string, token: string) {
	try {
		const response = await apiClient.get(
			`/conference/conferencesdetailsspecific?conferenceID=${id}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)

		return response.data.conference[0]
	} catch (err) {
		console.log({ eventError: err })
		return err
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	const session = await auth()

	if (!session) {
		return (
			<div className='flex justify-center items-center h-screen w-full'>
				<NoAuth />
			</div>
		)
	}

	const talk = await getTalkData(session.accessToken, params.id)
	const event: Conference = await getEventDetailts(
		talk.conferenceID,
		session.accessToken
	)

	console.log('HOST CHARLA', talk)
	console.log('HOST Evento', event)

	return (
		<TalkClientWrapper
			talk={talk}
			event={event}
			token={session.accessToken}
			userId={parseInt(session.userId)}
		/>
	)
}
