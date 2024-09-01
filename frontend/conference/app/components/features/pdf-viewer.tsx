'use client'

import { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Label } from '@/app/components/ui/label'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet'
import { Drawer } from 'vaul'
import { Badge } from '../ui/badge'

interface PDFViewerProps {
	pdfBase64: string
	rubric: {
		_ResponseEvaluationD: {
			_Evalutioncriteria: Array<{
				criterionID: number
				aspect: string
				description: string
			}>
			_Evalutionscale: Array<{
				scaleID: number
				scale: string
				description: string
			}>
		}
	}
}

const RubricContent = ({
	rubric,
	evaluation,
	handleEvaluationChange,
}: {
	rubric: any
	evaluation: any
	handleEvaluationChange: any
}) => (
	<ScrollArea className='h-[80vh] pr-4'>
		<div className='space-y-8 p-1'>
			<h2 className='text-3xl font-bold'>Rúbrica de Evaluación</h2>
			{rubric._ResponseEvaluationD._Evalutioncriteria.map((criterion) => (
				<Card key={criterion.criterionID} className=''>
					<CardHeader>
						<CardTitle className='text-xl font-semibold'>
							{criterion.aspect}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-sm text-muted-foreground mb-4'>
							{criterion.description}
						</p>
						<RadioGroup
							onValueChange={(value) =>
								handleEvaluationChange(criterion.criterionID, parseInt(value))
							}
							value={evaluation[criterion.criterionID]?.toString()}
							className='space-y-3'>
							{rubric._ResponseEvaluationD._Evalutionscale.map(
								(scale, index) => (
									<div
										key={scale.scaleID}
										className='flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted'>
										<RadioGroupItem
											value={scale.scaleID.toString()}
											id={`${criterion.criterionID}-${scale.scaleID}`}
										/>
										<Label
											htmlFor={`${criterion.criterionID}-${scale.scaleID}`}
											className='flex flex-1 items-center justify-between'>
											<span>{scale.description}</span>
											<Badge
												variant={getBadgeVariant(
													index,
													rubric._ResponseEvaluationD._Evalutionscale.length
												)}>
												{scale.scale}
											</Badge>
										</Label>
									</div>
								)
							)}
						</RadioGroup>
					</CardContent>
				</Card>
			))}
		</div>
	</ScrollArea>
)

// Helper function to determine badge variant based on rating
const getBadgeVariant = (index: number, totalScales: number) => {
	if (index === 0) return 'green'
	if (index === totalScales - 1) return 'seconday'
	return 'blue'
}

export function PDFViewer({ pdfBase64, rubric }: PDFViewerProps) {
	const [numPages, setNumPages] = useState<number | null>(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)
	const [pdfReady, setPdfReady] = useState(false)
	const [pageWidth, setPageWidth] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)
	const [evaluation, setEvaluation] = useState<Record<number, number>>({})
	const [isDesktop, setIsDesktop] = useState(true)

	useEffect(() => {
		pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
		setPdfReady(true)

		const handleResize = () => {
			if (containerRef.current) {
				const width = containerRef.current.offsetWidth - 32 // 32px for padding
				setPageWidth(Math.min(width, 800)) // Limit max width to 800px
			}
			setIsDesktop(window.innerWidth >= 1024)
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

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
		? Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0))
		: null

	const handleEvaluationChange = (criterionID: number, scaleID: number) => {
		setEvaluation((prev) => ({ ...prev, [criterionID]: scaleID }))
	}

	return (
		<div className='flex flex-col md:flex-row gap-4'>
			<Card className='w-full'>
				<CardContent className='p-4' ref={containerRef}>
					<div className='flex flex-col items-center'>
						{loading && <p className='text-lg'>Cargando PDF...</p>}
						{error && (
							<p className='text-lg text-red-500'>
								Error al cargar el PDF: {error.message}
							</p>
						)}
						{pdfReady && pdfData && (
							<div className='w-full mx-auto' style={{ minHeight: '600px' }}>
								<Document
									file={{ data: pdfData }}
									onLoadSuccess={onDocumentLoadSuccess}
									onLoadError={onDocumentLoadError}
									className='border border-gray-200 shadow-lg'>
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

			{isDesktop ? (
				<Sheet>
					<SheetTrigger asChild>
						<Button className='w-[200px]'>Mostrar puntos a calificar</Button>
					</SheetTrigger>
					<SheetContent side='right' className='w-[400px] sm:w-[540px]'>
						<RubricContent
							evaluation={evaluation}
							rubric={rubric}
							handleEvaluationChange={handleEvaluationChange}
						/>
					</SheetContent>
				</Sheet>
			) : (
				<Drawer.Root>
					<Drawer.Trigger asChild>
						<Button className='w-full'>Mostrar puntos a calificar</Button>
					</Drawer.Trigger>
					<Drawer.Portal>
						<Drawer.Overlay className='fixed inset-0 bg-black/40' />
						<Drawer.Content className='bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0'>
							<div className='p-4 bg-white rounded-t-[10px] flex-1 overflow-auto'>
								<RubricContent
									evaluation={evaluation}
									rubric={rubric}
									handleEvaluationChange={handleEvaluationChange}
								/>
							</div>
						</Drawer.Content>
					</Drawer.Portal>
				</Drawer.Root>
			)}
		</div>
	)
}
