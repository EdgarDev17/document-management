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

export function InstitutionContainer({ token }: { token: string }) {
	const [loading, setLoading] = useState(true)
	const [institutions, setInstitutions] = useState<InstitutionDetails[] | null>(
		null
	)

	useEffect(() => {
		axios('http://localhost:5110/api/Institutions', {
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
			return <p className='text-center'>Cargando datos...</p>
		}

		if (!institutions || institutions.length === 0) {
			return (
				<div className='flex flex-col items-center justify-center h-full'>
					<svg
						className='w-48 h-48 text-gray-300'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
						/>
					</svg>
					<p className='mt-4 text-xl font-semibold text-gray-600'>
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
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{institutions.map((institution) => (
					<Card className='w-full relative' key={institution.institutionID}>
						<div className='absolute right-4 top-[34%] -translate-y-1/2'>
							<img
								src={
									!institution.image
										? '/pfp_i.png'
										: `data:image/jpeg;base64,${institution.image}`
								}
								alt={`Logo de ${institution.name}`}
								className='w-24 h-24 rounded-full object-cover'
							/>
						</div>
						<CardHeader className='bg-tertiary rounded-t-lg pt-4 h-32'>
							<CardTitle className='text-lg text-white'>
								{institution.name}
							</CardTitle>
						</CardHeader>
						<CardContent className='flex flex-col justify-center items-start h-40 py-6'>
							<p className='text-sm'>
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
		<div className='w-11/12 mx-auto flex flex-col gap-y-6'>
			<div className='w-full flex justify-end items-center'>
				<Link href='/host/dashboard/institutions/add'>
					<Button variant='default'>Crear</Button>
				</Link>
			</div>
			<ScrollArea className='w-full h-[70vh] rounded-md border border-none'>
				{renderContent()}
			</ScrollArea>
		</div>
	)
}
