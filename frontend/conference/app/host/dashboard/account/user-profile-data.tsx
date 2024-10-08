'use client'

import React, { useState, useEffect } from 'react'
import { urlRegisterUsers } from '@/lib/endpoints'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { signOut } from 'next-auth/react'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { formatDate } from '@/lib/utils'
import { Skeleton } from '@/app/components/ui/skeleton'
import {
	PencilIcon,
	LogOut,
	Mail,
	MapPin,
	Calendar,
	Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-service'
import { WaveLoading } from '@/app/components/common/wave-loading'

function UserProfileData({ token }: { token: string }) {
	const [base64String, setBase64String] = useState('')
	const [userProfile, setUserProfile] = useState<any>({})
	const [loading, setLoading] = useState(true)
	const [isUploading, setIsUploading] = useState(false)

	useEffect(() => {
		fetchUserProfile()
	}, [token])

	const fetchUserProfile = () => {
		apiClient
			.get('/User/UserPerfil', {
				headers: {
					'Authorization-Token': token,
				},
			})
			.then((response) => {
				setBase64String(response.data.imagenBase)
				setUserProfile(response.data)
				setLoading(false)
			})
			.catch((err) => {
				console.error('Error al obtener el perfil del usuario:', err)
				toast.error(
					'No se pudo cargar el perfil del usuario. Por favor, intente de nuevo.'
				)
				setLoading(false)
			})
	}

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.onload = () => {
				if (fileReader.result) {
					const base64String = (fileReader.result as string).split(',')[1]
					resolve(base64String)
				} else {
					reject(new Error('FileReader result is null'))
				}
			}
			fileReader.onerror = (error) => reject(error)
		})
	}

	const uploadImageToAPI = async (
		base64: string,
		extension: string,
		token: string
	) => {
		console.log({
			image: base64,
			extension: extension,
		})
		try {
			const response = await apiClient.post(
				`/Registerusers/Imagen`,
				{
					image: base64,
					imageExtension: extension,
				},
				{
					headers: {
						'Authorization-Token': token,
					},
				}
			)
			return response
		} catch (error) {
			console.error('Error en la llamada a la API:', error)
			throw error
		}
	}

	const handleImageUpload = async (file: File) => {
		setIsUploading(true)
		const extension = file.name.split('.').pop() || ''
		console.error('Debug:', { imageExtension: extension })

		try {
			const base64 = await convertToBase64(file)
			console.error('Imagen convertida a base64 exitosamente')

			const response = await uploadImageToAPI(base64, extension, token)
			console.error('Respuesta de la API:', response)

			toast.success('Foto actualizada correctamente')
			fetchUserProfile()
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === 'FileReader result is null') {
					console.error('Error al convertir la imagen a base64:', error)
					toast.error(
						'No se pudo procesar la imagen. Por favor, intente con otra imagen.'
					)
				} else {
					console.error('Error al subir la imagen a la API:', error)
					toast.error(
						'No se pudo actualizar la imagen en el servidor. Por favor, intente de nuevo.'
					)
				}
			} else {
				console.error('Error desconocido:', error)
				toast.error('Ocurrió un error inesperado. Por favor, intente de nuevo.')
			}
		} finally {
			setIsUploading(false)
		}
	}

	if (loading) {
		return <LoadingSkeleton />
	}

	return (
		<div className='min-h-screen py-8'>
			<div className='w-full max-w-4xl mx-auto space-y-8'>
				<Card className='border-none shadow-lg'>
					<CardContent className='p-6'>
						<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
							<div className='flex flex-col md:flex-row items-center gap-x-6'>
								<div className='relative group'>
									{isUploading ? (
										<Skeleton className='h-24 w-24 rounded-full animate-bounce flex justify-center items-center'>
											<WaveLoading />
										</Skeleton>
									) : (
										<Avatar className='h-24 w-24 border-4 border-primary/20'>
											<AvatarImage
												src={`data:image/jpeg;base64,${base64String}`}
												alt={userProfile.name}
											/>
											<AvatarFallback>
												{userProfile.name?.charAt(0)}
												{userProfile.lastname?.charAt(0)}
											</AvatarFallback>
										</Avatar>
									)}
									<label
										htmlFor='profile-image-upload'
										className='absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity'>
										{isUploading ? (
											<Loader2 className='h-4 w-4 animate-spin' />
										) : (
											<PencilIcon className='h-4 w-4' />
										)}
										<input
											id='profile-image-upload'
											type='file'
											accept='image/*'
											className='hidden'
											onChange={(e) => {
												const file = e.target.files?.[0]
												if (file) handleImageUpload(file)
											}}
											disabled={isUploading}
										/>
									</label>
								</div>
								<div className='text-center md:text-left'>
									<h2 className='text-3xl font-bold'>
										{userProfile.name} {userProfile.lastname}
									</h2>
									<p className='text-muted-foreground'>Perfil de usuario</p>
								</div>
							</div>
							<Button
								variant='outline'
								onClick={() => signOut()}
								className='gap-2'>
								<LogOut size={16} />
								Cerrar Sesión
							</Button>
						</div>
					</CardContent>
				</Card>

				<div className='grid gap-6 md:grid-cols-2'>
					<ProfileCard
						icon={<Mail className='h-5 w-5 text-primary' />}
						title='Email'
						description='Este el correo asociado a tu cuenta'
						value={userProfile.email}
					/>
					<ProfileCard
						icon={<MapPin className='h-5 w-5 text-primary' />}
						title='País'
						description='Es tu país de residencia'
						value={'El Salvador'}
					/>
					<ProfileCard
						icon={<Calendar className='h-5 w-5 text-primary' />}
						title='Fecha de nacimiento'
						description='No se puede editar'
						value={formatDate(userProfile.birthdate)}
					/>
				</div>
			</div>
		</div>
	)
}

function ProfileCard({
	icon,
	title,
	description,
	value,
}: {
	icon: React.ReactNode
	title: string
	description: string
	value: string
}) {
	return (
		<Card className='border-none shadow-md hover:shadow-lg transition-shadow duration-300'>
			<CardHeader className='flex flex-row items-center gap-4'>
				{icon}
				<div>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<Input type='text' value={value} disabled className='bg-muted' />
			</CardContent>
		</Card>
	)
}

function LoadingSkeleton() {
	return (
		<div className='w-full max-w-4xl mx-auto space-y-8 p-8'>
			<div className='flex items-center space-x-4'>
				<Skeleton className='h-24 w-24 rounded-full' />
				<div className='space-y-2'>
					<Skeleton className='h-8 w-[250px]' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
			</div>
			<div className='grid gap-6 md:grid-cols-2'>
				{[...Array(3)].map((_, i) => (
					<Card key={i} className='border-none shadow-md'>
						<CardHeader className='flex flex-row items-center gap-4'>
							<Skeleton className='h-8 w-8 rounded-full' />
							<div>
								<Skeleton className='h-6 w-[150px]' />
								<Skeleton className='h-4 w-[100px]' />
							</div>
						</CardHeader>
						<CardContent>
							<Skeleton className='h-10 w-full' />
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

export { UserProfileData }
