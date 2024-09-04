'use client'
import React, { useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/app/components/ui/table'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select'
import {
	CalendarIcon,
	UsersIcon,
	StarIcon,
	TrendingUpIcon,
	ThumbsUpIcon,
	ThumbsDownIcon,
} from 'lucide-react'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/app/components/ui/chart'
import { TopicRatingAvg } from '@/app/components/features/analytics/rating-avg'
import { Conference } from '@/types/models/conference'

type Props = {
	events: Conference[]
	token: string
}

export function AnalyticsDataContainer({ events, token }: Props) {
	const [selectedEvent, setSelectedEvent] = useState('Todos')

	const talks = [
		{
			id: 1,
			eventId: 1,
			name: 'Introducción a React',
			speaker: 'Ana García',
			participants: 200,
			rating: 4.5,
			popularity: 0.8,
		},
		{
			id: 2,
			eventId: 1,
			name: 'Node.js Avanzado',
			speaker: 'Carlos Rodríguez',
			participants: 150,
			rating: 4.2,
			popularity: 0.6,
		},
		{
			id: 3,
			eventId: 2,
			name: 'GraphQL en la práctica',
			speaker: 'Laura Martínez',
			participants: 180,
			rating: 4.7,
			popularity: 0.9,
		},
		{
			id: 4,
			eventId: 2,
			name: 'Serverless Architecture',
			speaker: 'David Sánchez',
			participants: 160,
			rating: 4.3,
			popularity: 0.7,
		},
		{
			id: 5,
			eventId: 3,
			name: 'Machine Learning 101',
			speaker: 'Elena Torres',
			participants: 210,
			rating: 4.6,
			popularity: 0.85,
		},
	]

	const filteredTalks =
		selectedEvent === 'Todos'
			? talks
			: talks.filter(
					(talk) =>
						events.find((event) => event.conferenceID === talk.eventId)
							?.conference_name === selectedEvent
				)

	const getRatingMessage = (rating: number) => {
		if (rating >= 4.5)
			return {
				message: '¡Excelente trabajo! Sigue así.',
				icon: <ThumbsUpIcon className='h-6 w-6 text-green-500' />,
			}
		if (rating >= 4.0)
			return {
				message: 'Buen desempeño. Hay espacio para mejorar.',
				icon: <ThumbsUpIcon className='h-6 w-6 text-yellow-500' />,
			}
		return {
			message: 'Necesitas mejorar la calidad de los eventos.',
			icon: <ThumbsDownIcon className='h-6 w-6 text-red-500' />,
		}
	}
	// TODO: hacer funcionar esto
	const averageRating = 4
	const ratingFeedback = getRatingMessage(averageRating)
	// @ts-ignore
	const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0)

	const totalParticipants = events.reduce(
		// @ts-ignore
		(sum, event) => sum + event.totalRegistrados,
		0
	)

	const chartData = [
		{ evento: 'EVENTO1', participantes: 186 },
		{ evento: 'EVENTO2', participantes: 305 },
		{ evento: 'EVENTO3', participantes: 237 },
		{ evento: 'EVENTO4', participantes: 73 },
		{ evento: 'EVENTO5', participantes: 209 },
		{ evento: 'EVENTO6', participantes: 214 },
	]

	const chartConfig = {
		desktop: {
			label: 'Desktop',
			color: 'hsl(var(--chart-1))',
		},
	} satisfies ChartConfig

	return (
		<div className='p-8 space-y-8'>
			<h1 className='text-3xl font-bold mb-6'>
				Dashboard de Gestión de Eventos
			</h1>
			{/* <TopicRatingAvg ratingTopics={} /> */}
			{/* KPIs */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Feedback de Rendimiento
						</CardTitle>
						{ratingFeedback.icon}
					</CardHeader>
					<CardContent>
						<div className='text-xl font-bold'>{ratingFeedback.message}</div>
						<p className='text-sm text-muted-foreground mt-2'>
							Basado en la calificación promedio de {averageRating.toFixed(1)}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Total Participantes
						</CardTitle>
						<UsersIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{totalParticipants.toLocaleString()}
						</div>
						<p className='text-xs text-muted-foreground'>
							+15.5% desde el último mes
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Calificación Promedio
						</CardTitle>
						<StarIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{averageRating.toFixed(1)}</div>
						<p className='text-xs text-muted-foreground'>
							+0.2 desde el último mes
						</p>
					</CardContent>
				</Card>
			</div>
			<div className='flex justify-between gap-x-4'>
				{/* Filtro de eventos y tabla de charlas */}
				<Card className='w-[60%] h-[500px]'>
					<CardHeader>
						<CardTitle>Análisis de Charlas</CardTitle>
						<CardDescription>Desglose de charlas por evento</CardDescription>
					</CardHeader>
					<CardContent>
						<Select onValueChange={setSelectedEvent} defaultValue='Todos'>
							<SelectTrigger className='w-[180px] mb-4'>
								<SelectValue placeholder='Seleccionar evento' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='Todos'>Todos los eventos</SelectItem>
								{events.map((event) => (
									<SelectItem
										key={event.conferenceID}
										value={`${event.conferenceID}`}>
										{event.conference_name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Charla</TableHead>
									<TableHead>Ponente</TableHead>
									<TableHead>Participantes</TableHead>
									<TableHead>Calificación</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredTalks.map((talk) => (
									<TableRow key={talk.id}>
										<TableCell>{talk.name}</TableCell>
										<TableCell>{talk.speaker}</TableCell>
										<TableCell>{talk.participants}</TableCell>
										<TableCell>
											<StarRating rating={talk.rating} />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				{/* Gráfico de tendencias de asistencia */}
				<Card className='w-[40%] h-[500px]'>
					<CardHeader>
						<CardTitle>Participantes por evento</CardTitle>
						<CardDescription>Datos en tiempo real</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig}>
							<BarChart accessibilityLayer data={chartData}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey='evento'
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent hideLabel />}
								/>
								<Bar
									dataKey='participantes'
									fill='var(--color-desktop)'
									radius={8}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
					{/* <CardFooter className='flex-col items-start gap-2 text-sm'>
						<div className='flex gap-2 font-medium leading-none'>
							Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
						</div>
						<div className='leading-none text-muted-foreground'>
							Showing total visitors for the last 6 months
						</div>
					</CardFooter> */}
				</Card>
			</div>

			{/* Próximos eventos */}
			{/* <Card>
				<CardHeader>
					<CardTitle>Próximos Eventos</CardTitle>
					<CardDescription>
						Eventos programados para los próximos meses
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						{upcomingEvents.map((event) => (
							<div key={event.id} className='flex items-center justify-between'>
								<div>
									<h3 className='font-semibold'>{event.name}</h3>
									<p className='text-sm text-muted-foreground flex items-center'>
										<CalendarIcon className='mr-1 h-4 w-4' />
										{new Date(event.date).toLocaleDateString()}
									</p>
								</div>
								<div className='text-right'>
									<Badge variant='secondary'>
										{event.expectedParticipants} esperados
									</Badge>
									<Button size='sm' className='ml-2'>
										Ver detalles
									</Button>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card> */}
		</div>
	)
}

const StarRating = ({ rating }: { rating: number }) => {
	return (
		<div className='flex items-center'>
			{[1, 2, 3, 4, 5].map((star) => (
				<StarIcon
					key={star}
					className={`h-4 w-4 ${
						star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
					}`}
				/>
			))}
			<span className='ml-2 text-sm text-gray-600'>{rating.toFixed(1)}</span>
		</div>
	)
}
