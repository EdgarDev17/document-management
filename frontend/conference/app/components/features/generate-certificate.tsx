'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-service'
import { HttpStatusCode } from 'axios'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { Separator } from '@/app/components/ui/separator'
import {
	FileUpload,
	User,
	Building,
	FileText,
	Users,
	Image,
} from 'lucide-react'

const formSchema = z.object({
	UserId: z.string().min(1, { message: 'El ID de usuario es requerido' }),
	TopicId: z.string().min(1, { message: 'El ID del tema es requerido' }),
	InstitutionName: z
		.string()
		.min(1, { message: 'El nombre de la institución es requerido' }),
	Content: z.string().min(1, { message: 'El contenido es requerido' }),
	OrganizerName1: z
		.string()
		.min(1, { message: 'El nombre del organizador 1 es requerido' }),
	OrganizerTitle1: z
		.string()
		.min(1, { message: 'El título del organizador 1 es requerido' }),
	OrganizerName2: z
		.string()
		.min(1, { message: 'El nombre del organizador 2 es requerido' }),
	OrganizerTitle2: z
		.string()
		.min(1, { message: 'El título del organizador 2 es requerido' }),
	BackgroundImagePath: z
		.string()
		.min(1, { message: 'La ruta de la imagen de fondo es requerida' }),
	LogoPath: z.instanceof(File).optional(),
	SignatureImagePath1: z.instanceof(File).optional(),
	SignatureImagePath2: z.instanceof(File).optional(),
	SealLogo: z.instanceof(File).optional(),
})

export function CertificateFormDialog({
	userId,
	topicId,
	institutionName,
	token,
}: {
	userId: number
	topicId: number
	institutionName: string
	token: string
}) {
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			UserId: userId.toString(),
			TopicId: topicId.toString(),
			InstitutionName: institutionName,
			Content: '',
			OrganizerName1: '',
			OrganizerTitle1: '',
			OrganizerName2: '',
			OrganizerTitle2: '',
			BackgroundImagePath: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		const formData = new FormData()

		Object.entries(values).forEach(([key, value]) => {
			if (value instanceof File) {
				formData.append(key, value)
			} else {
				formData.append(key, value.toString())
			}
		})

		try {
			const response = await apiClient.post(
				'/Certificate/SaveCertificateConfigs',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization-Token': token,
					},
				}
			)

			if (response.status !== HttpStatusCode.Ok) {
				throw new Error('Error al enviar el formulario')
			}

			toast.success('Guardado con éxito')
			setIsOpen(false)
			form.reset()
		} catch (error) {
			console.error('Error al enviar el formulario:', error)
			toast.error('Ocurrió un error al intentar guardarlo, intente más tarde')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>
					<FileText className='w-4 h-4 mr-2' />
					Configurar Certificado
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[800px] w-11/12'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold'>
						Configuración del Certificado
					</DialogTitle>
					<DialogDescription>
						Ingrese los detalles para la configuración del certificado.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className='max-h-[80vh] overflow-y-auto pr-4'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
							<Card>
								<CardHeader>
									<CardTitle className='text-lg font-semibold'>
										<User className='w-5 h-5 inline-block mr-2' />
										Información Básica
									</CardTitle>
								</CardHeader>
								<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='UserId'
										render={({ field }) => (
											<FormItem>
												<FormLabel>ID de Usuario</FormLabel>
												<FormControl>
													<Input
														placeholder='Ingrese ID de Usuario'
														{...field}
														disabled
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='TopicId'
										render={({ field }) => (
											<FormItem>
												<FormLabel>ID del Tema</FormLabel>
												<FormControl>
													<Input
														placeholder='Ingrese ID del Tema'
														{...field}
														disabled
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='InstitutionName'
										render={({ field }) => (
											<FormItem className='col-span-2'>
												<FormLabel>Nombre de la Institución</FormLabel>
												<FormControl>
													<Input
														placeholder='Ingrese Nombre de la Institución'
														{...field}
														disabled
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className='text-lg font-semibold'>
										<FileText className='w-5 h-5 inline-block mr-2' />
										Contenido del Certificado
									</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name='Content'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Contenido</FormLabel>
												<FormControl>
													<Textarea
														placeholder='Ingrese el contenido del certificado'
														className='min-h-[100px]'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className='text-lg font-semibold'>
										<Users className='w-5 h-5 inline-block mr-2' />
										Información de Organizadores
									</CardTitle>
								</CardHeader>
								<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='OrganizerName1'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nombre del Organizador 1</FormLabel>
												<FormControl>
													<Input
														placeholder='Ingrese Nombre del Organizador 1'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='OrganizerTitle1'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Título del Organizador 1</FormLabel>
												<FormControl>
													<Input
														placeholder='Ingrese Título del Organizador 1'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='OrganizerName2'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nombre del Organizador 2</FormLabel>
												<FormControl>
													<Input
														placeholder='Ingrese Nombre del Organizador 2'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='OrganizerTitle2'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Título del Organizador 2</FormLabel>
												<FormControl>
													<Input
														placeholder='Ingrese Título del Organizador 2'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className='text-lg font-semibold'>
										<Image className='w-5 h-5 inline-block mr-2' />
										Imágenes y Logos
									</CardTitle>
								</CardHeader>
								<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='BackgroundImagePath'
										render={({ field }) => (
											<FormItem className='col-span-2'>
												<FormLabel>Ruta de la Imagen de Fondo</FormLabel>
												<FormControl>
													<Input
														placeholder='Ingrese Ruta de la Imagen de Fondo'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='LogoPath'
										render={({ field: { value, onChange, ...field } }) => (
											<FormItem>
												<FormLabel>Logo</FormLabel>
												<FormControl>
													<Input
														type='file'
														accept='image/*'
														onChange={(e) => onChange(e.target.files?.[0])}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='SignatureImagePath1'
										render={({ field: { value, onChange, ...field } }) => (
											<FormItem>
												<FormLabel>Imagen de Firma 1</FormLabel>
												<FormControl>
													<Input
														type='file'
														accept='image/*'
														onChange={(e) => onChange(e.target.files?.[0])}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='SignatureImagePath2'
										render={({ field: { value, onChange, ...field } }) => (
											<FormItem>
												<FormLabel>Imagen de Firma 2</FormLabel>
												<FormControl>
													<Input
														type='file'
														accept='image/*'
														onChange={(e) => onChange(e.target.files?.[0])}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='SealLogo'
										render={({ field: { value, onChange, ...field } }) => (
											<FormItem>
												<FormLabel>Logo del Sello</FormLabel>
												<FormControl>
													<Input
														type='file'
														accept='image/*'
														onChange={(e) => onChange(e.target.files?.[0])}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<Separator className='my-6' />

							<Button type='submit' disabled={isLoading} className='w-full'>
								{isLoading ? 'Enviando...' : 'Guardar Configuración'}
							</Button>
						</form>
					</Form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}
