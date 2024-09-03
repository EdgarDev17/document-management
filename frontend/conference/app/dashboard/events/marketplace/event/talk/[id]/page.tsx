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
		console.error(err)
		return null
	}
}

async function hasUserSubmittedPaper(
	userId: number,
	talkId: number,
	token: string
) {
	const userPapers = await getCurrentUserPapers(userId, token)

	if (!userPapers) return false

	return userPapers.some((paper: any) => paper.topicsID === talkId)
}

async function checkIfUserIsRegistered(token: string, targetTalkId: number) {
	try {
		const res = await apiClient.get(
			'/conference/conferenceslisttopicsbyuserid',
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)

		const foundTopic = res.data.topics.find(
			(topic: Talk) => parseInt(topic.topicsID) === targetTalkId
		)

		return {
			isRegistered: !!foundTopic,
			topic: foundTopic || null,
		}
	} catch (error) {
		return null
	}
}

async function getEventPapers(talkId: number, token: string) {
	try {
		const res = await apiClient.get(
			`/document/getdocumentsbyconference?TopicsID=${talkId}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)

		return res.data.document
	} catch (error) {
		return null
	}
}

async function getCurrentUserPapers(userId: number, token: string) {
	try {
		const res = await apiClient.get(
			`/document/getdocumentsByUser?UserID=${userId}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)

		return res.data.document
	} catch (error) {
		return null
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
		parseInt(params.id)
	)

	const talk: Talk = await getTalkDetails(params.id, session.accessToken)
	const event: Conference = await getEvenDetails(
		talk.conferenceID,
		session.accessToken
	)

	const papers = await getEventPapers(parseInt(params.id), session.accessToken)
	const userPapers = await getCurrentUserPapers(
		parseInt(session.userId),
		session.accessToken
	)
	// Verificar si el usuario ha enviado un paper a esta charla específica
	const hasSubmittedPaper = await hasUserSubmittedPaper(
		parseInt(session.userId),
		parseInt(params.id),
		session.accessToken
	)

	console.log('talk DEL USER LOGUEADO :D', talk)

	return (
		<TalkDetails
			// @ts-ignore
			isUserAlreadyRegistered={isUserAlreadyRegistered}
			event={event}
			talk={talk}
			token={session.accessToken}
			userId={session.userId}
			papers={papers}
			hasSubmittedPaper={hasSubmittedPaper}
		/>
	)
}
