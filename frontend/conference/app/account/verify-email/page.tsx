'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-service'

export default function EmailVerification() {
	const [isVerified, setIsVerified] = useState(false)
	const router = useRouter()
	const searchParams = useSearchParams()
	const userId = searchParams.get('userID')

	const handleVerification = async () => {
		try {
			const res = await apiClient.post(`/registerusers/validateemail/${userId}`)

			setIsVerified(true)
			setTimeout(() => {
				router.push('/account/login')
			}, 3000)
		} catch (error) {
			toast.error('Error al verificar el mail')
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold text-center'>
						Bienvenido
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-center mb-4'>
						Gracias por registrarte. Por favor, verifica tu correo electrónico
						haciendo clic en el botón de abajo.
					</p>
				</CardContent>
				<CardFooter className='flex justify-center'>
					{!isVerified ? (
						<Button onClick={handleVerification}>Soy yo, verificar</Button>
					) : (
						<p className='text-green-600 font-semibold'>
							¡Tu correo ha sido verificado!
						</p>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
