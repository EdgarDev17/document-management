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
} from '@heroicons/react/24/outline'

export default function PaginaDocumentos() {
	// Estos datos normalmente vendrían de una API o base de datos
	const datosResumen = {
		totalDocumentos: 12,
		documentosAceptados: 5,
		enRevision: 6,
		documentosRechazados: 1,
	}

	const listaDocumentos = [
		{
			id: 1,
			titulo: 'Aprendizaje Automático en Educación',
			evento: 'Conferencia EdTech 2024',
			estado: 'Aceptado',
			fechaEnvio: '15-11-2023',
		},
		{
			id: 2,
			titulo: 'El Futuro del Aprendizaje en Línea',
			evento: 'Cumbre de Educación Digital',
			estado: 'En Revisión',
			fechaEnvio: '01-12-2023',
		},
		{
			id: 3,
			titulo: 'Blockchain en Credenciales Académicas',
			evento: 'Simposio de Blockchain en Educación',
			estado: 'Rechazado',
			fechaEnvio: '20-10-2023',
		},
		{
			id: 4,
			titulo: 'Métodos de Investigación Asistidos por IA',
			evento: 'Conferencia de IA en Academia',
			estado: 'En Revisión',
			fechaEnvio: '10-12-2023',
		},
		{
			id: 5,
			titulo: 'Realidad Virtual en el Aula',
			evento: 'Foro de Innovación EdTech',
			estado: 'Aceptado',
			fechaEnvio: '25-11-2023',
		},
	]

	const obtenerEtiquetaEstado = (estado: string) => {
		switch (estado) {
			case 'Aceptado':
				return <Badge className='bg-green-500'>Aceptado</Badge>
			case 'En Revisión':
				return <Badge className='bg-yellow-500'>En Revisión</Badge>
			case 'Rechazado':
				return <Badge className='bg-red-500'>Rechazado</Badge>
			default:
				return <Badge>{estado}</Badge>
		}
	}

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
						<div className='text-2xl font-bold'>
							{datosResumen.totalDocumentos}
						</div>
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
						<div className='text-2xl font-bold'>
							{datosResumen.documentosAceptados}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>En Revisión</CardTitle>
						<ClockIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{datosResumen.enRevision}</div>
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
						<div className='text-2xl font-bold'>
							{datosResumen.documentosRechazados}
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className='mt-8'>
				<CardHeader>
					<CardTitle>Documentos Enviados</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Título</TableHead>
								<TableHead>Evento</TableHead>
								<TableHead>Estado</TableHead>
								<TableHead>Fecha de Envío</TableHead>
								<TableHead>Acciones</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{listaDocumentos.map((documento) => (
								<TableRow key={documento.id}>
									<TableCell className='font-medium'>
										{documento.titulo}
									</TableCell>
									<TableCell>{documento.evento}</TableCell>
									<TableCell>
										{obtenerEtiquetaEstado(documento.estado)}
									</TableCell>
									<TableCell>{documento.fechaEnvio}</TableCell>
									<TableCell>
										<Button variant='outline' size='sm'>
											Ver Detalles
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
