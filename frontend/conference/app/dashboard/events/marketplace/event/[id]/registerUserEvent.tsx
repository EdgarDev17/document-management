'use client'

import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { apiClient } from '@/lib/api-service'
import { useRouter } from 'next/navigation'
import { HttpStatusCode } from 'axios'
import { toast } from 'sonner'

function RegisterUserEvent({
	conferenceId,
	token,
}: {
	conferenceId: string
	token: string
}) {
	const router = useRouter()

	async function handleOnRegisterClick() {
		try {
			const res = await apiClient.post(
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
		} catch (err) {
			toast.error('Error al registrarte al evento')
			console.log(err)
			return null
		}
	}

	return (
		<DialogContent className='w-full'>
			<DialogHeader>
				<DialogTitle>Bienvenido, Un paso más</DialogTitle>
				<DialogDescription>¿Deseas registrarte a ese evento?</DialogDescription>
			</DialogHeader>

			<div className='w-full flex justify-center py-6'>
				<Button className='bg-blue-600 w-full' onClick={handleOnRegisterClick}>
					Registrame al evento
				</Button>
			</div>
		</DialogContent>
	)
}

export { RegisterUserEvent }
