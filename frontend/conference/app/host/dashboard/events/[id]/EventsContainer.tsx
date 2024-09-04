'use client'
import {
	CalendarIcon,
	MapPinIcon,
	UsersIcon,
	ClockIcon,
	BuildingOfficeIcon,
	PhoneIcon,
	InboxIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { GlobeAltIcon } from '@heroicons/react/20/solid'
import { ScrollArea } from '@/app/components/ui/scrollarea'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import { auth } from '@/auth'
import { apiClient } from '@/lib/api-service'
import { urlConference, urlInstitutions } from '@/lib/endpoints'
import { Conference } from '@/types/models/conference'
import { formatDate } from '@/lib/utils'
import { Institution } from '@/types/models/institution'
import { AgendaContainer } from '@/app/components/features/agendacontainer'
import { EmptyAgendaMessage } from '@/app/components/features/empty-agenda'
import { NoAccess } from '@/app/components/common/noaccess'
import { AddTalkForm } from '@/app/components/form/add-talk'

export function EventContainer({
	event,
	agenda,
	institution,
	isAdmin,
	token,
}: {
	event: Conference
	agenda: any[]
	institution: Institution
	isAdmin: boolean
	token: string
}) {
	return (
		<div className=' p-4 space-y-8 h-[70vh]'>
			<div className='flex justify-between items-start'>
				<div>
					<h1 className='text-3xl font-bold mb-2'>{event.conference_name}</h1>
					<p className='text-xl text-muted-foreground mb-4'>
						{event.description}
					</p>
					<div className='flex space-x-4'>
						<Badge variant='yellow' className='text-sm'>
							<CalendarIcon className='mr-1 h-4 w-4' />
							{formatDate(event.beggingDate)} - {formatDate(event.finishDate)}
						</Badge>
						<Badge variant='blue' className='text-sm'>
							<MapPinIcon className='mr-1 h-4 w-4' />
							{event.type}
						</Badge>
						{/*TODO: TRAER EL AREA DE LA BD */}
						<Badge variant='outline' className='text-sm'>
							Area aqui
						</Badge>
					</div>
				</div>

				{!isAdmin && (
					<Dialog>
						<DialogTrigger asChild>
							<Button size='lg' className='bg-blue-600'>
								Registrarme al evento
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Bienvenido, Un paso más</DialogTitle>
								<DialogDescription>
									Selecciona como quieres registrarte al evento
								</DialogDescription>
							</DialogHeader>

							<div className='py-3 flex gap-x-6'>
								<Button className='bg-blue-600'>Como invitado</Button>
								<Button variant={'outline'}>Como ponente</Button>
							</div>
						</DialogContent>
					</Dialog>
				)}
			</div>

			<div className='grid md:grid-cols-3 gap-6'>
				<Card className='md:col-span-2 w-full h-[600px] flex flex-col overflow-hidden px-4'>
					<CardHeader className='flex  flex-row justify-between items-center'>
						<div>
							<CardTitle>Agenda</CardTitle>
							<CardDescription>Programa detallado del evento</CardDescription>
						</div>
						<Dialog>
							<DialogTrigger>
								<Button className='bg-blue-600'>Crear Charla</Button>
							</DialogTrigger>
							<DialogContent className='w-fit max-w-[1000px]'>
								<AddTalkForm
									minDate={String(event.beggingDate)}
									maxDate={String(event.finishDate)}
									conferenceId={event.conferenceID.toString()}
									token={token}
								/>
							</DialogContent>
						</Dialog>
					</CardHeader>
					<ScrollArea className='flex-grow'>
						<CardContent className='w-full h-full'>
							{agenda.length === 0 ? (
								<EmptyAgendaMessage />
							) : (
								<AgendaContainer agenda={agenda} rol='host' />
							)}
						</CardContent>
					</ScrollArea>
				</Card>

				<div className='space-y-6'>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center'>
								<BuildingOfficeIcon className='mr-2 h-5 w-5' />
								Institución Anfitriona
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='flex items-center space-x-4'>
								<Avatar className='h-20 w-20'>
									<AvatarImage
										src={`data:image/JPG;base64,${institution.image}`}
										alt={institution.name}
									/>
									<AvatarFallback>
										{institution.name
											.split(' ')
											.map((n) => n[0])
											.join('')}
									</AvatarFallback>
								</Avatar>
								<div>
									<h3 className='text-lg font-semibold'>{institution.name}</h3>
									<p className='text-sm text-muted-foreground'>
										{institution.description}
									</p>
								</div>
							</div>
							<div className='space-y-2'>
								<div className='flex items-center text-sm'>
									<PhoneIcon className='mr-2 h-4 w-4 text-muted-foreground' />
									<span>{institution.contact_phone}</span>
								</div>
								<div className='flex items-center text-sm'>
									<GlobeAltIcon className='mr-2 h-4 w-4 text-muted-foreground' />
									<a
										href={`${institution.website}`}
										target='_blank'
										rel='noopener noreferrer'
										className='text-blue-600 hover:underline'>
										{institution.website}
									</a>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='flex items-center'>
								<CalendarIcon className='mr-2 h-5 w-5' />
								Detalles del Evento
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<h4 className='font-semibold text-sm text-muted-foreground'>
									Fecha y Hora
								</h4>
								<div className='flex items-center space-x-2'>
									<Badge variant='outline' className='text-sm'>
										<CalendarIcon className='mr-1 h-3 w-3' />
										{formatDate(event.beggingDate)}
									</Badge>
									<span>hasta</span>
									<Badge variant='outline' className='text-sm'>
										<CalendarIcon className='mr-1 h-3 w-3' />
										{formatDate(event.finishDate)}
									</Badge>
								</div>
							</div>
							<div className='space-y-2'>
								<h4 className='font-semibold text-sm text-muted-foreground'>
									Ubicación
								</h4>
								<div className='flex items-center'>
									<MapPinIcon className='mr-2 h-4 w-4 text-muted-foreground' />
									<span>Ubicacion aqui</span>
								</div>
							</div>
							<div className='space-y-2'>
								<h4 className='font-semibold text-sm text-muted-foreground'>
									Participantes
								</h4>
								{/*TODO: HACER QUE LA CONFERENCIA ACEPTA MAXIMOS DE PARTICIAPANTES */}
								<div className='flex items-center justify-between'>
									<span className='text-2xl font-bold'>
										{event.totalRegistrados}
									</span>
									<Badge variant='outline' className='text-sm'>
										<UsersIcon className='mr-1 h-3 w-3' />
										{event.totalCupos} Max
									</Badge>
								</div>
								<div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
									<div
										className='bg-blue-600 h-2.5 rounded-full'
										style={{
											// @ts-ignore
											width: `${(event.totalRegistrados / event.totalCupos) * event.totalCupos}%`,
										}}></div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
