'use client'

import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { apiClient } from '@/lib/api-service'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function RegisterUserEvent({
	conferenceId,
	token,
}: {
	conferenceId: string
	token: string
}) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	async function handleOnRegisterClick() {
		setIsLoading(true)
		try {
			await apiClient.post(
				'/Conference/RegisterUserAssignedConference',
				{
					conferenceID: conferenceId,
				},
				{
					headers: {
						'Authorization-Token': token,
					},
				}
			)
			toast.success('Te has registrado a la conferencia. ¡Pásalo bien!')
			router.refresh()
			setIsOpen(false) // Cerrar el diálogo después de un registro exitoso
		} catch (err) {
			toast.error('Error al registrarte al evento')
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size='lg' className='bg-blue-600 mt-4 sm:mt-0'>
					Registrarme al evento
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full'>
				<DialogHeader>
					<DialogTitle>Bienvenido, Un paso más</DialogTitle>
					<DialogDescription>
						¿Deseas registrarte a ese evento?
					</DialogDescription>
				</DialogHeader>

				<div className='w-full flex justify-center py-6'>
					<Button
						className='bg-blue-600 w-full'
						onClick={handleOnRegisterClick}
						disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Registrando...
							</>
						) : (
							'Registrarme al evento'
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
