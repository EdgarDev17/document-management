'use client'

import { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Label } from '@/app/components/ui/label'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Drawer } from 'vaul'
import { Badge } from '@/app/components/ui/badge'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/app/components/ui/tabs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-service'
import { HttpStatusCode } from 'axios'

interface RubricItem {
	evaCritConfID: number
	conferenceID: number
	aspect: string
	description: string
}

interface ScaleItem {
	scaleID: number
	scale: string
	description: string
}

interface PDFViewerProps {
	pdfBase64: string
	rubric: RubricItem[]
	documentID: number
	topicsID: number
	token: string
}

const scaleItems: ScaleItem[] = [
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
		description: 'No se cumple',
	},
]

const RubricContent = ({
	rubric,
	evaluation,
	handleEvaluationChange,
	handleVerdict,
}: {
	rubric: RubricItem[]
	evaluation: Record<number, number>
	handleEvaluationChange: (evaCritConfID: number, scaleID: number) => void
	handleVerdict: (verdict: number) => void
}) => (
	<ScrollArea className='h-[calc(100vh-10rem)] pr-4'>
		<div className='space-y-8 p-1'>
			<h2 className='text-3xl font-bold'>Rúbrica de Evaluación</h2>
			{rubric.map((item) => (
				<Card key={item.evaCritConfID}>
					<CardHeader>
						<CardTitle className='text-xl font-semibold'>
							{item.aspect}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-sm text-muted-foreground mb-4'>
							{item.description}
						</p>
						<RadioGroup
							onValueChange={(value) =>
								handleEvaluationChange(item.evaCritConfID, parseInt(value))
							}
							value={evaluation[item.evaCritConfID]?.toString()}
							className='space-y-3'>
							{scaleItems.map((scale) => (
								<div
									key={scale.scaleID}
									className='flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted'>
									<RadioGroupItem
										value={scale.scaleID.toString()}
										id={`${item.evaCritConfID}-${scale.scaleID}`}
									/>
									<Label
										htmlFor={`${item.evaCritConfID}-${scale.scaleID}`}
										className='flex flex-1 items-center justify-between'>
										<span>{scale.description}</span>
										<Badge variant={getBadgeVariant(scale.scaleID)}>
											{scale.scale}
										</Badge>
									</Label>
								</div>
							))}
						</RadioGroup>
					</CardContent>
				</Card>
			))}
		</div>
		<CardFooter className='flex justify-between mt-6'>
			<Button onClick={() => handleVerdict(1)} variant='default'>
				Aprobado
			</Button>
			<Button onClick={() => handleVerdict(2)} variant='destructive'>
				Rechazado
			</Button>
		</CardFooter>
	</ScrollArea>
)

const getBadgeVariant = (scaleID: number) => {
	switch (scaleID) {
		case 1:
			return 'default'
		case 2:
			return 'secondary'
		case 3:
			return 'destructive'
		default:
			return 'secondary'
	}
}

export function PDFViewer({
	pdfBase64,
	rubric,
	documentID,
	topicsID,
	token,
}: PDFViewerProps) {
	const [numPages, setNumPages] = useState<number | null>(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)
	const [pdfReady, setPdfReady] = useState(false)
	const [pageWidth, setPageWidth] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)
	const [evaluation, setEvaluation] = useState<Record<number, number>>({})
	const [isDesktop, setIsDesktop] = useState(true)
	const [activeTab, setActiveTab] = useState('pdf')
	const router = useRouter()

	useEffect(() => {
		pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
		setPdfReady(true)

		const handleResize = () => {
			if (containerRef.current) {
				const width = containerRef.current.offsetWidth - 32
				setPageWidth(Math.min(width, 800))
			}
			setIsDesktop(window.innerWidth >= 1024)
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		if (activeTab === 'pdf') {
			setLoading(true)
			setError(null)
		}
	}, [activeTab])

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages)
		setLoading(false)
	}

	function onDocumentLoadError(error: Error) {
		setError(error)
		setLoading(false)
	}

	const goToPrevPage = () =>
		setPageNumber((prev) => (prev - 1 > 0 ? prev - 1 : prev))
	const goToNextPage = () =>
		setPageNumber((prev) => (prev + 1 <= numPages! ? prev + 1 : prev))

	const pdfData = pdfBase64
		? new Uint8Array(
				atob(pdfBase64)
					.split('')
					.map((char) => char.charCodeAt(0))
			)
		: null

	const handleEvaluationChange = (evaCritConfID: number, scaleID: number) => {
		setEvaluation((prev) => ({ ...prev, [evaCritConfID]: scaleID }))
	}

	const handleVerdict = async (verdict: number) => {
		try {
			// Formatear los datos de la rúbrica según el formato esperado por la API
			const rubricData = Object.entries(evaluation).map(
				([evaCritConfID, scaleID]) => ({
					evaCritConfID: parseInt(evaCritConfID),
					scaleID,
					documentID,
				})
			)

			console.log({ rubricData })

			// Enviar datos de la rúbrica
			const resRubric = await apiClient.post(
				'/Document/RegisterDocumentEvaluationCriteria',
				rubricData,
				{
					headers: {
						'Authorization-Token': token,
					},
				}
			)

			if (resRubric.status !== HttpStatusCode.Ok) {
				throw new Error('Error al enviar los datos de la rúbrica')
			}

			// Enviar veredicto
			const resVeredict = await apiClient.post(
				'/Document/RegisterDocumentVeredict',
				{
					documentID,
					veredictID: verdict,
				},
				{
					headers: {
						'Authorization-Token': token,
					},
				}
			)

			if (resVeredict.status !== HttpStatusCode.Ok) {
				throw new Error('Error al enviar el veredicto')
			}

			toast.success('Calificación enviada con éxito')
			router.push(`/dashboard/events/marketplace/event/talk/${topicsID}`)
		} catch (error) {
			console.error('Error:', error)
			toast.error('Error al enviar la calificación')
		}
	}

	const PDFContent = () => (
		<Card className='w-full h-full'>
			<CardContent className='p-4 h-full' ref={containerRef}>
				<div className='flex flex-col items-center h-full'>
					{loading && <p className='text-lg'>Cargando PDF...</p>}
					{error && (
						<p className='text-lg text-red-500'>
							Error al cargar el PDF: {error.message}
						</p>
					)}
					{pdfReady && pdfData && (
						<div
							className='w-full h-full mx-auto overflow-auto'
							style={{ maxHeight: 'calc(100vh - 12rem)' }}>
							<Document
								file={{ data: pdfData }}
								onLoadSuccess={onDocumentLoadSuccess}
								onLoadError={onDocumentLoadError}
								className='flex flex-col items-center'>
								<Page
									pageNumber={pageNumber}
									width={pageWidth}
									renderTextLayer={false}
									renderAnnotationLayer={false}
									scale={1}
								/>
							</Document>
						</div>
					)}
					{numPages && (
						<div className='mt-4 flex flex-col sm:flex-row items-center justify-between w-full gap-2'>
							<Button
								onClick={goToPrevPage}
								disabled={pageNumber <= 1}
								className='w-full sm:w-auto'>
								<ChevronLeftIcon className='h-4 w-4 mr-2' />
								Anterior
							</Button>
							<p className='text-sm'>
								Página {pageNumber} de {numPages}
							</p>
							<Button
								onClick={goToNextPage}
								disabled={pageNumber >= numPages}
								className='w-full sm:w-auto'>
								Siguiente
								<ChevronRightIcon className='h-4 w-4 ml-2' />
							</Button>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)

	return (
		<div className='w-full h-[calc(100vh-4rem)]'>
			{isDesktop ? (
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className='w-full h-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='pdf'>PDF</TabsTrigger>
						<TabsTrigger value='rubric'>Rúbrica</TabsTrigger>
					</TabsList>
					<TabsContent value='pdf' className='h-[calc(100%-40px)]'>
						<PDFContent />
					</TabsContent>
					<TabsContent value='rubric' className='h-[calc(100%-40px)]'>
						<Card className='w-full h-full'>
							<CardContent className='p-4 h-full'>
								<RubricContent
									evaluation={evaluation}
									rubric={rubric}
									handleEvaluationChange={handleEvaluationChange}
									handleVerdict={handleVerdict}
								/>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			) : (
				<>
					<PDFContent />
					<Drawer.Root>
						<Drawer.Trigger asChild>
							<Button className='w-full mt-4'>
								Mostrar puntos a calificar
							</Button>
						</Drawer.Trigger>
						<Drawer.Portal>
							<Drawer.Overlay className='fixed inset-0 bg-black/40' />
							<Drawer.Content className='bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0'>
								<div className='p-4 bg-white rounded-t-[10px] flex-1 overflow-auto'>
									<RubricContent
										evaluation={evaluation}
										rubric={rubric}
										handleEvaluationChange={handleEvaluationChange}
										handleVerdict={handleVerdict}
									/>
								</div>
							</Drawer.Content>
						</Drawer.Portal>
					</Drawer.Root>
				</>
			)}
		</div>
	)
}
