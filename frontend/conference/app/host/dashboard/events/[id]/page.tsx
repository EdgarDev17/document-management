import {
	CalendarIcon,
	MapPinIcon,
	UsersIcon,
	ClockIcon,
	BuildingOfficeIcon,
	PhoneIcon,
	InboxIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { GlobeAltIcon } from '@heroicons/react/20/solid'
import { ScrollArea } from '@/app/components/ui/scrollarea'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import { auth } from '@/auth'
import { apiClient } from '@/lib/api-service'
import { urlConference, urlInstitutions } from '@/lib/endpoints'
import { Conference } from '@/types/models/conference'
import { formatDate } from '@/lib/utils'
import { Institution } from '@/types/models/institution'
import { AgendaContainer } from '@/app/components/features/agendacontainer'
import { EmptyAgendaMessage } from '@/app/components/features/empty-agenda'
import { NoAccess } from '@/app/components/common/noaccess'
import { AddTalkForm } from '@/app/components/form/add-talk'
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

	const event = await getEventDetails(params.id, session.accessToken)
	const agenda = await getEventAgenda(params.id, session.accessToken)
	const institution = await getInstitution(
		event.institutionID.toString(),
		session.accessToken
	)
	const isAdmin = event.userID === parseInt(session.userId)

	console.log('evento', event)
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
