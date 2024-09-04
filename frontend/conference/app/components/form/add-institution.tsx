'use client'

import React, { useState } from 'react'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/app/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/app/components/ui/form'
import { Textarea } from '@/app/components/ui/textarea'
import { CloudUpload } from 'lucide-react'
import { apiClient } from '@/lib/api-service'
import { HttpStatusCode } from 'axios'
import { toast } from 'sonner'
import { ScrollArea } from '../ui/scrollarea'

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Ingresa el nombre de la institución',
	}),
	website: z.string().min(1, {
		message: 'Ingresa una URL válida',
	}),
	contact_phone: z.string().min(1, {
		message: 'Ingresa un número de teléfono válido',
	}),
	description: z.string().min(1, {
		message: 'Ingresa la descripción',
	}),
	image: z.string().min(1, {
		message: 'selecciona una imagen',
	}),
})

export function AddInstitution({
	userId,
	token,
	isInstitutionLoading,
}: {
	userId: string
	token: string
	isInstitutionLoading: (state: boolean) => void
}) {
	const [previewImage, setPreviewImage] = useState<string | null>(null)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			website: '',
			contact_phone: '',
			description: '',
			image: '',
		},
	})

	async function onSubmit(
		values: z.infer<typeof formSchema>,
		event: React.FormEvent
	) {
		event.preventDefault()
		isInstitutionLoading(true)

		try {
			const response = await apiClient.post(
				'/Institutions/create',
				{
					Name: values.name,
					Wesbite: values.website,
					Phone: values.contact_phone,
					Description: values.description,
					Image: values.image,
					userID: userId,
				},
				{
					headers: {
						'Authorization-Token': token,
					},
				}
			)

			if (response.status == HttpStatusCode.Ok) {
				isInstitutionLoading(false)
				toast.success('Institucion creada con éxito')
				return
			}
			isInstitutionLoading(false)
			toast.error('Error al crear la institución, intente de nuevo mas tarde')
		} catch (err) {
			return null
		}
	}

	function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				const result = reader.result as string
				const base64 = result.replace(/^data:image\/\w+;base64,/, '')

				setPreviewImage(result)
				form.setValue('image', base64)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<ScrollArea className='h-[600px] w-full md:h-auto md:px-0'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values, event) =>
						onSubmit(values, event as React.FormEvent)
					)}
					className='w-full space-y-8 pb-8 md:pb-0'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div className='space-y-8'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre Institución</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>
											Nombre con el que se guardará la institución
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='website'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sitio Web</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>
											URL oficial de la institución
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='contact_phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Teléfono de Contacto</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>
											Número de teléfono de contacto de la institución
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='space-y-8'>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descripción</FormLabel>
										<FormControl>
											<Textarea {...field} className='resize-none h-32' />
										</FormControl>
										<FormDescription>
											Breve descripción de la institución (Maximo 140
											caracteres)
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormItem className='flex flex-col'>
								<Label>Imagen de la institución</Label>
								<FormLabel
									htmlFor='institutionimage'
									className='w-full border border-zinc-200 shadow p-3 rounded-lg bg-zinc-800 flex items-center justify-center text-white cursor-pointer hover:bg-zinc-700 transition-colors'>
									<CloudUpload className='w-6 h-6 mr-2' />
									<span>Subir imagen</span>
								</FormLabel>
								<Input
									id='institutionimage'
									type='file'
									accept='image/jpeg, image/png'
									onChange={handleImageChange}
									className='hidden'
								/>
								<FormMessage />
								<FormDescription>
									Selecciona una imagen en formato JPG o PNG. (OBLIGATORIO)
								</FormDescription>
								{previewImage && (
									<div className='mt-4'>
										<p>Vista previa de la imagen:</p>
										<img
											src={previewImage}
											alt='Vista previa'
											className='mt-2 w-24 h-24 object-cover rounded-lg'
										/>
									</div>
								)}
							</FormItem>
						</div>
					</div>
					<Button type='submit' className='w-full md:w-auto bg-blue-600'>
						Crear Institución
					</Button>
				</form>
			</Form>
		</ScrollArea>
	)
}
