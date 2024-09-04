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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select'
import { Input } from '@/app/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useNewConferenceFormStore } from '@/lib/providers/conference-form-provider'
import { Drawer } from 'vaul'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/app/components/ui/alert-dialog'
import { useWindowSize } from '@uidotdev/usehooks'
import { Textarea } from '@/app/components/ui/textarea'

const formSchema = z.object({
	eventName: z.string().min(1, {
		message: 'Ingrese un nombre válido para el evento',
	}),
	eventDescription: z.string().min(100, {
		message: 'La descripción debe tener un minimo de 100 caracteres',
	}),
	eventType: z.string().min(1, {
		message: 'Ingrese una opción válida.',
	}),
})

export default function StepOne() {
	const windowSize = useWindowSize()
	const router = useRouter()
	const { updateStepOne, eventType, eventName, eventDescription } =
		useNewConferenceFormStore((state) => state)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			eventType: eventType,
			eventName: eventName,
			eventDescription: eventDescription,
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		updateStepOne(values.eventName, values.eventDescription, values.eventType)
		router.push('/host/dashboard/event/create/step-two')
	}

	return (
		<div className='w-full min-h-screen px-4 py-6 flex justify-center items-center'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full max-w-md'>
					<Card className='w-full'>
						<CardHeader className='space-y-2'>
							<CardTitle className='text-2xl'>
								Datos generales del evento
							</CardTitle>
							<CardDescription>
								Estos datos son necesarios para que puedas crear un nuevo evento
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-6'>
							<FormField
								control={form.control}
								name='eventName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Titulo del evento</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='eventDescription'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descripción del evento</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												className='h-32 resize-none'
												maxLength={240}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='eventType'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Modalidad del evento</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Selecciona la modalidad' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='virtual'>Virtual</SelectItem>
												<SelectItem value='presencial'>Presencial</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className='flex flex-col sm:flex-row gap-4'>
							{windowSize.width && windowSize.width > 640 ? (
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant={'outline'} className='w-full sm:w-auto'>
											Cancelar
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												¿Estas completamente seguro?
											</AlertDialogTitle>
											<AlertDialogDescription>
												Si cancelas la creación del evento, los datos se
												perderán y deberás crearlo desde cero.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancelar</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => router.push('/host/dashboard/events')}>
												Continuar
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							) : (
								<Drawer.Root shouldScaleBackground>
									<Drawer.Trigger asChild>
										<Button variant={'outline'} className='w-full'>
											Cancelar
										</Button>
									</Drawer.Trigger>
									<Drawer.Portal>
										<Drawer.Overlay className='fixed inset-0 bg-black/40' />
										<Drawer.Content className='bg-zinc-100 flex flex-col rounded-t-[10px] h-[80%] mt-24 fixed bottom-0 left-0 right-0'>
											<div className='p-4 bg-white rounded-t-[10px] flex-1'>
												<div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8' />
												<div className='max-w-md h-[90%] mx-auto flex flex-col justify-between'>
													<div>
														<Drawer.Title className='font-medium mb-4 text-lg'>
															¿Estas completamente seguro?
														</Drawer.Title>
														<p className='text-zinc-600 mb-2'>
															Si cancelas la creación del evento, los datos se
															perderán y deberás crearlo desde cero.
														</p>
													</div>
													<div className='flex flex-col w-full gap-y-4'>
														<Button
															onClick={() => router.push('/host/dashboard/')}>
															Continuar
														</Button>
														<Drawer.Close asChild>
															<Button variant={'outline'}>Cancelar</Button>
														</Drawer.Close>
													</div>
												</div>
											</div>
										</Drawer.Content>
									</Drawer.Portal>
								</Drawer.Root>
							)}
							<Button variant={'default'} className='w-full sm:w-auto'>
								Continuar
							</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	)
}
