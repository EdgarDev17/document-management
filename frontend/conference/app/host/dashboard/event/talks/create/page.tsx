import { AddTalkForm } from '@/app/components/form/add-talk'
import { auth } from '@/auth'
import { apiClient } from '@/lib/api-service'
import { Conference } from '@/types/models/conference'

async function getEvent(token: string, conferenceId: string) {
	try {
		const response = await apiClient.get(
			`/Conference/conferencesdetailsspecific?conferenceID=${conferenceId}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)
		console.log('Añadir talk', response.data.conference[0])
		return response.data.conference[0]
	} catch (err) {
		console.log(err)
		throw new Error('Error no se obtuvo la conferencia')
	}
}

export default async function Page({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const session = await auth()

	if (!session) {
		return 'no auth'
	}

	const event: Conference = await getEvent(
		session.accessToken,
		searchParams.conferenceId
	)

	if (!event) {
		return 'No se encontró el evento'
	}
	console.log(searchParams)
	return (
		<div>
			<AddTalkForm
				conferenceId={searchParams.conferenceId}
				minDate={event.beggingDate.toString()}
				token={session.accessToken}
				maxDate={event.finishDate.toString()}
			/>
		</div>
	)
}
