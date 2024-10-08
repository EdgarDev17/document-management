'use client'

import { DocumentTextIcon } from '@heroicons/react/24/outline'
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
import { Badge } from '@/app/components/ui/badge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useNewConferenceFormStore } from '@/lib/providers/conference-form-provider'

const formSchema = z.object({
	paperAttempts: z.number().gte(1),
})

export default function StepFour({
	userId,
	token,
}: {
	userId: string
	token: string
}) {
	const router = useRouter()
	const [paperAttempt, setPaperAttempt] = useState(1)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			paperAttempts: 1,
		},
	})

	const { eventType, eventName, eventDescription, updateStepFour } =
		useNewConferenceFormStore((state) => state)

	function onSubmit(e: React.MouseEvent) {
		e.preventDefault()
		updateStepFour(paperAttempt)
		router.push('/host/dashboard/event/create/summary')
	}

	const handleGoBack = (e: React.MouseEvent) => {
		e.preventDefault()
		router.push('/host/dashboard/event/create/step-three')
	}

	return (
		<div className='w-full min-h-screen p-4 flex justify-center items-center'>
			<Form {...form}>
				<form className='w-full max-w-md'>
					<Card className='w-full shadow-lg'>
						<CardHeader className='space-y-1'>
							<div className='flex items-center space-x-2'>
								<DocumentTextIcon className='w-6 h-6 text-primary' />
								<CardTitle className='text-xl sm:text-2xl font-bold'>
									Configuración de Papers
								</CardTitle>
							</div>
							<CardDescription>
								Define si tu evento aceptará ponentes y papers
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<Badge variant='secondary' className='mb-2'>
								Paso 4 de 5
							</Badge>
							<FormField
								control={form.control}
								name='paperAttempts'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-base sm:text-lg font-medium'>
											¿Aceptará la conferencia ponentes y papers?
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={(value) => {
													setPaperAttempt(parseInt(value))
												}}>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Selecciona una opción' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Ponentes y papers</SelectLabel>
														<SelectItem value='0'>NO</SelectItem>
														<SelectItem value='1'>SI</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className='flex flex-col sm:flex-row justify-between gap-4'>
							<Button
								variant={'ghost'}
								onClick={handleGoBack}
								className='w-full sm:w-auto'>
								Volver
							</Button>
							<Button onClick={onSubmit} className='w-full sm:w-auto'>
								Continuar
							</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	)
}
