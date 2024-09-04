import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/app/components/ui/table'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import {
	DocumentIcon,
	DocumentCheckIcon,
	ClockIcon,
	ExclamationCircleIcon,
	DocumentPlusIcon,
} from '@heroicons/react/24/outline'
import { apiClient } from '@/lib/api-service'
import { auth } from '@/auth'
import { NoAuth } from '@/app/components/common/noauth'
import Link from 'next/link'

interface Paper {
	documentID: number
	name: string
	review: number
	regDate: string
	userID: number
	topicsID: number
	url: string
	fileName: string
	status: string
	documentBase: string
}

async function getCurrentUserPapers(
	userId: number,
	token: string
): Promise<Paper[]> {
	try {
		const res = await apiClient.get(
			`/document/getdocumentsByUser?UserID=${userId}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)
		console.log(res.data.document[0])
		return res.data.document
	} catch (error) {
		console.error('Error fetching papers:', error)
		return []
	}
}

function obtenerEtiquetaEstado(estado: string) {
	switch (estado) {
		case 'Aceptado':
			return <Badge className='bg-green-500'>Aceptado</Badge>
		case 'En Revisión':
			return <Badge className='bg-yellow-500'>En Revisión</Badge>
		case 'Rechazado':
			return <Badge className='bg-red-500'>Rechazado</Badge>
		case 'Pendiente':
			return <Badge className='bg-blue-500'>Pendiente</Badge>
		default:
			return <Badge>{estado}</Badge>
	}
}

export default async function Page() {
	const session = await auth()

	if (!session) {
		return <NoAuth />
	}

	const papers = await getCurrentUserPapers(
		parseInt(session.userId),
		session.accessToken
	)
	const totalDocumentos = papers.length
	const documentosAceptados = papers.filter(
		(paper) => paper.status === 'Aprobado'
	).length
	const documentosEnRevision = papers.filter(
		(paper) => paper.status === 'Pendiente'
	).length
	const documentosRechazados = papers.filter(
		(paper) => paper.status === 'Rechazado'
	).length

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8'>Mis Documentos</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Total Documentos
						</CardTitle>
						<DocumentIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{totalDocumentos}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Documentos Aceptados
						</CardTitle>
						<DocumentCheckIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{documentosAceptados}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>En Revisión</CardTitle>
						<ClockIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{documentosEnRevision}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Documentos Rechazados
						</CardTitle>
						<ExclamationCircleIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{documentosRechazados}</div>
					</CardContent>
				</Card>
			</div>

			{papers.length === 0 ? (
				<Card className='mt-8'>
					<CardContent className='flex flex-col items-center justify-center py-12'>
						<DocumentPlusIcon className='h-24 w-24 text-gray-400 mb-4' />
						<h2 className='text-2xl font-semibold text-gray-700 mb-2'>
							No has enviado documentos aún
						</h2>
						<p className='text-gray-500 mb-4 text-center'>
							Cuando subas documentos, aparecerán aquí para su revisión y
							seguimiento.
						</p>
					</CardContent>
				</Card>
			) : (
				<Card className='mt-8'>
					<CardHeader>
						<CardTitle>Documentos Enviados</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Título</TableHead>
									<TableHead>Estado</TableHead>
									<TableHead>Fecha de Envío</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{papers.map((paper) => (
									<TableRow key={paper.documentID}>
										<TableCell className='font-medium'>{paper.name}</TableCell>
										<TableCell>{obtenerEtiquetaEstado(paper.status)}</TableCell>
										<TableCell>
											{new Date(paper.regDate).toLocaleDateString()}
										</TableCell>
										<TableCell>
											<Link href={`/documents/general/${paper.documentID}`}>
												<Button variant='outline' size='sm'>
													Ver Detalles
												</Button>
											</Link>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
