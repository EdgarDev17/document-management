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
import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
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
				console.log(response.data.conference)
				const filteredEvents = response.data.conference.filter(
					(event: Conference) => event.rolID === 1
				)
				setEvents(filteredEvents)

				const total = filteredEvents.reduce(
					(sum: any, event: any) => sum + (event.totalRegistrados || 0),
					0
				)
				setTotalParticipants(total)

				const now = new Date()
				const upcomingEvents = filteredEvents.filter(
					(event: Conference) => new Date(event.beggingDate) > now
				)
				const nearest = upcomingEvents.reduce(
					(nearest: any, event: any) =>
						!nearest ||
						new Date(event.beggingDate) < new Date(nearest.beggingDate)
							? event
							: nearest,
					null as Conference | null
				)
				setNearestEvent(nearest)

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
		<div className='w-full h-full flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-14 relative py-4 sm:py-8 lg:py-14 px-4 sm:px-6 lg:px-8'>
			<Link
				href='/host/dashboard/event/create/step-one'
				className='bg-blue-800 text-blue-50 border absolute right-4 sm:right-6 lg:right-8 top-0 border-blue-50 p-2 sm:p-3 lg:p-4 rounded-lg w-full sm:w-auto md:max-w-[250px] h-[40px] sm:h-[45px] lg:h-[50px] text-center flex justify-center items-center text-xs sm:text-sm lg:text-base'>
				Crear Conferencia
			</Link>
			<section className='w-full flex flex-col lg:flex-row gap-4 sm:gap-6 mt-12 sm:mt-16 lg:mt-0'>
				<div className='w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center'>
					<Card className='w-full max-w-[250px] flex flex-col justify-between'>
						<CardHeader className='w-full bg-blue-800 rounded-t-lg'>
							<CardTitle className='text-primary-foreground text-sm sm:text-base'>
								Eventos creados
							</CardTitle>
						</CardHeader>
						<CardContent className='w-full h-full flex justify-center items-center py-4'>
							{loading ? (
								<p>cargando...</p>
							) : (
								<p className='text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-800'>
									{events.length}
								</p>
							)}
						</CardContent>
					</Card>

					<Card className='w-full max-w-[250px] flex flex-col justify-between'>
						<CardHeader className='w-full bg-blue-800 rounded-t-lg'>
							<CardTitle className='text-primary-foreground text-sm sm:text-base'>
								Participantes
							</CardTitle>
						</CardHeader>
						<CardContent className='w-full h-full flex justify-center items-center py-4'>
							<p className='text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-800'>
								{totalParticipants}
							</p>
						</CardContent>
					</Card>

					<Card className='w-full col-span-1 sm:col-span-2 flex flex-col justify-between'>
						<CardHeader className='w-full bg-blue-800 rounded-t-lg'>
							<CardTitle className='text-primary-foreground text-sm sm:text-base'>
								Próximo Evento
							</CardTitle>
						</CardHeader>
						<CardContent className='w-full h-full flex flex-col justify-center items-center py-4'>
							{nearestEvent ? (
								<>
									<p className='text-base sm:text-lg lg:text-xl font-bold text-zinc-800 text-center'>
										{nearestEvent.conference_name}
									</p>
									<p className='text-xs sm:text-sm text-zinc-600'>
										{new Date(nearestEvent.beggingDate).toLocaleDateString()}
									</p>
								</>
							) : (
								<p className='text-base sm:text-lg lg:text-xl text-zinc-600'>
									No hay eventos próximos
								</p>
							)}
						</CardContent>
					</Card>
				</div>
				<div className='w-full lg:w-1/2'>
					<Card className='h-fit'>
						<CardHeader>
							<CardTitle className='text-sm sm:text-base'>Registros</CardTitle>
							<CardDescription className='text-xs sm:text-sm'>
								Participantes por evento
							</CardDescription>
						</CardHeader>
						<CardContent className='h-[200px] sm:h-[250px] lg:h-[290px]'>
							{events.length > 0 ? (
								<ChartContainer config={chartConfig} className='h-full'>
									<ResponsiveContainer width='100%' height='100%'>
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
											<YAxis
												axisLine={false}
												tickLine={false}
												tickMargin={10}
											/>
											<Tooltip
												content={<ChartTooltipContent indicator='dashed' />}
											/>
											<Bar
												dataKey='event'
												fill='var(--color-event)'
												radius={4}
											/>
										</BarChart>
									</ResponsiveContainer>
								</ChartContainer>
							) : (
								<div className='flex justify-center items-center h-full'>
									<p className='text-sm sm:text-base lg:text-lg text-zinc-600 text-center'>
										Ingrese más información para ver las gráficas
									</p>
								</div>
							)}
						</CardContent>
						<CardFooter>
							<div className='flex w-full items-start gap-2 text-xs sm:text-sm'>
								<div className='grid gap-2'>
									<div className='flex items-center gap-2 font-medium leading-none'>
										Participantes registrados
										<ArrowTrendingUpIcon className='h-3 w-3 sm:h-4 sm:w-4' />
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
			<section className='mt-4 sm:mt-6 lg:mt-0'>
				{loading ? (
					<p>Cargando...</p>
				) : (
					<DataTable columns={columns} data={events} />
				)}
			</section>
		</div>
	)
}
