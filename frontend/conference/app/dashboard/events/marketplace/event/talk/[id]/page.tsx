import { apiClient } from '@/lib/api-service'
import { auth } from '@/auth'
import { urlConference } from '@/lib/endpoints'
import { Talk } from '@/types/models/talk'
import { Conference } from '@/types/models/conference'
import { TalkDetails } from './talk-details'

async function getTalkDetails(talkId: string, token: string) {
	try {
		const response = await apiClient.get(
			`${urlConference}/conferenceslisttopicsbytopicsid?TopicsID=${talkId}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)
		return response.data.topics[0]
	} catch (err) {
		return null
	}
}

async function getEvenDetails(eventId: number, token: string) {
	try {
		const response = await apiClient.get(
			`${urlConference}/conferencesdetailsspecific?conferenceID=${eventId}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)
		return response.data.conference[0]
	} catch (err) {
		return null
	}
}

async function checkIfUserIsRegistered(token: string, targetTopicId: string) {
	try {
		const response = await apiClient.get(
			`${urlConference}/conferenceslisttopicsbyuserid`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)

		console.info(response.data.topics)
		const foundTopic = response.data.topics.find(
			(topic: Talk) => topic.topicsID == targetTopicId
		)

		return {
			isRegistered: !!foundTopic,
			topic: foundTopic || null,
		}
	} catch (err) {
		return {
			isRegistered: false,
			topic: null,
		}
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	const session = await auth()

	if (!session) {
		return 'no auth'
	}

	if (!session) {
		return 'no se encontró la charla'
	}

	const isUserAlreadyRegistered = await checkIfUserIsRegistered(
		session.accessToken,
		params.id
	)
	const talk: Talk = await getTalkDetails(params.id, session.accessToken)
	const event: Conference = await getEvenDetails(
		talk.conferenceID,
		session.accessToken
	)

	return (
		<TalkDetails
			isUserAlreadyRegistered={isUserAlreadyRegistered}
			event={event}
			talk={talk}
			token={session.accessToken}
			userId={session.userId}
		/>
	)
}
