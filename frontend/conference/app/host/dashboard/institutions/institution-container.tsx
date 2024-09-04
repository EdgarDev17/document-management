'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/app/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import Link from 'next/link'
import { InstitutionDetails } from '@/app/host/dashboard/institutions/add/columns'
import axios from 'axios'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { PlusCircle } from 'lucide-react'
import { apiClient } from '@/lib/api-service'

export function InstitutionContainer({ token }: { token: string }) {
	const [loading, setLoading] = useState(true)
	const [institutions, setInstitutions] = useState<InstitutionDetails[] | null>(
		null
	)

	useEffect(() => {
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
	}, [token])

	const renderContent = () => {
		if (loading) {
			return (
				<p className='text-center text-sm md:text-base'>Cargando datos...</p>
			)
		}

		if (!institutions || institutions.length === 0) {
			return (
				<div className='flex flex-col items-center justify-center h-full p-4'>
					<svg
						className='w-24 h-24 md:w-48 md:h-48 text-gray-300'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
						/>
					</svg>
					<p className='mt-4 text-lg md:text-xl font-semibold text-gray-600 text-center'>
						Aún no tienes instituciones creadas
					</p>
					<Link href='/host/dashboard/institutions/add' className='mt-4'>
						<Button variant='default'>
							<PlusCircle className='mr-2 h-4 w-4' />
							Crear institución
						</Button>
					</Link>
				</div>
			)
		}

		return (
			<div className=' py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
				{institutions.map((institution) => (
					<Card className='w-full relative' key={institution.institutionID}>
						<CardHeader className='bg-tertiary rounded-t-lg pt-4 h-24 md:h-32 flex flex-col justify-between'>
							<CardTitle className='text-base md:text-lg text-white pr-16 md:pr-24'>
								{institution.name}
							</CardTitle>
							<div className='absolute right-2 md:right-4 top-2 md:top-4'>
								<img
									src={
										!institution.image
											? '/pfp_i.png'
											: `data:image/jpeg;base64,${institution.image}`
									}
									alt={`Logo de ${institution.name}`}
									className='w-16 h-16 md:w-24 md:h-24 rounded-full object-cover'
								/>
							</div>
						</CardHeader>
						<CardContent className='flex flex-col justify-center items-start h-32 md:h-40 py-4 md:py-6'>
							<p className='text-xs md:text-sm'>
								{institution.description.length > 100
									? `${institution.description.substring(0, 100)}...`
									: institution.description}
							</p>
						</CardContent>
						<CardFooter className='flex justify-end'>
							<Button size='sm' variant='outline' asChild>
								<Link href={`institutions/edit/${institution.institutionID}`}>
									Editar
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		)
	}

	return (
		<div className='w-full px-4 py-8 md:w-11/12 mx-auto flex flex-col gap-y-4 md:gap-y-6'>
			<div className='w-full flex justify-end items-center'>
				<Link href='/host/dashboard/institutions/add'>
					<Button
						variant='default'
						size='sm'
						className='md:text-base md:py-2 md:px-4'>
						Crear
					</Button>
				</Link>
			</div>
			<ScrollArea className='w-full h-[calc(100vh-12rem)] md:h-[70vh] rounded-md border border-none p-2 md:p-0'>
				{renderContent()}
			</ScrollArea>
		</div>
	)
}
