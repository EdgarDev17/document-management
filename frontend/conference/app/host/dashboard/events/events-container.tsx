'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
	CardDescription,
} from '@/app/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltipContent,
} from '@/app/components/ui/charts'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { DataTable } from './data-table'
import { columns, Conference } from './columns'
import { apiClient } from '@/lib/api-service'
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

const chartConfig = {
	event: {
		label: 'Participantes',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig

export function EventsContainer({ token }: { token: string }) {
	const [events, setEvents] = useState<Conference[]>([])
	const [loading, setLoading] = useState(true)
	const [totalParticipants, setTotalParticipants] = useState(0)
	const [nearestEvent, setNearestEvent] = useState<Conference | null>(null)
	const [chartData, setChartData] = useState<{ name: string; event: number }[]>(
		[]
	)

	useEffect(() => {
		apiClient
			.get('/Conference/ConferencesDetailsByUser', {
				headers: {
					'Authorization-Token': token,
				},
			})
			.then((response) => {
				const filteredEvents = response.data.conference.filter(
					(event: Conference) => event.rolID === 1
				)
				setEvents(filteredEvents)

				console.log(response.data.conference)
				// total participantes
				const total = filteredEvents.reduce(
					// @ts-ignore
					(sum, event) => sum + (event.totalRegistrados || 0),
					0
				)
				setTotalParticipants(total)

				// evento mas proximo
				const now = new Date()
				const upcomingEvents = filteredEvents.filter(
					(event: Conference) => new Date(event.beggingDate) > now
				)
				const nearest = upcomingEvents.reduce(
					(nearest: any, event: Conference) =>
						!nearest ||
						new Date(event.beggingDate) < new Date(nearest.beggingDate)
							? event
							: nearest,
					null as Conference | null
				)
				setNearestEvent(nearest)

				// Prepare chart data
				const chartData = filteredEvents.slice(0, 10).map((event: any) => ({
					name:
						event.conference_name.slice(0, 20) +
						(event.conference_name.length > 20 ? '...' : ''),
					event: event.totalRegistrados || 0,
				}))
				setChartData(chartData)
			})
			.catch((error) => {
				console.error('Error fetching conference data:', error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [token])

	return (
		<div className='w-full h-full flex flex-col gap-y-14 relative py-14'>
			<Link
				href='/host/dashboard/event/create/step-one'
				className='bg-blue-800 text-blue-50 border absolute right-0 top-0 border-blue-50 p-4 rounded-lg w-[250px] h-[50px] text-center flex justify-center items-center'>
				Crear Conferencia
			</Link>
			<section className='w-full h-[60%] flex gap-x-6'>
				<div className='w-[50%] grid grid-cols-2 gap-1 place-items-center'>
					<Card className='w-[250px] flex flex-col justify-between'>
						<CardHeader className='w-full bg-blue-800 rounded-t-lg'>
							<CardTitle className='text-primary-foreground'>
								Eventos creados
							</CardTitle>
						</CardHeader>
						<CardContent className='w-full h-full flex justify-center items-center py-4'>
							{loading ? (
								<p>cargando...</p>
							) : (
								<p className='text-5xl font-bold text-zinc-800'>
									{events.length}
								</p>
							)}
						</CardContent>
					</Card>

					<Card className='w-[250px] flex flex-col justify-between'>
						<CardHeader className='w-full bg-blue-800 rounded-t-lg'>
							<CardTitle className='text-primary-foreground'>
								Participantes
							</CardTitle>
						</CardHeader>
						<CardContent className='w-full h-full flex justify-center items-center py-4'>
							<p className='text-5xl font-bold text-zinc-800'>
								{totalParticipants}
							</p>
						</CardContent>
					</Card>

					<Card className='w-11/12 col-span-2 flex flex-col justify-between'>
						<CardHeader className='w-full bg-blue-800 rounded-t-lg'>
							<CardTitle className='text-primary-foreground'>
								Próximo Evento
							</CardTitle>
						</CardHeader>
						<CardContent className='w-full h-full flex flex-col justify-center items-center py-4'>
							{nearestEvent ? (
								<>
									<p className='text-xl font-bold text-zinc-800'>
										{nearestEvent.conference_name}
									</p>
									<p className='text-sm text-zinc-600'>
										{new Date(nearestEvent.beggingDate).toLocaleDateString()}
									</p>
								</>
							) : (
								<p className='text-xl text-zinc-600'>No hay eventos próximos</p>
							)}
						</CardContent>
					</Card>
				</div>
				<div className='w-[50%]'>
					<Card className='h-fit'>
						<CardHeader>
							<CardTitle>Registros</CardTitle>
							<CardDescription>Participantes por evento</CardDescription>
						</CardHeader>
						<CardContent className='h-[250px]'>
							{events.length > 0 ? (
								<ChartContainer config={chartConfig} className='h-[290px] '>
									<BarChart data={chartData}>
										<CartesianGrid vertical={false} />
										<XAxis
											dataKey='name'
											tickLine={false}
											tick={false}
											tickMargin={10}
											axisLine={false}
											angle={-45}
											textAnchor='end'
											height={80}
										/>
										<YAxis axisLine={false} tickLine={false} tickMargin={10} />
										<Tooltip
											content={<ChartTooltipContent indicator='dashed' />}
										/>
										<Bar dataKey='event' fill='var(--color-event)' radius={4} />
									</BarChart>
								</ChartContainer>
							) : (
								<div className='flex justify-center items-center h-full'>
									<p className='text-lg text-zinc-600'>
										Ingrese más información para ver las gráficas
									</p>
								</div>
							)}
						</CardContent>
						<CardFooter>
							<div className='flex w-full items-start gap-2 text-sm'>
								<div className='grid gap-2'>
									<div className='flex items-center gap-2 font-medium leading-none'>
										Participantes registrados
										<ArrowTrendingUpIcon className='h-4 w-4' />
									</div>
									<div className='flex items-center gap-2 leading-none text-muted-foreground'>
										Datos en tiempo real
									</div>
								</div>
							</div>
						</CardFooter>
					</Card>
				</div>
			</section>
			<section className=''>
				{loading ? (
					<p>Cargando...</p>
				) : (
					<DataTable columns={columns} data={events} />
				)}
			</section>
		</div>
	)
}
