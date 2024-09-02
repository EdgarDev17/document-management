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
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select'
import { Input } from '@/app/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useNewConferenceFormStore } from '@/lib/providers/conference-form-provider'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'

import { AddInstitution } from '@/app/components/form/add-institution'
import { apiClient } from '@/lib/api-service'
import { Institution } from '@/types/models/institution'
import { toast } from 'sonner'

const formSchema = z.object({
	institutionId: z.string().min(1, {
		message: 'Selecciona una institución',
	}),
})

export default function StepThree({
	userId,
	token,
}: {
	userId: string
	token: string
}) {
	const router = useRouter()
	const [institutions, setInstitutions] = useState<Institution[]>([])
	const [loadingInstitution, setLoadingInstitution] = useState<boolean>(false)
	const [isInstitutionSelected, setIsInstitutionSelected] = useState<string>('')

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			institutionId: '0',
		},
	})

	const { eventType, eventName, eventDescription, updateStepThree } =
		useNewConferenceFormStore((state) => {
			return state
		})

	const handleInsitutionCreateRequest = (isLoading: boolean) => {
		setLoadingInstitution(isLoading)
	}

	useEffect(() => {
		if (!eventType || !eventName || !eventDescription) {
			router.push('/host/dashboard/event/create/step-one')
			return
		}

		apiClient
			.get('/institutions/', {
				headers: {
					'Authorization-Token': token,
				},
			})
			.then((res) => {
				setInstitutions(res.data)
			})
			.catch((err) => {
				throw new Error('Error al obtener instituciones')
			})
	}, [
		eventDescription,
		eventName,
		router,
		token,
		loadingInstitution,
		eventType,
	])

	function onSubmit(values: z.infer<typeof formSchema>) {
		updateStepThree(values.institutionId)
		router.push('/host/dashboard/event/create/step-four')
	}

	return (
		<div className='w-full h-[80vh] flex justify-center items-center'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Card className='h-[600px]'>
						<CardHeader className='h-[20%]'>
							<CardTitle>Datos de la institución</CardTitle>
							<CardDescription>
								Estos datos son necesario para que puedas crear un nuevo evento
							</CardDescription>
						</CardHeader>
						<CardContent className='h-[60%] space-y-14'>
							<FormField
								control={form.control}
								name='institutionId'
								render={({ field }) => (
									<FormItem className={'flex w-full items-end justify-between'}>
										<div className={'flex flex-col gap-y-4'}>
											<FormLabel>
												Selecciona la institución anfitriona
											</FormLabel>
											<FormControl className={'py-2'}>
												<Select
													onValueChange={field.onChange}
													value={field.value.toString()}>
													<SelectTrigger className='w-[200px]'>
														<SelectValue placeholder='Selecciona una opción' />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectLabel>Tus instituciones</SelectLabel>
															{institutions.map((institution) => {
																return (
																	<SelectItem
																		key={institution.institutionID}
																		value={institution.institutionID.toString()}>
																		{institution.name}
																	</SelectItem>
																)
															})}
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</div>

										<Dialog
											open={loadingInstitution}
											onOpenChange={setLoadingInstitution}>
											<DialogTrigger asChild>
												<Button
													variant='outline'
													type='button'
													className={'text-sm'}>
													Crear Institución
												</Button>
											</DialogTrigger>
											<DialogContent className='max-w-[700px]'>
												<DialogHeader>
													<DialogTitle>Añadir nueva institución</DialogTitle>
													<DialogDescription>
														Si la institucion no aparece en la lista, puedes
														crearla aqui
													</DialogDescription>
												</DialogHeader>
												<div className=''>
													<AddInstitution
														token={token}
														userId={userId}
														isInstitutionLoading={handleInsitutionCreateRequest}
													/>
												</div>
											</DialogContent>
										</Dialog>
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className='h-[20%] flex gap-x-4'>
							<Button
								variant={'ghost'}
								onClick={() => {
									router.push('/host/dashboard/event/create/step-two')
								}}>
								Volver
							</Button>
							<Button type='submit' variant={'default'}>
								Continuar
							</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	)
}
