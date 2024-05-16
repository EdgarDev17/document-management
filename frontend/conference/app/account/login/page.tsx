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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/app/components/ui/form'

// definimos el schema que debe seguir el formulario
const FormSchema = z.object({
	username: z.string().min(2, {
		message: 'Ingrese un email valido',
	}),
	password: z.string().min(8, {
		message: 'La contraseña debe contener 8 caracteres como mínimo',
	}),
})

export default function Login() {
	// creamos el formulario y asignamos valores predeterminados
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	function onSubmit() {
		alert('iniciando sesion')
	}

	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<div className='hidden w-1/2 h-[800px] bg-black md:flex flex-col justify-center gap-y-4 px-5'>
				<p className='text-5xl'>👋</p>
				<H2 className='text-5xl text-white'>Bienvenido de nuevo</H2>
				<p className='text-gray-300'>
					encuentra con la inspiración, y juntos construyen el futuro del Los
					congresos académicos son el escenario donde el conocimiento se saber."
					🌟
				</p>
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
							name='username'
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
