'use client'

import Link from 'next/link'

import { H2 } from '@/app/components/ui/headings'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/app/components/ui/form'
import { authenticate } from '@/actions/auth'
import { useSearchParams } from 'next/navigation'

// definimos el schema que debe seguir el formulario
const formSchema = z.object({
	email: z.string().min(2, {
		message: 'Ingrese un email valido',
	}),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, 'Password is required')
		.min(8, 'Password must be more than 8 characters')
		.max(32, 'Password must be less than 32 characters'),
})

export default function Login() {
	// obtemos las queries de la url
	const searchParams = useSearchParams()
	const search = searchParams.get('rol')

	// creamos el formulario y asignamos valores predeterminados
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const formData = new FormData()
		formData.append('email', values.email)
		formData.append('password', values.password)

		authenticate(formData)
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
			<div className='w-full h-screen  md:w-1/2 md:h-[800px] flex flex-col justify-center items-center gap-y-8'>
				<H2 className='text-4xl'>Iniciar sesión</H2>
				<p>
					¿Nuevo por aqui?
					<span className='pl-1 text-blue-600'>
						<Link href={'/account/register'}>Crea un cuenta aqui</Link>
					</span>
				</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='w-2/3 space-y-6'>
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
						<Button type='submit' size={'full'}>
							Iniciar sesión
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
