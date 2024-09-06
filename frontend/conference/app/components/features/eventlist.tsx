'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
	CardDescription,
} from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { ConferenceItem } from '@/app/dashboard/events/page'
import { formatDate } from '@/lib/utils'
import { Calendar, CalendarX2, MapPin } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select'
import Link from 'next/link'

function EventsList({
	events,
	currentPage,
	totalPages,
}: {
	events: ConferenceItem[]
	currentPage: number
	totalPages: number
}) {
	const router = useRouter()
	const [sortBy, setSortBy] = useState('date')

	const handlePageChange = (newPage: number) => {
		router.push(`/dashboard/events?page=${newPage}`)
	}

	const sortedEvents = useMemo(() => {
		return [...events].sort((a, b) => {
			if (sortBy === 'date') {
				return (
					new Date(a.beggingDate).getTime() - new Date(b.beggingDate).getTime()
				)
			} else if (sortBy === 'farthest') {
				return (
					new Date(b.beggingDate).getTime() - new Date(a.beggingDate).getTime()
				)
			}
			return 0
		})
	}, [events, sortBy])

	return (
		<Card className='min-h-[400px]'>
			<CardHeader>
				<div className='flex justify-between items-center'>
					<CardTitle>Tus eventos</CardTitle>
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Ordenar por' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='date'>Fecha más cercana</SelectItem>
							<SelectItem value='farthest'>Fecha más lejana</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<CardDescription>
					Lista de eventos en los que participas
				</CardDescription>
			</CardHeader>
			<CardContent>
				{sortedEvents.length === 0 ? (
					<div className='flex flex-col items-center justify-center text-center p-6'>
						<CalendarX2
							className='w-16 h-16 text-muted-foreground mb-4'
							aria-hidden='true'
						/>
						<h2 className='text-xl font-semibold mb-2'>
							No tienes eventos suscritos
						</h2>
						<p className='text-muted-foreground'>
							Actualmente no estás suscrito a ningún evento. ¡Explora y únete a
							eventos interesantes!
						</p>
					</div>
				) : (
					<ul className='space-y-2'>
						{sortedEvents.map((event: ConferenceItem) => (
							<li
								key={event.conferenceID}
								className='p-3 bg-muted rounded-md hover:bg-muted/80 cursor-pointer transition-colors'>
								<Link
									href={`/dashboard/events/marketplace/event/${event.conferenceID}`}>
									<div className='flex justify-between items-center'>
										<h3 className='text-sm font-medium'>
											{event.conference_name}
										</h3>
										<div className='space-x-1'>
											<Badge variant={'green'}>
												{formatDate(event.beggingDate)}
											</Badge>
											<span className='text-sm text-zinc-700'>hasta</span>
											<Badge variant={'red'}>
												{formatDate(event.finishDate)}
											</Badge>
										</div>
									</div>
									<div className='mt-1 flex items-center text-xs text-muted-foreground space-x-2'>
										<span className='flex items-center'>
											<Calendar className='w-3 h-3 mr-1' />
											{formatDate(event.beggingDate)} -{' '}
											{formatDate(event.finishDate)}
										</span>
										<span className='flex items-center'>
											<MapPin className='w-3 h-3 mr-1' />
											{event.conference_type}
										</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				)}
			</CardContent>
			{sortedEvents.length > 0 && (
				<CardFooter className='flex justify-between'>
					<Button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						variant={'outline'}
						size='sm'>
						Anterior
					</Button>
					<span className='text-sm'>
						Página {currentPage} de {totalPages}
					</span>
					<Button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						variant={'outline'}
						size='sm'>
						Siguiente
					</Button>
				</CardFooter>
			)}
		</Card>
	)
}

export { EventsList }
