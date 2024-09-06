'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select'
import { Card, CardContent } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import {
	CalendarIcon,
	MagnifyingGlassIcon,
	GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { apiClient } from '@/lib/api-service'
import { Conference } from '@/types/models/conference'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { WaveLoading } from '../common/wave-loading'
import { Tickets } from 'lucide-react'

const bgColors = [
	'bg-red-100',
	'bg-yellow-100',
	'bg-green-100',
	'bg-blue-100',
	'bg-indigo-100',
	'bg-purple-100',
	'bg-pink-100',
	'bg-orange-100',
	'bg-teal-100',
	'bg-cyan-100',
	'bg-lime-100',
	'bg-emerald-100',
	'bg-sky-100',
	'bg-violet-100',
	'bg-fuchsia-100',
]

const getRandomColor = () =>
	bgColors[Math.floor(Math.random() * bgColors.length)]

function EventSearch({ token }: { token: string }) {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedArea, setSelectedArea] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [events, setEvents] = useState<Conference[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		apiClient
			.get(`conference/ConferencesDetailsGeneral`, {
				headers: {
					'Authorization-Token': token,
				},
			})
			.then(function (response) {
				setEvents(response.data.conference)
			})
			.catch(function (error) {
				throw new Error(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [token])

	if (loading) {
		return (
			<div className='text-center py-8 flex justify-center items-center h-[80vh]'>
				<WaveLoading />
			</div>
		)
	}

	const filteredEvents = events.filter(
		(event) =>
			event.conference_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(selectedArea === '' || event.conference_name === selectedArea)
	)

	const eventsPerPage = 4
	const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
	const displayedEvents = filteredEvents.slice(
		(currentPage - 1) * eventsPerPage,
		currentPage * eventsPerPage
	)

	return (
		<div className='container mx-auto p-4 space-y-6'>
			<h1 className='text-2xl font-bold mb-4'>
				Buscador de Eventos Académicos
			</h1>

			<div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
				<div className='flex-1'>
					<Input
						type='search'
						placeholder='Buscar eventos...'
						value={searchTerm}
						onChange={(e: any) => setSearchTerm(e.target.value)}
						className='w-full bg-white'
					/>
				</div>
				{/* <Select value={selectedArea} onValueChange={setSelectedArea}>
					<SelectTrigger className='w-full sm:w-[180px]'>
						<SelectValue placeholder='Filtrar por área' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Tecnología'>Tecnología</SelectItem>
						<SelectItem value='Ciencias'>Ciencias</SelectItem>
						<SelectItem value='Humanidades'>Humanidades</SelectItem>
						<SelectItem value='Economía'>Economía</SelectItem>
						<SelectItem value='Educación'>Educación</SelectItem>
					</SelectContent>
				</Select> */}
			</div>

			<div className='flex flex-col gap-y-4'>
				{displayedEvents.map((evento) => {
					const randomColor = getRandomColor()
					return (
						<Link
							key={evento.conferenceID}
							className='w-full h-fit'
							href={`/dashboard/events/marketplace/event/${evento.conferenceID}`}>
							<Card className='overflow-hidden'>
								<CardContent className='p-4 flex flex-col sm:flex-row'>
									<div
										className={`mb-4 sm:mb-0 sm:mr-4 flex flex-row sm:flex-col items-center justify-center ${randomColor} rounded-md p-2 min-w-[80px]`}>
										<Tickets className='w-6 h-6 text-zinc-800' />
									</div>
									<div className='flex-1'>
										<h3 className='font-semibold'>{evento.conference_name}</h3>
										<p className='text-sm mt-1 line-clamp-2'>
											{evento.description}
										</p>
										<div className='flex flex-wrap items-center mt-2 space-x-2'>
											<Badge variant='secondary' className='mb-2'>
												<GlobeAltIcon className='inline-block mr-1 h-3 w-3' />
												{evento.conference_type}
											</Badge>
											<Badge variant='outline' className='mb-2'>
												{'Area'}
											</Badge>
											<Badge variant='outline' className='mb-2'>
												Anfitrión: {evento.institution_name}
											</Badge>
										</div>
									</div>
									<div className='flex flex-col justify-between items-start sm:items-end mt-4 sm:mt-0 sm:ml-4'>
										<Badge variant='secondary' className='mb-2'>
											{`${formatDate(evento.beggingDate)} - ${formatDate(evento.finishDate)}`}
										</Badge>
										<Button size='sm' className='w-full sm:w-auto'>
											Ver conferencia
										</Button>
									</div>
								</CardContent>
							</Card>
						</Link>
					)
				})}
			</div>

			{totalPages > 1 && (
				<div className='flex justify-center space-x-2 mt-4'>
					<Button
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						size='sm'>
						Anterior
					</Button>
					<span className='self-center text-sm'>
						Página {currentPage} de {totalPages}
					</span>
					<Button
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
						disabled={currentPage === totalPages}
						size='sm'>
						Siguiente
					</Button>
				</div>
			)}
		</div>
	)
}

export { EventSearch }
