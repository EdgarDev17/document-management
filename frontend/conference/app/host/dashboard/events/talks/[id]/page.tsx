import { auth } from '@/auth'
import { DataContainer } from './data-container'
import { NoAuth } from '@/app/components/common/noauth'
import { apiClient } from '@/lib/api-service'
import { TalkClientWrapper } from './wrapper'

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
	console.log(talk)

	return <TalkClientWrapper initialData={talk} token={session.accessToken} />
}
