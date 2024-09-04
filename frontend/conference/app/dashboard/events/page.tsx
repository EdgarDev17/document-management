import { NoAuth } from '@/app/components/common/noauth'
import { EventsList } from '@/app/components/features/eventlist'
import { Button } from '@/app/components/ui/button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { auth } from '@/auth'
import { apiClient } from '@/lib/api-service'
import { urlConference } from '@/lib/endpoints'
import { formatDate } from '@/lib/utils'
import { CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon, CalendarPlusIcon } from 'lucide-react'
import Link from 'next/link'

export interface ConferenceItem {
	conferenceID: number
	conference_name: string
	conference_type: string
	description: string
	conference_RegDate: string
	beggingDate: string
	finishDate: string
	documentAttempt: number
	institutionID: number
	status: number
	location: string | null
	urlconference: string | null
	institution_name: string
	institution_website: string
	institution_contact_phone: string
	rolID: number
	totalCupos: number
	totalRegistrados: number
}

async function getUserEvents(token: string) {
	try {
		const response = await apiClient.get(
			`${urlConference}/ConferencesDetailsByUser`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)

		return response.data.conference
	} catch (err) {
		return null
	}
}

function getNextEvent(events: ConferenceItem[]): ConferenceItem | null {
	if (!events || events.length === 0) return null

	return events.reduce((closest, current) => {
		const closestDate = new Date(closest.beggingDate).getTime()
		const currentDate = new Date(current.beggingDate).getTime()

		return currentDate < closestDate ? current : closest
	})
}

export default async function Page() {
	const session = await auth()

	if (!session) {
		return (
			<div className='w-full h-[90vh] flex justify-center items-center'>
				<NoAuth />
			</div>
		)
	}

	const allEvents: ConferenceItem[] = await getUserEvents(session.accessToken)
	const nextEvent = getNextEvent(allEvents)

	const page = 1
	const pageSize = 3
	const totalPages = allEvents ? Math.ceil(allEvents.length / pageSize) : 1

	// Simulating server-side pagination
	const paginatedEvents = allEvents
		? allEvents.slice((page - 1) * pageSize, page * pageSize)
		: []

	return (
		<div className='min-h-screen w-full'>
			<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
				<div className='grid gap-6 mb-8 md:grid-cols-3'>
					<Card className='md:col-span-1'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Eventos Totales
							</CardTitle>
							<CalendarIcon className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent className='h-[80%]'>
							{!allEvents || allEvents.length === 0 ? (
								<div className='flex h-full w-full  flex-col items-center justify-center space-y-2'>
									<p className='text-center text-6xl font-bold'>0</p>
								</div>
							) : (
								<>
									<div className='text-2xl font-bold'>{allEvents.length}</div>
									<p className='text-xs text-muted-foreground'>
										Eventos suscritos
									</p>
								</>
							)}
						</CardContent>
					</Card>
					<Card className='md:col-span-2'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Evento Más Próximo
							</CardTitle>
							<BookOpenIcon className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							{nextEvent ? (
								<div className='space-y-2'>
									<div className='text-2xl font-bold'>
										{nextEvent.conference_name}
									</div>
									<p className='text-xs text-muted-foreground'>
										{formatDate(nextEvent.beggingDate)}
									</p>
									<Button variant='outline' size='sm' asChild>
										<Link
											href={`/dashboard/events/marketplace/event/${nextEvent.conferenceID}`}>
											Ir al evento
											<ArrowRightIcon className='ml-2 h-4 w-4' />
										</Link>
									</Button>
								</div>
							) : (
								<div className='flex flex-col items-center justify-center space-y-2 py-6'>
									<CalendarPlusIcon className='h-12 w-12 text-muted-foreground' />
									<p className='text-center text-sm text-muted-foreground'>
										No te has inscrito a ningún evento aún.
									</p>
									<Button variant='outline' size='sm' asChild>
										<Link href='/events'>
											Explorar eventos
											<ArrowRightIcon className='ml-2 h-4 w-4' />
										</Link>
									</Button>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
				<div className='py-8'>
					<Link
						className='bg-blue-600 hover:bg-blue-800 text-blue-50 px-4 py-3 rounded-lg'
						href='/dashboard/events/marketplace/'>
						Buscar un evento
					</Link>
				</div>

				<EventsList
					events={paginatedEvents}
					currentPage={page}
					totalPages={totalPages}
				/>
			</main>
		</div>
	)
}
