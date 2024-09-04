import React, { useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/app/components/ui/table'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import {
	Calendar,
	Clock,
	MapPin,
	Users,
	User,
	BarChart,
	CalendarIcon,
} from 'lucide-react'

// Definición de tipos
type RatingTopic = {
	topicsID: number
	conferenceID: number
	promedio_score: number
}

type Topic = {
	topicsID: number
	name: string
	description: string
	location: string
	startHour: string
	finishHour: string
	conferenceID: number
	totalAttendees: number
	totalSpeakers: number
	nameSpeaker: string
}

type Conference = {
	conferenceID: number
	conference_name: string
	conference_type: string
	description: string
	conference_RegDate: string
	beggingDate: string
	finishDate: string
	status: number
	institution_name: string
	totalCupos: number | null
	totalRegistrados: number | null
}

type Props = {
	ratingTopics: RatingTopic[]
	topics: Topic[]
	conferences: Conference[]
}

export function EventAnalyticsDashboard({
	ratingTopics,
	topics,
	conferences,
}: Props) {
	const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

	const currentConference = conferences[0] // Asumimos que solo hay una conferencia por ahora

	if (!currentConference) {
		return (
			<div className='text-center p-4'>
				No hay datos de conferencia disponibles.
			</div>
		)
	}

	const getStatusBadge = (status: number) => {
		switch (status) {
			case 1:
				return <Badge>Activa</Badge>
			case 0:
				return <Badge variant='destructive'>Inactiva</Badge>
			default:
				return <Badge variant='secondary'>Desconocido</Badge>
		}
	}

	return (
		<div className='container mx-auto p-4 space-y-6'>
			<h1 className='text-3xl font-bold mb-6'>
				Dashboard de Analíticas de Eventos
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				<Card>
					<CardHeader>
						<CardTitle>Información General</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className='text-xl font-semibold mb-2'>
							{currentConference.conference_name}
						</h2>
						<div className='flex items-center space-x-2 mb-2'>
							{getStatusBadge(currentConference.status)}
							<Badge variant='outline'>
								{currentConference.conference_type}
							</Badge>
						</div>
						<p className='text-sm text-muted-foreground mb-2'>
							{currentConference.description}
						</p>
						<div className='flex items-center space-x-2 text-sm'>
							<CalendarIcon className='w-4 h-4' />
							<span>
								{new Date(currentConference.beggingDate).toLocaleDateString()} -{' '}
								{new Date(currentConference.finishDate).toLocaleDateString()}
							</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Estadísticas de Asistencia</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex justify-between items-center'>
							<div>
								<p className='text-2xl font-bold'>
									{currentConference.totalRegistrados ?? 'N/A'}
								</p>
								<p className='text-sm text-muted-foreground'>Registrados</p>
							</div>
							<div>
								<p className='text-2xl font-bold'>
									{currentConference.totalCupos ?? 'N/A'}
								</p>
								<p className='text-sm text-muted-foreground'>Cupos Totales</p>
							</div>
						</div>
						{currentConference.totalCupos &&
							currentConference.totalRegistrados && (
								<div className='mt-4'>
									<p className='text-sm font-medium'>Ocupación</p>
									<div className='w-full bg-secondary rounded-full h-2.5 mt-2'>
										<div
											className='bg-primary h-2.5 rounded-full'
											style={{
												width: `${(currentConference.totalRegistrados / currentConference.totalCupos) * 100}%`,
											}}></div>
									</div>
								</div>
							)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Calificaciones Promedio</CardTitle>
					</CardHeader>
					<CardContent>
						{ratingTopics.length > 0 ? (
							<div className='space-y-2'>
								{ratingTopics.map((rating) => {
									const topic = topics.find(
										(t) => t.topicsID === rating.topicsID
									)
									return (
										<div
											key={rating.topicsID}
											className='flex items-center justify-between'>
											<span className='text-sm truncate'>
												{topic?.name ?? `Tema ${rating.topicsID}`}
											</span>
											<div className='flex items-center'>
												<span className='text-sm font-medium mr-2'>
													{rating.promedio_score.toFixed(1)}
												</span>
												<div className='w-20 bg-secondary rounded-full h-2'>
													<div
														className='bg-primary h-2 rounded-full'
														style={{
															width: `${(rating.promedio_score / 5) * 100}%`,
														}}></div>
												</div>
											</div>
										</div>
									)
								})}
							</div>
						) : (
							<p className='text-sm text-muted-foreground'>
								No hay calificaciones disponibles.
							</p>
						)}
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Charlas del Evento</CardTitle>
					<CardDescription>
						Lista de todas las charlas programadas
					</CardDescription>
				</CardHeader>
				<CardContent>
					{topics.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nombre</TableHead>
									<TableHead>Ponente</TableHead>
									<TableHead>Horario</TableHead>
									<TableHead>Asistentes</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{topics.map((topic) => (
									<TableRow key={topic.topicsID}>
										<TableCell className='font-medium'>{topic.name}</TableCell>
										<TableCell>{topic.nameSpeaker}</TableCell>
										<TableCell>
											{new Date(topic.startHour).toLocaleTimeString()} -{' '}
											{new Date(topic.finishHour).toLocaleTimeString()}
										</TableCell>
										<TableCell>{topic.totalAttendees}</TableCell>
										<TableCell>
											<Dialog>
												<DialogTrigger asChild>
													<Button
														variant='outline'
														size='sm'
														onClick={() => setSelectedTopic(topic)}>
														Ver Detalles
													</Button>
												</DialogTrigger>
												<DialogContent className='sm:max-w-[425px]'>
													<DialogHeader>
														<DialogTitle>{selectedTopic?.name}</DialogTitle>
														<DialogDescription>
															{selectedTopic?.description}
														</DialogDescription>
													</DialogHeader>
													<div className='grid gap-4 py-4'>
														<div className='flex items-center gap-4'>
															<Clock className='h-4 w-4' />
															<span>
																{new Date(
																	selectedTopic?.startHour ?? ''
																).toLocaleString()}{' '}
																-{' '}
																{new Date(
																	selectedTopic?.finishHour ?? ''
																).toLocaleTimeString()}
															</span>
														</div>
														<div className='flex items-center gap-4'>
															<MapPin className='h-4 w-4' />
															<span>{selectedTopic?.location}</span>
														</div>
														<div className='flex items-center gap-4'>
															<Users className='h-4 w-4' />
															<span>
																{selectedTopic?.totalAttendees} asistentes
															</span>
														</div>
														<div className='flex items-center gap-4'>
															<User className='h-4 w-4' />
															<span>{selectedTopic?.nameSpeaker}</span>
														</div>
													</div>
												</DialogContent>
											</Dialog>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<p className='text-center py-4'>
							No hay charlas programadas para este evento.
						</p>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
