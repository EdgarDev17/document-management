'use client'

import React from 'react'
import { H2 } from '@/app/components/ui/headings'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/app/components/ui/form'
import Link from 'next/link'
import { apiClient } from '@/lib/api-service'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/app/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/app/components/ui/calendar'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectGroup,
	SelectLabel,
	SelectValue,
} from '@/app/components/ui/select'
import { toast } from 'sonner'
import { WaveLoading } from '@/app/components/common/wave-loading'
import { useRouter } from 'next/navigation'

// definimos el schema que debe seguir el formulario
const formSchema = z.object({
	name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
	lastname: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
	email: z.string().email('Email inválido'),
	birthdate: z.date(),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export default function Register() {
	const [selectedYear, setSelectedYear] = React.useState(
		new Date().getFullYear()
	)
	const [isLoading, setIsLoading] = React.useState(false)
	const router = useRouter()

	const years = Array.from(
		{ length: 124 },
		(_, i) => new Date().getFullYear() - i
	)
	// creamos el formulario y asignamos valores predeterminados
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			lastname: '',
			email: '',
			password: '',
		},
	})

	const URL_VALIDATE_EMAIL =
		'https://tesis-uso.vercel.app/account/verify-email/?userID'

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		const formattedData = {
			...values,
			birthdate: values.birthdate.toISOString(),
			urlValidateEmail: URL_VALIDATE_EMAIL,
		}
		try {
			const response = await apiClient.post(
				'/registerusers/registeruser',
				formattedData
			)

			toast.success('Registro Completado con éxito')
			router.push('/account/email-alert')
		} catch (error) {
			console.error('Error al registrar:', error)
			toast.error('Error al crear usuario, intente más tarde')
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className='w-full flex justify-center items-center'>
			<div className="hidden w-1/2 h-[800px] relative  bg-[url('/login.jpg')] bg-cover bg-no-repeat bg-center md:flex flex-col justify-end gap-y-4 px-5">
				<div className='py-14 flex flex-col gap-y-4'>
					<H2 className='text-5xl text-white'>Bienvenido de nuevo 👋</H2>
					<p className='text-gray-300'>
						Encuentra la inspiración y construye el futuro de los eventos
						académicos, donde el conocimiento toma forma.
					</p>
				</div>
			</div>

			{isLoading ? (
				<div className='w-full h-full md:w-1/2 md:h-[800px] flex flex-col justify-center items-center gap-y-8'>
					<WaveLoading />
				</div>
			) : (
				<div className='w-full h-full md:w-1/2 md:h-[800px] flex flex-col justify-center items-center gap-y-8'>
					<H2 className='text-4xl'>Crear cuenta</H2>
					<p>
						¿Ya tienes una cuenta?
						<span className='pl-1 text-blue-600'>
							<Link href={'/account/login'}>Inicia sesión aqui</Link>
						</span>
					</p>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='w-2/3 space-y-8'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<FormControl>
											<Input type='text' {...field} />
										</FormControl>
										<FormMessage className='text-red-400' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='lastname'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Apellido</FormLabel>
										<FormControl>
											<Input type='text' {...field} />
										</FormControl>
										<FormMessage className='text-red-400' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={'birthdate'}
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Fecha de nacimiento</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant='outline'
														className={cn(
															'w-full pl-3 text-left font-normal',
															!field.value && 'text-muted-foreground'
														)}>
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span>Selecciona tu fecha de nacimiento</span>
														)}
														<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-auto p-0' align='start'>
												<div className='flex justify-center p-2'>
													<Select
														value={selectedYear.toString()}
														onValueChange={(value) =>
															setSelectedYear(parseInt(value))
														}>
														<SelectTrigger className='w-full'>
															<SelectValue placeholder='Selecciona un año' />
														</SelectTrigger>
														<SelectContent>
															{years.map((year) => (
																<SelectItem key={year} value={year.toString()}>
																	{year}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
												<Calendar
													mode='single'
													selected={field.value}
													onSelect={(date) => {
														if (date) {
															const newDate = new Date(
																date.setFullYear(selectedYear)
															)
															field.onChange(newDate)
														}
													}}
													disabled={(date) => date < new Date('1900-01-01')}
													// @ts-ignore
													initialFocus
													year={selectedYear}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type='email' {...field} />
										</FormControl>
										<FormMessage className='text-red-400' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contraseña</FormLabel>
										<FormControl>
											<Input type='password' {...field} />
										</FormControl>
										<FormMessage className='text-red-400' />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full'>
								Registrarse
							</Button>
						</form>
					</Form>
				</div>
			)}
		</div>
	)
}
