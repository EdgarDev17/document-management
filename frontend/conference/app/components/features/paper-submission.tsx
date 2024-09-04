'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import { Label } from '@/app/components/ui/label'
import { AlertCircle, Send, FileUp, X, FileIcon, Trash2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { Progress } from '@/app/components/ui/progress'
import { Badge } from '@/app/components/ui/badge'
import { apiClient } from '@/lib/api-service'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function PaperSubmissionDialog({
	token,
	talkId,
}: {
	token: string
	talkId: number
}) {
	const [isOpen, setIsOpen] = useState(false)
	const [file, setFile] = useState<File | null>(null)
	const [fileBase64, setFileBase64] = useState<string | null>(null)
	const [isUploading, setIsUploading] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(0)
	const [isPublishing, setIsPublishing] = useState(false)
	const router = useRouter()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0]
		if (selectedFile && selectedFile.type === 'application/pdf') {
			setFile(selectedFile)
			convertToBase64(selectedFile)
		} else {
			setFile(null)
			setFileBase64(null)
			toast.error('Por favor, seleccione un archivo PDF válido.')
		}
	}

	const convertToBase64 = (file: File) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			setFileBase64(reader.result as string)
		}
		reader.onerror = (error) => {
			console.error('Error: ', error)
			toast.error('Error al procesar el archivo. Por favor, intente de nuevo.')
		}
	}

	const handleSubmit = async () => {
		if (file && fileBase64) {
			setIsUploading(true)
			try {
				// Simular una carga
				await simulateUpload()

				// Iniciar la publicación real
				setIsPublishing(true)
				const cleanedBase64String = fileBase64.replace(
					'data:application/pdf;base64,',
					''
				)
				const res = await apiClient.post(
					'/document/sendingdocumentsConference',
					{
						nameDocument: file.name,
						topicsID: talkId,
						document: cleanedBase64String,
						documentExtension: file.type.split('/')[1].toUpperCase(),
					},
					{
						headers: {
							'Authorization-Token': token,
						},
					}
				)
				toast.success('Documento enviado exitosamente')
				setIsOpen(false)
			} catch (error) {
				toast.error('Error al intentar enviar el documento, intente de nuevo')
			} finally {
				setIsUploading(false)
				setIsPublishing(false)
				setUploadProgress(0)
				router.refresh()
			}
		}
	}

	const simulateUpload = () => {
		return new Promise<void>((resolve) => {
			let progress = 0
			const interval = setInterval(() => {
				progress += 10
				setUploadProgress(progress)
				if (progress >= 100) {
					clearInterval(interval)
					resolve()
				}
			}, 500)
		})
	}

	const removeFile = () => {
		setFile(null)
		setFileBase64(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => !isUploading && !isPublishing && setIsOpen(open)}>
			<DialogTrigger asChild>
				<Button className='w-full'>
					<Send className='mr-2 h-4 w-4' /> Enviar mi primer paper
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Enviar Paper</DialogTitle>
					<DialogDescription>
						Sube tu paper en formato PDF. Asegúrate de que el documento esté
						completo y bien formateado.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label
							htmlFor='paper'
							className='cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300'>
							<div className='flex flex-col items-center justify-center pt-5 pb-6'>
								<FileUp className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400' />
								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'>Haz clic para subir</span> o
									arrastra y suelta
								</p>
								<p className='text-xs text-gray-500 dark:text-gray-400'>
									PDF (MAX. 10MB)
								</p>
							</div>
							<input
								id='paper'
								type='file'
								accept='.pdf'
								onChange={handleFileChange}
								className='hidden'
								ref={fileInputRef}
								disabled={isUploading || isPublishing}
							/>
						</Label>
					</div>
					{file && (
						<Alert className='bg-secondary'>
							<FileIcon className='h-4 w-4' />
							<AlertTitle className='font-semibold'>
								Archivo seleccionado
							</AlertTitle>
							<AlertDescription>
								<div className='mt-2 space-y-3'>
									<div className='flex items-center space-x-2'>
										<span className='font-medium min-w-[4rem]'>Nombre:</span>
										<span className='truncate flex-1' title={file.name}>
											{file.name}
										</span>
									</div>
									<div className='flex items-center space-x-2'>
										<span className='font-medium min-w-[4rem]'>Tipo:</span>
										<Badge variant='secondary'>
											{file.type.split('/')[1].toUpperCase()}
										</Badge>
									</div>
									<div className='flex items-center space-x-2'>
										<span className='font-medium min-w-[4rem]'>Tamaño:</span>
										<Badge variant='outline'>
											{(file.size / 1024 / 1024).toFixed(2)} MB
										</Badge>
									</div>
								</div>
								<Button
									variant='destructive'
									size='sm'
									onClick={removeFile}
									className='mt-4'
									disabled={isUploading || isPublishing}>
									<Trash2 className='h-4 w-4 mr-2' />
									Eliminar archivo
								</Button>
							</AlertDescription>
						</Alert>
					)}
					{(isUploading || isPublishing) && (
						<div className='space-y-2'>
							<Progress value={uploadProgress} className='w-full' />
							<p className='text-sm text-muted-foreground'>
								{isUploading ? `Subiendo: ${uploadProgress}%` : 'Publicando...'}
							</p>
						</div>
					)}
				</div>
				<DialogFooter>
					<Button
						type='submit'
						onClick={handleSubmit}
						disabled={!file || isUploading || isPublishing}>
						{isUploading
							? 'Subiendo...'
							: isPublishing
								? 'Publicando...'
								: 'Enviar Paper'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
