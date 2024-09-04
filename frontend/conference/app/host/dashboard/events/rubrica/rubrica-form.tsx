'use client'
import React, { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Checkbox } from '@/app/components/ui/checkbox'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Badge } from '@/app/components/ui/badge'
import { ClipboardList } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-service'

// Definición de tipos
type Criterion = {
	criterionID: number
	aspect: string
	description: string
}

type Scale = {
	scaleID: number
	scale: string
	description: string
}

type ResponseEvaluationD = {
	_Evalutioncriteria: Criterion[]
	_Evalutionscale: Scale[]
}

// Datos de ejemplo
const responseData: { _ResponseEvaluationD: ResponseEvaluationD } = {
	_ResponseEvaluationD: {
		_Evalutioncriteria: [
			{
				criterionID: 1,
				aspect: 'Titulo',
				description:
					'Correspondencia del Titulo con el contenido del documento,su sintaxis debe ser clara,explicativa y concisa',
			},
			{
				criterionID: 2,
				aspect: 'Resumen',
				description:
					'Dar cuenta de manera breve, el problema, los metodos utilizados y conclusiones',
			},
			{
				criterionID: 3,
				aspect: 'Originalidad',
				description:
					'Debe ser inedito y producto de investigacion(Argumentos teoricos y metodologicos) ',
			},
			{
				criterionID: 4,
				aspect: 'Organización Interna ',
				description:
					'Debe estar presentado con un nivel de coherencia, facilidad de lectura, fomento de la discusión, uso correcto del lenguaje y enlace adecuados entre párrafos y secciones',
			},
			{
				criterionID: 5,
				aspect: 'Introducción',
				description:
					'Narrar el planteamiento del problema, propósito de la investigación, consideraciones teóricas y objetivos de investigación ',
			},
			{
				criterionID: 6,
				aspect: 'Método',
				description:
					'Valoración de la estructura y coherencia de la metodología empleada.',
			},
			{
				criterionID: 7,
				aspect: 'Resultados',
				description:
					'Presentación concreta, adecuada y coherente de los resultados',
			},
			{
				criterionID: 8,
				aspect: 'Tablas y gráficos',
				description:
					'Análisis de los datos a través de tablas y gráficos evitando la redundancia innecesaria',
			},
			{
				criterionID: 9,
				aspect: 'Conclusiones',
				description:
					'Responder los objetivos de la investigación, no deben repetir los resultados, verificando el impacto de los planteamientos realizados dentro de los términos de su contribución',
			},
			{
				criterionID: 10,
				aspect: 'Referencias Bibliográficas',
				description: 'Correspondencia con las referencias citadas en el texto',
			},
		],
		_Evalutionscale: [
			{
				scaleID: 1,
				scale: 'A',
				description: 'Se cumple adecuadamente',
			},
			{
				scaleID: 2,
				scale: 'B',
				description: 'Se cumple parcialmente',
			},
			{
				scaleID: 3,
				scale: 'C',
				description: 'No se cumple ',
			},
		],
	},
}

function AddRubrica({ token }: { token: string }) {
	const [selectedCriteria, setSelectedCriteria] = useState<number[]>([])
	const searchParams = useSearchParams()
	const [isLoading, setIsLoading] = useState(false)
	const conferenceId = searchParams.get('conferenceId')
	const talkId = searchParams.get('talkId') ? searchParams.get('talkId') : ''
	const router = useRouter()

	const handleCriterionToggle = (criterionID: number) => {
		setSelectedCriteria((prev) =>
			prev.includes(criterionID)
				? prev.filter((id) => id !== criterionID)
				: [...prev, criterionID]
		)
	}

	const handleConfirm = async () => {
		setIsLoading(true)
		const apiResponse = selectedCriteria.map((criterionID) => ({
			criterionID,
			conferenceID: parseInt(conferenceId || '0'),
		}))

		try {
			await apiClient.post(
				'/conference/registerevalutioncriteriaconference',
				JSON.stringify(apiResponse, null, 2),
				{
					headers: {
						'Authorization-Token': token,
					},
				}
			)

			toast.success('Rúbrica asignada con éxito')
			router.push(`/host/dashboard/events/talks/${talkId}`)
		} catch (error) {
			toast.error('Ocurrió un error al enviar el criterio')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='container mx-auto py-6 px-4'>
			<header className='mb-6'>
				<h1 className='text-2xl font-bold flex items-center'>
					<ClipboardList className='mr-2 h-5 w-5' />
					Asignar rúbrica
				</h1>
			</header>
			<main className='grid gap-6 md:grid-cols-[3fr,1fr]'>
				<section>
					<h2 className='text-xl font-semibold mb-3'>
						Criterios de evaluación
					</h2>
					<ScrollArea className='h-[calc(80vh-250px)] pr-4'>
						<div className='space-y-3'>
							{responseData._ResponseEvaluationD._Evalutioncriteria.map(
								(criterion) => (
									<div
										key={criterion.criterionID}
										className={`flex items-start space-x-2 p-3 border rounded-md transition-colors duration-200 ease-in-out
                    ${selectedCriteria.includes(criterion.criterionID) ? 'bg-primary/10 border-primary' : 'hover:bg-muted'}`}>
										<Checkbox
											id={`criterion-${criterion.criterionID}`}
											checked={selectedCriteria.includes(criterion.criterionID)}
											onCheckedChange={() =>
												handleCriterionToggle(criterion.criterionID)
											}
											className='mt-1'
										/>
										<div className='flex-1'>
											<label
												htmlFor={`criterion-${criterion.criterionID}`}
												className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
												{criterion.aspect}
											</label>
											<p className='text-xs text-muted-foreground mt-1'>
												{criterion.description}
											</p>
										</div>
									</div>
								)
							)}
						</div>
					</ScrollArea>
				</section>
				<aside>
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Escalas de calificación</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-3'>
								{responseData._ResponseEvaluationD._Evalutionscale.map(
									(scale) => (
										<div
											key={scale.scaleID}
											className='flex items-center space-x-2'>
											<Badge
												variant={
													scale.scale === 'A'
														? 'default'
														: scale.scale === 'B'
															? 'secondary'
															: 'outline'
												}>
												{scale.scale}
											</Badge>
											<span className='text-sm'>{scale.description}</span>
										</div>
									)
								)}
							</div>
						</CardContent>
					</Card>
				</aside>
			</main>
			<footer className='mt-6 flex justify-start space-x-4'>
				<Link href={`/host/dashboard/events/talks/${talkId}`}>
					<Button variant='outline'>Cancelar</Button>
				</Link>
				<Button onClick={handleConfirm} disabled={isLoading}>
					{isLoading ? 'Cargando...' : 'Confirmar'}
				</Button>
			</footer>
		</div>
	)
}

export { AddRubrica }
