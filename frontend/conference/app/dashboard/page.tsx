import React from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
	CardDescription,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import {
	CalendarIcon,
	DocumentIcon,
	ChevronRightIcon,
	BookOpenIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { urlConference } from '@/lib/endpoints'
import { apiClient } from '@/lib/api-service'
import { auth } from '@/auth'
import { NoAuth } from '../components/common/noauth'
import { ConferenceItem } from './events/page'
import { formatDate } from '@/lib/utils'
import {
	ArrowRightIcon,
	CalendarPlusIcon,
	CalendarX2,
	ChevronRight,
} from 'lucide-react'

interface Paper {
	documentID: number
	name: string
	review: number
	regDate: string
	userID: number
	topicsID: number
	url: string
	fileName: string
	status: string
	documentBase: string
}

// Badge component
const Badge = ({
	children,
	variant,
}: {
	children: React.ReactNode
	variant: string
}) => {
	const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold'
	const variantClasses = {
		blue: 'bg-blue-100 text-blue-800',
		green: 'bg-green-100 text-green-800',
		yellow: 'bg-yellow-100 text-yellow-800',
		red: 'bg-red-100 text-red-800',
	}
	return (
		<span className={`${baseClasses} ${variantClasses[variant]}`}>
			{children}
		</span>
	)
}

function getNextEvent(events: ConferenceItem[]): ConferenceItem | null {
	if (!events || events.length === 0) return null

	return events.reduce((closest, current) => {
		const closestDate = new Date(closest.beggingDate).getTime()
		const currentDate = new Date(current.beggingDate).getTime()

		return currentDate < closestDate ? current : closest
	})
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

async function getCurrentUserPapers(
	userId: number,
	token: string
): Promise<Paper[]> {
	try {
		const res = await apiClient.get(
			`/document/getdocumentsByUser?UserID=${userId}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)
		console.log(res.data.document[0])
		return res.data.document
	} catch (error) {
		console.error('Error fetching papers:', error)
		return []
	}
}

export default async function Page() {
	const session = await auth()

	if (!session) {
		return <NoAuth />
	}

	const papers = await getCurrentUserPapers(
		parseInt(session.userId),
		session.accessToken
	)

	const events = await getUserEvents(session.accessToken)

	const totalEvents = events ? events.length : 0
	const totalPapers = papers ? papers.length : 0
	const nextEvent = getNextEvent(events)

	const getStatusVariant = (status) => {
		switch (status) {
			case 'Aprobado':
				return 'green'
			case 'Pendiente':
				return 'yellow'
			case 'Rechazado':
				return 'red'
			default:
				return 'blue'
		}
	}

	const getDateVariant = (date) => {
		const eventDate = new Date(date)
		const today = new Date()
		const diffTime = eventDate.getTime() - today.getTime()
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		if (diffDays < 0) return 'red'
		if (diffDays <= 7) return 'yellow'
		if (diffDays <= 30) return 'blue'
		return 'green'
	}

	return (
		<div className='min-h-screen'>
			<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
				{/* Summary Cards */}
				<div className='grid gap-6 mb-8 md:grid-cols-3'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Eventos Totales
							</CardTitle>
							<CalendarIcon className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{totalEvents}</div>
							<p className='text-xs text-muted-foreground'>
								Eventos en los que participas
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Documentos Totales
							</CardTitle>
							<DocumentIcon className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{totalPapers}</div>
							<p className='text-xs text-muted-foreground'>
								Documentos enviados a revisión.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Evento mas cercano
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

				<Card className='mb-6'>
					<CardHeader>
						<CardTitle>Tus Eventos</CardTitle>
						<CardDescription>
							Estos son los eventos a los que tú estás suscrito
						</CardDescription>
					</CardHeader>
					<CardContent>
						{totalEvents == 0 ? (
							<div className='flex flex-col items-center justify-center text-center p-6'>
								<CalendarX2
									className='w-16 h-16 text-muted-foreground mb-4'
									aria-hidden='true'
								/>
								<h2 className='text-xl font-semibold mb-2'>
									No tienes eventos suscritos
								</h2>
								<p className='text-muted-foreground'>
									Actualmente no estás suscrito a ningún evento. ¡Explora y
									únete a eventos interesantes!
								</p>
							</div>
						) : (
							<ul className='space-y-2'>
								{events.slice(0, 3).map((event) => (
									<li
										key={event.conferenceID}
										className='flex justify-between items-center bg-muted rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors'>
										<Link
											href={`/dashboard/events/marketplace/event/${event.conferenceID}`}
											className='w-full flex justify-between items-center p-2'>
											<span>{event.conference_name}</span>
											<Badge variant={getDateVariant(event.beggingDate)}>
												Inicia: {formatDate(event.beggingDate)}
											</Badge>
										</Link>
									</li>
								))}
							</ul>
						)}
					</CardContent>
					<CardFooter>
						<Link href='/dashboard/events' className='w-full'>
							<Button variant='outline' className='w-full'>
								{totalEvents == 0
									? 'Explorar eventos'
									: 'Mirar todos mis eventos'}
								<ChevronRight className='ml-2 h-4 w-4' />
							</Button>
						</Link>
					</CardFooter>
				</Card>

				{/* Papers List */}
				<Card>
					<CardHeader>
						<CardTitle>Tus documentos</CardTitle>
						<CardDescription>
							Estos son todos los documentos que has enviado
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className='space-y-2'>
							{papers.slice(0, 3).map((paper) => (
								<li
									key={paper.id}
									className=' bg-muted rounded-md hover:bg-muted/80 cursor-pointer transition-colors'>
									<Link
										href={''}
										className='w-full flex justify-between items-center p-2'>
										<span>{paper.name}</span>
										<Badge variant={getStatusVariant(paper.status)}>
											{paper.status}
										</Badge>
									</Link>
								</li>
							))}
						</ul>
					</CardContent>
					<CardFooter>
						<Link href={'/dashboard/events'} className='w-full'>
							<Button variant='outline' className='w-full'>
								Mirar todos mis documentos
								<ChevronRightIcon className='ml-2 h-4 w-4' />
							</Button>
						</Link>
					</CardFooter>
				</Card>
			</main>
		</div>
	)
}
