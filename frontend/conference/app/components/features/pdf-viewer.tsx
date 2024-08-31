'use client'

import { useState, useEffect } from 'react'
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

	useEffect(() => {
		pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
		setPdfReady(true)
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

	// Convertir base64 a Uint8Array
	const pdfData = pdfBase64
		? Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0))
		: null

	return (
		<Card className='w-full max-w-3xl mx-auto'>
			<CardContent className='p-6'>
				<div className='flex flex-col items-center'>
					{loading && <p className='text-lg'>Cargando PDF...</p>}
					{error && (
						<p className='text-lg text-red-500'>
							Error al cargar el PDF: {error.message}
						</p>
					)}
					{pdfReady && pdfData && (
						<div className='w-full max-w-2xl mx-auto'>
							<Document
								file={{ data: pdfData }}
								onLoadSuccess={onDocumentLoadSuccess}
								onLoadError={onDocumentLoadError}
								className='border border-gray-200 shadow-lg'>
								<Page
									pageNumber={pageNumber}
									width={600}
									renderTextLayer={false}
									renderAnnotationLayer={false}
								/>
							</Document>
						</div>
					)}
					{numPages && (
						<div className='mt-4 flex items-center justify-between w-full max-w-2xl'>
							<Button onClick={goToPrevPage} disabled={pageNumber <= 1}>
								<ChevronLeftIcon className='h-4 w-4 mr-2' />
								Anterior
							</Button>
							<p className='text-sm'>
								Página {pageNumber} de {numPages}
							</p>
							<Button onClick={goToNextPage} disabled={pageNumber >= numPages}>
								Siguiente
								<ChevronRightIcon className='h-4 w-4 ml-2' />
							</Button>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
