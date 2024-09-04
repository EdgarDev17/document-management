'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import { UserIcon, MicIcon } from 'lucide-react'
import { apiClient } from '@/lib/api-service'
import { Role } from '@/types/models/role'
import { AxiosError, HttpStatusCode } from 'axios'
import { toast } from 'sonner'
import { WaveLoading } from '../common/wave-loading'

interface RegisterUserToTalkProps {
	token: string
	talkId: number
	userId: number
}

export function RegisterUserToTalk({
	token,
	talkId,
	userId,
}: RegisterUserToTalkProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleRegister = async (role: 'participant' | 'speaker') => {
		setLoading(true)
		try {
			// si el rol es participant asignarle 4.
			// si el role es speaker asignarle 3
			let selectedRole = role === 'participant' ? Role.Attendee : Role.Speaker

			const response = await apiClient.post(
				'/conference/conferenceassignusertopic',
				{
					userID: userId,
					topicsID: talkId,
					rolID: selectedRole,
				},
				{
					headers: {
						'Authorization-Token': token,
					},
				}
			)

			if (response.status == HttpStatusCode.Ok) {
				toast.success('Te has registrado al evento con éxito')
				setIsOpen(false)
			}
		} catch (err: any) {
			if (
				err.response.status === 409 &&
				err.response.data.message ===
					'El número máximo de oradores ya ha sido alcanzado'
			) {
				toast.error('Esta charla no acepta más ponentes')
				return
			} else {
				toast.error('Error al intentar registrarte en el evento')
			}

			setIsOpen(false)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className='w-full bg-green-600 hover:bg-green-700 transition-colors duration-200'>
					Registrarse ahora
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Registrarse para la charla</DialogTitle>
					<DialogDescription>
						Selecciona el rol con el que deseas registrarte para esta charla.
					</DialogDescription>
				</DialogHeader>
				{loading ? (
					<div className='py-8'>
						<WaveLoading />
					</div>
				) : (
					<div className='grid grid-cols-2 gap-4 py-4'>
						<Button
							onClick={() => handleRegister('participant')}
							variant={'outline'}
							className='flex flex-col items-center justify-center h-32 space-y-2 hover:bg-blue-600 hover:text-blue-50'>
							<UserIcon className='h-8 w-8' />
							<span>Como participante</span>
						</Button>
						<Button
							onClick={() => handleRegister('speaker')}
							variant={'outline'}
							className='flex flex-col items-center justify-center h-32 space-y-2 hover:bg-blue-600 hover:text-blue-50'>
							<MicIcon className='h-8 w-8' />
							<span>Como ponente</span>
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
