'use client'

import { Button } from '@/app/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'

import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from '@/app/components/ui/form'

import { Input } from '@/app/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/app/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/app/components/ui/calendar'
import { CalendarIcon } from '@radix-ui/react-icons'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNewConferenceFormStore } from '@/lib/providers/conference-form-provider'

const formSchema = z
	.object({
		startingDate: z
			.date({
				required_error: 'Selecciona una fecha válida',
			})
			.refine(
				(date) => {
					const today = new Date()
					today.setHours(0, 0, 0, 0)
					return date >= today
				},
				{
					message: 'La fecha de inicio debe ser igual o posterior a hoy',
				}
			),
		finishingDate: z.date({
			required_error: 'Selecciona una fecha valida',
		}),
		eventAddress: z.string(),
		eventUrl: z.string(),
	})
	.refine((data) => data.finishingDate >= data.startingDate, {
		message:
			'La fecha de finalización debe ser igual o posterior a la fecha de inicio',
		path: ['finishingDate'],
	})

export default function StepTwo() {
	const [loading, setLoading] = useState<boolean>(true)
	const router = useRouter()
	const {
		eventType,
		eventName,
		eventDescription,
		updateStepTwo,
		eventAddress,
		eventUrl,
	} = useNewConferenceFormStore((state) => state)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			eventAddress: eventAddress,
			eventUrl: eventUrl,
		},
	})

	useEffect(() => {
		if (!eventType || !eventName || !eventDescription) {
			router.push('/host/dashboard/event/create/step-one')
			return
		}
		setLoading(false)
	}, [eventType, eventDescription, eventName, router])

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		updateStepTwo(
			values.startingDate,
			values.finishingDate,
			values.eventUrl,
			values.eventAddress
		)
		router.push('/host/dashboard/event/create/step-three')
	}

	if (loading) {
		;<div className='w-full h-[80vh] flex justify-center items-center'>
			<p>cargando datos...</p>
		</div>
	}

	return (
		<div className='w-full h-[80vh] flex justify-center items-center'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Card className='h-[600px]'>
						<CardHeader className='h-[20%]'>
							<CardTitle>Datos generales del evento</CardTitle>
							<CardDescription>
								Estos datos son necesario para que puedas crear un nuevo evento
							</CardDescription>
						</CardHeader>
						<CardContent className='h-[60%] space-y-8'>
							<FormField
								control={form.control}
								name='startingDate'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Fecha de inicio</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'w-[240px] pl-3 text-left font-normal',
															!field.value && 'text-muted-foreground'
														)}>
														{field.value ? (
															format(field.value, 'dd/MM/yyyy')
														) : (
															<span>Seleccione una fecha</span>
														)}
														<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-auto p-0' align='start'>
												<Calendar
													mode='single'
													selected={field.value}
													onSelect={field.onChange}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='finishingDate'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Fecha de finalización</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'w-[240px] pl-3 text-left font-normal',
															!field.value && 'text-muted-foreground'
														)}>
														{field.value ? (
															format(field.value, 'dd/MM/yyyy')
														) : (
															<span>Seleccione una fecha</span>
														)}
														<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-auto p-0' align='start'>
												<Calendar
													mode='single'
													selected={field.value}
													onSelect={field.onChange}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='eventAddress'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>
											{eventType === 'presencial'
												? 'Ingrese la ubicación del evento'
												: 'Ingrese la URL hacia el evento'}
										</FormLabel>
										<FormControl>
											<div>
												{eventType === 'presencial' && (
													<Input
														{...field}
														placeholder='5av sur, San Salvador, Hotel Ejemplo'
													/>
												)}

												{eventType === 'virtual' && (
													<Input
														{...field}
														placeholder='link de Zoom, Google Meet, Teams, etc'
													/>
												)}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className='h-[20%] flex gap-x-4'>
							<Button
								variant={'ghost'}
								type='button'
								onClick={() =>
									router.push('/host/dashboard/event/create/step-one')
								}>
								Volver
							</Button>
							<Button variant={'default'}>Continuar</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	)
}
