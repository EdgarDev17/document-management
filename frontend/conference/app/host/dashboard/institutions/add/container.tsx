'use client'

import React from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { DataTable } from './data-table'
import { columns, InstitutionDetails } from './columns'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { AddInstitution } from '@/app/components/form/add-institution'
import { apiClient } from '@/lib/api-service'

export function Container({
	userId,
	token,
}: {
	userId: string
	token: string
}) {
	const [loading, setLoading] = React.useState(true)
	const [institutions, setInstitutions] = React.useState<
		InstitutionDetails[] | null
	>(null)
	const [institutionModal, setInstitutionModal] = React.useState<boolean>(false)
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

	const handleCreatingInstitution = async (state: boolean) => {
		setIsSubmitting(state)
		if (!state) {
			setInstitutionModal(false)
			fetchInstitutions()
		}
	}

	const fetchInstitutions = () => {
		setLoading(true)
		apiClient
			.get('/Institutions', {
				headers: {
					'Authorization-Token': token,
				},
			})
			.then((response) => {
				setInstitutions(response.data)
			})
			.catch((error) => {
				console.error('Error fetching institutions:', error)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	React.useEffect(() => {
		fetchInstitutions()
	}, [token])

	return (
		<div className='flex flex-col gap-y-8 md:gap-y-16 py-4 md:py-8 px-4 md:px-0'>
			<div className='flex flex-col md:flex-row justify-between gap-4 md:gap-0'>
				<Card className='w-full md:max-w-[400px]'>
					<CardHeader className='bg-tertiary'>
						<CardTitle className='text-white font-bold text-lg md:text-xl'>
							Instituciones creadas
						</CardTitle>
					</CardHeader>
					<CardContent className='py-4 md:py-6 flex justify-center items-center'>
						{loading ? (
							<p className='text-sm md:text-base'>Cargando...</p>
						) : (
							<p className='text-3xl md:text-4xl font-bold'>
								{institutions ? institutions.length : '0'}
							</p>
						)}
					</CardContent>
				</Card>
				<Dialog open={institutionModal} onOpenChange={setInstitutionModal}>
					<DialogTrigger asChild>
						<Button
							variant='default'
							className='text-sm md:text-base w-full md:w-auto bg-blue-600'>
							Crear Institución
						</Button>
					</DialogTrigger>
					<DialogContent className='max-w-[90vw] md:max-w-[700px]'>
						<DialogHeader>
							<DialogTitle className='text-lg md:text-xl'>
								Añadir nueva institución
							</DialogTitle>
							<DialogDescription className='text-sm md:text-base'>
								Si la institucion no aparece en la lista, puedes crearla aqui
							</DialogDescription>
						</DialogHeader>
						<div className='mt-4'>
							<AddInstitution
								token={token}
								userId={userId}
								isInstitutionLoading={handleCreatingInstitution}
							/>
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<div className='w-full overflow-x-auto'>
				{loading ? (
					<p className='text-sm md:text-base'>Cargando...</p>
				) : (
					<DataTable
						columns={columns}
						data={institutions ? institutions : []}
					/>
				)}
			</div>
		</div>
	)
}
