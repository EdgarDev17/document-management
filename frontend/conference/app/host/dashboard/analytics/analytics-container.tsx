'use client'
import { useState, useEffect } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select'
import { Input } from '@/app/components/ui/input'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
	Line,
} from 'recharts'
import {
	CalendarIcon,
	MapPinIcon,
	UsersIcon,
	ClockIcon,
	UserIcon,
} from 'lucide-react'
import { ScrollArea } from '@/app/components/ui/scrollarea'

// Tipos de datos
type Conferencia = {
	conferenceID: number
	conference_name: string
	conference_type: string
	description: string
	beggingDate: string
	finishDate: string
	totalCupos: number
	totalRegistrados: number
}

type Tema = {
	topicsID: number
	name: string
	description: string
	location: string
	startHour: string
	startEnd: string
	conferenceID: number
	totalAttendees: number
	totalSpeakers: number
	nameSpeaker: string
}

type CalificacionTema = {
	topicsID: number
	conferenceID: number
	promedio_score: number
}

type DataPoint = {
	nombre: string
	calificacion: number
}

// Componente principal
export default function PaginaAnalisis({
	conferencias,
	temas,
	calificaciones,
}: {
	conferencias: Conferencia[]
	temas: Tema[]
	calificaciones: CalificacionTema[]
}) {
	const [conferenciaSeleccionada, setConferenciaSeleccionada] =
		useState<number>(conferencias[0]?.conferenceID)
	const [busqueda, setBusqueda] = useState('')

	const conferenciasFiltradas = conferencias.filter((conf) =>
		conf.conference_name.toLowerCase().includes(busqueda.toLowerCase())
	)

	useEffect(() => {
		if (
			conferenciasFiltradas.length > 0 &&
			!conferenciasFiltradas.some(
				(conf) => conf.conferenceID === conferenciaSeleccionada
			)
		) {
			setConferenciaSeleccionada(conferenciasFiltradas[0].conferenceID)
		}
	}, [busqueda, conferenciasFiltradas, conferenciaSeleccionada])

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6 text-gray-800'>
				Panel de Análisis de Conferencias
			</h1>

			<div className='flex space-x-4 mb-6'>
				{/* <Input
					type='text'
					placeholder='Buscar conferencia...'
					value={busqueda}
					onChange={(e) => setBusqueda(e.target.value)}
					className='max-w-sm'
				/> */}
				<Select
					value={conferenciaSeleccionada.toString()}
					onValueChange={(value) => setConferenciaSeleccionada(Number(value))}>
					<SelectTrigger className='w-[280px]'>
						<SelectValue placeholder='Selecciona una conferencia' />
					</SelectTrigger>
					<SelectContent>
						{conferenciasFiltradas.map((conf) => (
							<SelectItem
								key={conf.conferenceID}
								value={conf.conferenceID.toString()}>
								{conf.conference_name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{conferenciaSeleccionada && (
				<DetallesConferencia
					conferencia={
						conferencias.find(
							(c) => c.conferenceID === conferenciaSeleccionada
						)!
					}
					temas={temas.filter(
						(t) => t.conferenceID === conferenciaSeleccionada
					)}
					calificaciones={calificaciones.filter(
						(r) => r.conferenceID === conferenciaSeleccionada
					)}
				/>
			)}
		</div>
	)
}

// Componente DetallesConferencia
function DetallesConferencia({
	conferencia,
	temas,
	calificaciones,
}: {
	conferencia: Conferencia
	temas: Tema[]
	calificaciones: CalificacionTema[]
}) {
	const datosAsistencia = temas.map((tema) => ({
		nombre: tema.name,
		calificacion:
			calificaciones.find((c) => c.topicsID === tema.topicsID)
				?.promedio_score || 0,
	}))

	console.log(datosAsistencia)

	return (
		<div className='space-y-6'>
			<div className='grid gap-4 md:grid-cols-3'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Total de Registros
						</CardTitle>
						<UsersIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{conferencia.totalRegistrados} / {conferencia.totalCupos}
						</div>
						<p className='text-xs text-muted-foreground'>
							{(
								(conferencia.totalRegistrados / conferencia.totalCupos) *
								100
							).toFixed(1)}
							% de capacidad
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Tipo de Conferencia
						</CardTitle>
						<MapPinIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold capitalize'>
							{conferencia.conference_type}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Rango de Fechas
						</CardTitle>
						<CalendarIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-sm font-medium'>
							{new Date(conferencia.beggingDate).toLocaleDateString()} -{' '}
							{new Date(conferencia.finishDate).toLocaleDateString()}
						</div>
					</CardContent>
				</Card>
			</div>
			<div className='grid gap-6 md:grid-cols-2'>
				<Card className='md:col-span-2 bg-white shadow-lg'>
					<CardHeader>
						<CardTitle className='text-xl font-bold text-gray-800'>
							Información del Evento
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid gap-4 md:grid-cols-2'>
							<div>
								<h3 className='text-lg font-semibold text-gray-700 mb-2'>
									{conferencia.conference_name}
								</h3>
								<p className='text-gray-600 mb-4'>{conferencia.description}</p>
								<div className='space-y-2'>
									<div className='flex items-center space-x-2'>
										<MapPinIcon className='h-5 w-5 text-blue-500' />
										<span className='text-gray-700'>
											{conferencia.conference_type}
										</span>
									</div>
									<div className='flex items-center space-x-2'>
										<CalendarIcon className='h-5 w-5 text-green-500' />
										<span className='text-gray-700'>
											{new Date(conferencia.beggingDate).toLocaleDateString()} -{' '}
											{new Date(conferencia.finishDate).toLocaleDateString()}
										</span>
									</div>
									<div className='flex items-center space-x-2'>
										<ClockIcon className='h-5 w-5 text-yellow-500' />
										<span className='text-gray-700'>
											{new Date(conferencia.beggingDate).toLocaleTimeString()} -{' '}
											{new Date(conferencia.finishDate).toLocaleTimeString()}
										</span>
									</div>
								</div>
							</div>
							<div>
								<h3 className='text-lg font-semibold text-gray-700 mb-2'>
									Estadísticas
								</h3>
								<div className='space-y-4'>
									<div>
										<div className='flex justify-between mb-1'>
											<span className='text-sm font-medium text-gray-700'>
												Asistencia
											</span>
											<span className='text-sm font-medium text-gray-700'>
												{conferencia.totalRegistrados}/{conferencia.totalCupos}
											</span>
										</div>
										<div className='w-full bg-gray-200 rounded-full h-2.5'>
											<div
												className='bg-blue-600 h-2.5 rounded-full'
												style={{
													width: `${(conferencia.totalRegistrados / conferencia.totalCupos) * 100}%`,
												}}></div>
										</div>
									</div>
									<div className='flex items-center space-x-2'>
										<UserIcon className='h-5 w-5 text-purple-500' />
										<span className='text-gray-700'>
											{temas.reduce((acc, tema) => acc + tema.totalSpeakers, 0)}{' '}
											Ponentes
										</span>
									</div>
									<div className='flex items-center space-x-2'>
										<UsersIcon className='h-5 w-5 text-indigo-500' />
										<span className='text-gray-700'>{temas.length} Temas</span>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='md:col-span-2 bg-white shadow-lg'>
					<CardHeader>
						<CardTitle className='text-xl font-bold text-gray-800'>
							Asistencia y Calificaciones por Tema
						</CardTitle>
						<CardDescription className='text-gray-600'>
							Resumen de asistencia y calificaciones para cada tema
						</CardDescription>
					</CardHeader>
					<CardContent className='h-[400px]'>
						<ConferenceChart data={datosAsistencia} />
					</CardContent>
				</Card>
			</div>
			<div className='space-y-4'>
				<h2 className='text-2xl font-bold text-center mb-6'>
					Listado de charlas
				</h2>
				<ScrollArea className='h-[600px] w-full rounded-md border p-4'>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{temas.map((tema) => (
							<Card
								key={tema.topicsID}
								className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300'>
								<CardHeader>
									<CardTitle className='text-lg font-semibold text-gray-800'>
										{tema.name}
									</CardTitle>
									<CardDescription className='text-gray-600'>
										{tema.description}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-2'>
										<div className='flex items-center space-x-2'>
											<UserIcon className='h-4 w-4 text-blue-500' />
											<p className='text-sm text-gray-700'>
												<span className='font-semibold'>Ponente:</span>{' '}
												{tema.nameSpeaker}
											</p>
										</div>
										<div className='flex items-center space-x-2'>
											<MapPinIcon className='h-4 w-4 text-green-500' />
											<p className='text-sm text-gray-700'>
												<span className='font-semibold'>Ubicación:</span>{' '}
												{tema.location}
											</p>
										</div>
										<div className='flex items-center space-x-2'>
											<CalendarIcon className='h-4 w-4 text-purple-500' />
											<p className='text-sm text-gray-700'>
												<span className='font-semibold'>Horario:</span>{' '}
												{new Date(tema.startHour).toLocaleString()} -{' '}
												{new Date(tema.startEnd).toLocaleString()}
											</p>
										</div>
										<div className='flex items-center space-x-2'>
											<UsersIcon className='h-4 w-4 text-orange-500' />
											<p className='text-sm text-gray-700'>
												<span className='font-semibold'>Asistentes:</span>{' '}
												{tema.totalAttendees} / {conferencia.totalCupos}
											</p>
										</div>
										<div className='flex items-center space-x-2'>
											<svg
												className='h-4 w-4 text-yellow-500'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												aria-hidden='true'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
												/>
											</svg>
											<p className='text-sm text-gray-700'>
												<span className='font-semibold'>
													Calificación Promedio:
												</span>{' '}
												{calificaciones
													.find((c) => c.topicsID === tema.topicsID)
													?.promedio_score.toFixed(1) || 'N/A'}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</ScrollArea>
			</div>{' '}
		</div>
	)
}

function ConferenceChart({ data }: { data: DataPoint[] }) {
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>Calificaciones Promedio por Tema</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width='100%' height={300}>
					<LineChart
						data={data}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='nombre' angle={-45} textAnchor='end' height={70} />
						<YAxis domain={[0, 5]} />{' '}
						{/* Asumiendo que las calificaciones van de 0 a 5 */}
						<Tooltip />
						<Line
							type='monotone'
							dataKey='calificacion'
							stroke='#8884d8'
							dot={{ r: 5 }}
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
