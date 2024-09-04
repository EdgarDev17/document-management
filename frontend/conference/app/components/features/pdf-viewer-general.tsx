'use client'

import { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'

interface PDFViewerProps {
	pdfBase64: string
}

export function PDFViewer({ pdfBase64 }: PDFViewerProps) {
	const [numPages, setNumPages] = useState<number | null>(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)
	const [pdfReady, setPdfReady] = useState(false)
	const [pageWidth, setPageWidth] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
		setPdfReady(true)

		const handleResize = () => {
			if (containerRef.current) {
				const width = containerRef.current.offsetWidth - 32
				setPageWidth(Math.min(width, 800))
			}
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
		? new Uint8Array(
				atob(pdfBase64)
					.split('')
					.map((char) => char.charCodeAt(0))
			)
		: null

	return (
		<div className='w-full h-[calc(100vh-4rem)]'>
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
		</div>
	)
}
