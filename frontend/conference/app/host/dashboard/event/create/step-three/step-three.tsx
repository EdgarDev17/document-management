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

const formSchema = z.object({
	institutionId: z.number().int().min(1, {
		message:
			'Selecciona una institución válida (número entero mayor o igual a 1)',
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

	const {
		eventType,
		eventName,
		eventDescription,
		institutionId,
		updateStepThree,
	} = useNewConferenceFormStore((state) => state)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			institutionId: institutionId,
		},
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
		<div className='w-full min-h-screen flex justify-center items-center p-4'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full max-w-md'>
					<Card className='w-full'>
						<CardHeader>
							<CardTitle className='text-2xl'>
								Datos de la institución
							</CardTitle>
							<CardDescription>
								Estos datos son necesarios para que puedas crear un nuevo evento
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-6'>
							<FormField
								control={form.control}
								name='institutionId'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Selecciona la institución anfitriona</FormLabel>
										<FormControl>
											<Select
												onValueChange={(value) => field.onChange(Number(value))}
												value={field.value?.toString()}>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Selecciona una opción' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Tus instituciones</SelectLabel>
														{institutions.map((institution) => (
															<SelectItem
																key={institution.institutionID}
																value={institution.institutionID.toString()}>
																{institution.name}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Dialog
								open={loadingInstitution}
								onOpenChange={setLoadingInstitution}>
								<DialogTrigger asChild>
									<Button
										variant='outline'
										type='button'
										className='w-full mt-4'>
										Crear Institución
									</Button>
								</DialogTrigger>
								<DialogContent className='max-w-[90vw] sm:max-w-[700px]'>
									<DialogHeader>
										<DialogTitle>Añadir nueva institución</DialogTitle>
										<DialogDescription>
											Si la institución no aparece en la lista, puedes crearla
											aquí
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
						</CardContent>
						<CardFooter className='flex flex-col sm:flex-row gap-4'>
							<Button
								variant='ghost'
								onClick={() => {
									router.push('/host/dashboard/event/create/step-two')
								}}
								className='w-full sm:w-auto'>
								Volver
							</Button>
							<Button
								type='submit'
								variant='default'
								className='w-full sm:w-auto'>
								Continuar
							</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	)
}
