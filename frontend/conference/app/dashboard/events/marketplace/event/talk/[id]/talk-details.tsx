'use client'

import React from 'react'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/app/components/ui/tabs'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import {
	CalendarIcon,
	ClockIcon,
	MapPinIcon,
	CheckCircleIcon,
	UsersIcon,
	UserIcon,
	TicketIcon,
	Send,
	Lightbulb,
	Scale,
	Mail,
	CheckCircle,
	Star,
} from 'lucide-react'

import { DocumentIcon } from '@heroicons/react/24/outline'
import { formatDate, getHourFromDate } from '@/lib/utils'
import { Role } from '@/types/models/role'
import { RegisterUserToTalk } from '@/app/components/features/register-user-talk'
import { Talk } from '@/types/models/talk'
import { Conference } from '@/types/models/conference'
import { PaperSubmissionDialog } from '@/app/components/features/paper-submission'
import {
	Document,
	JuryModeContent,
} from '@/app/components/features/jury-paper-list'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import { apiClient } from '@/lib/api-service'
import { toast } from 'sonner'

type Props = {
	talk: Talk
	event: Conference
	token: string
	userId: string
	papers: Document[]
	hasSubmittedPaper: boolean
	isUserAlreadyRegistered: {
		isRegistered: boolean | null
		topic: any | null
	}
}

export function TalkDetails({
	talk,
	isUserAlreadyRegistered,
	event,
	hasSubmittedPaper,
	token,
	papers,
	userId,
}: Props) {
	const [juryMode, setJuryMode] = React.useState(false)
	const [isJury, setIsJury] = React.useState(false)
	const [userRole, setUserRole] = React.useState<Role | null>(null)
	const [isRegistered, setIsRegistered] = React.useState(false)
	//@ts-ignore
	const isSpeakerInfoEmpty = !talk.speakerImage && !talk.nameSpeaker
	const [rating, setRating] = React.useState(0)

	const handleRating = async (score: number) => {
		setRating(score)
	}
	React.useEffect(() => {
		setIsRegistered(isUserAlreadyRegistered.isRegistered ?? false)
		setUserRole(isUserAlreadyRegistered.topic?.rolID ?? null)
		setIsJury(isUserAlreadyRegistered.topic?.rolID === Role.Jury)
	}, [isUserAlreadyRegistered])

	const handleTabChange = (value: string) => {
		setJuryMode(value === 'jury')
	}

	const sendScore = async () => {
		console.log({
			score: {
				userID: userId,
				topicID: talk.topicsID,
				score: rating,
			},
		})
		try {
			await apiClient.post(
				'/rating/managerating',
				{
					userID: userId,
					topicID: talk.topicsID,
					score: rating,
				},
				{
					headers: {
						'Authorization-Token': token,
					},
				}
			)

			toast.success('¡Gracias por tu Feedback!')
		} catch (error) {
			toast.error('Debes estar inscrito a la charla')
			return null
		}
	}

	const getUserRoleDisplay = () => {
		if (!isRegistered) return 'No registrado'
		switch (userRole) {
			case Role.Attendee:
				return 'Participante'
			case Role.Speaker:
				return 'Ponente'
			case Role.Jury:
				return 'Jurado'
			default:
				return 'Rol no definido'
		}
	}
	return (
		<div className='container mx-auto p-4 space-y-8'>
			<div className='space-y-4'>
				<h1 className='text-4xl font-bold'>{talk.name}</h1>
				<p className='text-xl text-muted-foreground'>{talk.description}</p>
				<div className='flex flex-wrap gap-2'>
					<Badge variant='secondary' className='text-sm'>
						<CalendarIcon className='mr-1 h-3 w-3' />
						{formatDate(talk.startHour)}
					</Badge>
					<Badge variant='secondary' className='text-sm'>
						<ClockIcon className='mr-1 h-3 w-3' />
						{getHourFromDate(talk.startHour)} - {getHourFromDate(talk.startEnd)}
					</Badge>
					<Badge variant='secondary' className='text-sm'>
						<MapPinIcon className='mr-1 h-3 w-3' />
						{talk.location}
					</Badge>
				</div>
			</div>

			<div className='grid md:grid-cols-3 gap-6'>
				<Card className='md:col-span-2 bg-gradient-to-br from-primary/5 to-secondary/5'>
					<Tabs
						defaultValue='details'
						className='w-full'
						onValueChange={handleTabChange}>
						<CardHeader>
							<div className='flex justify-between items-center'>
								<CardTitle className='text-2xl'>
									Detalles de la Charla
								</CardTitle>
								<TabsList>
									<TabsTrigger value='details'>Detalles</TabsTrigger>
									{isJury && (
										<TabsTrigger value='jury'>Modo Jurado</TabsTrigger>
									)}
								</TabsList>
							</div>
						</CardHeader>
						<CardContent>
							<TabsContent value='details' className='space-y-6'>
								<div>
									<h3 className='font-semibold mb-2 text-lg'>Descripción</h3>
									<p className='text-muted-foreground'>{talk.description}</p>
								</div>
								<div>
									<h3 className='font-semibold mb-2 text-lg'>
										Estado de Registro
									</h3>
									<p className='text-muted-foreground'>
										{isRegistered ? (
											<span className='text-green-600 flex items-center'>
												<CheckCircleIcon className='mr-2 h-5 w-5' /> Registrado
												para esta charla como:{' '}
												<span className='ml-1'>{getUserRoleDisplay()}</span>
											</span>
										) : (
											'Sin registro. Aún no estás participando en la charla :('
										)}
									</p>
								</div>
								<div className='space-y-2'>
									<h3 className='font-semibold mb-2 text-lg'>Participantes</h3>
									<h4>Esta charla posee un número máximo de participantes</h4>
									<div className='flex items-center justify-between'>
										<span className='text-2xl font-bold'>5</span>
										<Badge variant='destructive' className='text-sm'>
											<UsersIcon className='mr-1 h-3 w-3' />
											100 max
										</Badge>
									</div>
									<div className='w-full bg-secondary rounded-full h-2.5'>
										<div
											className='bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out'
											style={{
												width: `${(5 / 100) * 100}%`,
											}}></div>
									</div>
								</div>
								<div>
									<h3 className='font-semibold mb-2 text-lg'>
										Calificar Charla
									</h3>
									<Dialog>
										<DialogTrigger asChild>
											<Button variant='outline'>Calificar esta charla</Button>
										</DialogTrigger>
										<DialogContent className='sm:max-w-[425px]'>
											<DialogHeader>
												<DialogTitle>Califica esta charla</DialogTitle>
												<DialogDescription>
													¿Qué te pareció esta charla? Tu opinión es importante
													para nosotros.
												</DialogDescription>
											</DialogHeader>
											<div className='flex justify-center space-x-2 py-4'>
												{[1, 2, 3, 4, 5].map((star) => (
													<Star
														key={star}
														className={`w-8 h-8 cursor-pointer ${
															star <= rating
																? 'text-yellow-400 fill-yellow-400'
																: 'text-gray-300'
														}`}
														onClick={() => handleRating(star)}
													/>
												))}
											</div>
											<p className='text-center text-sm text-gray-500'>
												{rating > 0
													? `Has calificado esta charla con ${rating} ${rating === 1 ? 'estrella' : 'estrellas'}`
													: 'Haz clic en las estrellas para calificar'}
											</p>
											<Button
												className='bg-blue-600'
												size={'full'}
												onClick={sendScore}>
												Enviar Calificación
											</Button>
										</DialogContent>
									</Dialog>
								</div>
							</TabsContent>
							{juryMode && (
								<TabsContent value='jury' className='space-y-6'>
									<JuryModeContent
										documents={papers || []}
										conferenceId={talk.conferenceID}
									/>
								</TabsContent>
							)}
						</CardContent>
					</Tabs>
				</Card>

				<div className='space-y-6'>
					<Card className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'>
						<CardHeader>
							<CardTitle className='flex items-center text-xl'>
								<UserIcon className='mr-2 h-5 w-5 text-primary' />
								Ponente
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							{isSpeakerInfoEmpty ? (
								<div className='flex flex-col items-center space-y-4'>
									<div className='flex justify-center items-center relative w-32 h-32 group'>
										<UserIcon className='h-52 w-52 text-blue-300' />
										<div className='absolute inset-0 bg-primary/10 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100'></div>
									</div>
									<p className='text-center text-sm text-muted-foreground'>
										Por favor, espera a que el jurado seleccione un ponente para
										esta charla.
									</p>
								</div>
							) : (
								<div className='flex items-center space-x-4'>
									<Avatar className='h-20 w-20 ring-2 ring-primary ring-offset-2'>
										<AvatarImage src={''} alt={talk.nameSpeaker} />
										<AvatarFallback>
											{talk.nameSpeaker
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</AvatarFallback>
									</Avatar>
									<div>
										<h3 className='text-lg font-semibold'>
											{talk.nameSpeaker}
										</h3>
										<p className='text-sm text-muted-foreground'>
											Ponente confirmado para el evento
										</p>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{!isUserAlreadyRegistered.isRegistered && (
						<Card className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'>
							<CardHeader>
								<CardTitle className='flex items-center text-xl'>
									<TicketIcon className='mr-2 h-5 w-5 text-green-600' />
									Registrarme al evento
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<p className='text-muted-foreground'>
									¡Asegura tu lugar en esta charla exclusiva!
								</p>
								<RegisterUserToTalk
									talkId={talk.topicsID}
									token={token}
									userId={parseInt(userId)}
								/>
							</CardContent>
						</Card>
					)}

					{isUserAlreadyRegistered.isRegistered &&
						isUserAlreadyRegistered.topic.rolID == Role.Speaker && (
							<Card className='flex flex-col justify-center items-center'>
								{!hasSubmittedPaper ? (
									<>
										<CardHeader>
											<CardTitle className='flex items-center'>
												<DocumentIcon className='mr-2 h-5 w-5' />
												Aplicaciones (Papers)
											</CardTitle>
											<CardDescription>
												Papers enviados para esta charla
											</CardDescription>
										</CardHeader>
										<CardContent className='flex flex-col items-center text-center'>
											<svg
												className='w-40 h-40 mb-4 text-muted-foreground'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='1'
												strokeLinecap='round'
												strokeLinejoin='round'>
												<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
												<polyline points='14 2 14 8 20 8' />
												<line x1='12' y1='18' x2='12' y2='12' />
												<line x1='9' y1='15' x2='15' y2='15' />
											</svg>
											<h4 className='font-semibold mb-2'>
												Aún no has enviado ningún paper
											</h4>
											<p className='text-sm text-muted-foreground mb-4'>
												¡Es tu momento de brillar! Envía tu primer paper y
												comparte tus ideas con la comunidad.
											</p>
											<PaperSubmissionDialog
												talkId={talk.topicsID}
												token={token}
											/>
										</CardContent>
									</>
								) : (
									<>
										<CardHeader className='pb-3'>
											<CheckCircle className='w-16 h-16 mx-auto text-primary' />
											<CardTitle className='text-2xl font-bold mt-4'>
												¡Paper Enviado!
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className='text-muted-foreground mb-4 text-center'>
												Recibirás los resultados por correo electrónico
											</p>
											<Mail className='w-6 h-6 mx-auto text-muted-foreground' />
										</CardContent>
									</>
								)}
							</Card>
						)}

					{isUserAlreadyRegistered.isRegistered &&
						isUserAlreadyRegistered.topic.rolID == Role.Attendee && (
							<Card className='w-full max-w-sm'>
								<CardHeader className='text-center pb-2'>
									<div className='mx-auto w-24 h-24'>
										<svg viewBox='0 0 100 100' className='w-full h-full'>
											<circle cx='50' cy='50' r='45' fill='#c7d2fe' />
											<circle cx='35' cy='40' r='5' fill='#4338ca' />
											<circle cx='65' cy='40' r='5' fill='#4338ca' />
											<path
												d='M 35 70 Q 50 80 65 70'
												stroke='#4338ca'
												strokeWidth='3'
												fill='none'
											/>
										</svg>
									</div>
									<CardTitle className='mt-2 text-lg'>
										¿Por qué asistir a charlas?
									</CardTitle>
								</CardHeader>
								<CardContent className='pt-0'>
									<ul className='space-y-2'>
										<li className='flex items-start'>
											<Lightbulb className='mr-2 h-5 w-5 text-yellow-500 shrink-0 mt-0.5' />
											<p className='text-sm'>
												Amplía tu red profesional y personal
											</p>
										</li>
										<li className='flex items-start'>
											<Lightbulb className='mr-2 h-5 w-5 text-yellow-500 shrink-0 mt-0.5' />
											<p className='text-sm'>
												Actualízate con las últimas tendencias e ideas
											</p>
										</li>
										<li className='flex items-start'>
											<Lightbulb className='mr-2 h-5 w-5 text-yellow-500 shrink-0 mt-0.5' />
											<p className='text-sm'>
												Inspírate con nuevas perspectivas y enfoques
											</p>
										</li>
										<li className='flex items-start'>
											<Lightbulb className='mr-2 h-5 w-5 text-yellow-500 shrink-0 mt-0.5' />
											<p className='text-sm'>
												Desarrolla habilidades de comunicación y pensamiento
												crítico
											</p>
										</li>
									</ul>
								</CardContent>
							</Card>
						)}
					{isUserAlreadyRegistered.isRegistered &&
						juryMode == false &&
						isUserAlreadyRegistered.topic.rolID == Role.Jury && (
							<Card className='w-full max-w-sm'>
								<CardHeader className='text-center pb-2'>
									<div className='mx-auto w-24 h-24'>
										<svg viewBox='0 0 100 100' className='w-full h-full'>
											<circle cx='50' cy='50' r='45' fill='#c7d2fe' />
											<circle cx='35' cy='40' r='5' fill='#4338ca' />
											<circle cx='65' cy='40' r='5' fill='#4338ca' />
											<path
												d='M 35 70 Q 50 80 65 70'
												stroke='#4338ca'
												strokeWidth='3'
												fill='none'
											/>
										</svg>
									</div>
									<CardTitle className='mt-2 text-lg'>
										¿Por qué asistir a charlas?
									</CardTitle>
								</CardHeader>
								<CardContent className='pt-0'>
									<ul className='space-y-2'>
										<li className='flex items-start'>
											<Lightbulb className='mr-2 h-5 w-5 text-yellow-500 shrink-0 mt-0.5' />
											<p className='text-sm'>
												Amplía tu red profesional y personal
											</p>
										</li>
										<li className='flex items-start'>
											<Lightbulb className='mr-2 h-5 w-5 text-yellow-500 shrink-0 mt-0.5' />
											<p className='text-sm'>
												Actualízate con las últimas tendencias e ideas
											</p>
										</li>
										<li className='flex items-start'>
											<Lightbulb className='mr-2 h-5 w-5 text-yellow-500 shrink-0 mt-0.5' />
											<p className='text-sm'>
												Inspírate con nuevas perspectivas y enfoques
											</p>
										</li>
										<li className='flex items-start'>
											<Lightbulb className='mr-2 h-5 w-5 text-yellow-500 shrink-0 mt-0.5' />
											<p className='text-sm'>
												Desarrolla habilidades de comunicación y pensamiento
												crítico
											</p>
										</li>
									</ul>
								</CardContent>
							</Card>
						)}
					{isUserAlreadyRegistered.isRegistered &&
						juryMode == true &&
						isUserAlreadyRegistered.topic.rolID == Role.Jury && (
							<Card className='w-full max-w-md'>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-2xl font-bold'>
										Modo Jurado
									</CardTitle>
									<Scale className='h-8 w-8 text-primary' />
								</CardHeader>
								<CardContent>
									<p className='text-sm text-muted-foreground'>
										Estás utilizando el modo Jurado. En este modo, tienes acceso
										a funcionalidades específicas para la evaluación y toma de
										decisiones sobre los documentos.
									</p>
								</CardContent>
							</Card>
						)}
				</div>
			</div>
		</div>
	)
}
