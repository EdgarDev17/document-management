'use client'

import { useState, useEffect } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/app/components/ui/table'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { Button } from '@/app/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

interface Conference {
	conferenceID: number
	conference_name: string
	conference_type: string
	beggingDate: string
	finishDate: string
	status: number
	totalCupos: number | null
	totalRegistrados: number | null
	rolID: number
}

export function ConferenceTable({
	conferences,
}: {
	conferences: Conference[]
}) {
	const [filteredConferences, setFilteredConferences] = useState<Conference[]>(
		[]
	)

	useEffect(() => {
		const filtered = conferences.filter((conference) => conference.rolID === 1)
		setFilteredConferences(filtered)
	}, [conferences])

	return (
		<div className='rounded-md border'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nombre de la Conferencia</TableHead>
						<TableHead>Tipo</TableHead>
						<TableHead>Fecha de Inicio</TableHead>
						<TableHead>Fecha de Fin</TableHead>
						<TableHead>Estado</TableHead>
						<TableHead>Cupos Totales</TableHead>
						<TableHead>Registrados</TableHead>
						<TableHead className='text-right'>Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredConferences.map((conference) => (
						<TableRow key={conference.conferenceID}>
							<TableCell className='font-medium'>
								{conference.conference_name}
							</TableCell>
							<TableCell>{conference.conference_type}</TableCell>
							<TableCell>
								{new Date(conference.beggingDate).toLocaleDateString()}
							</TableCell>
							<TableCell>
								{new Date(conference.finishDate).toLocaleDateString()}
							</TableCell>
							<TableCell>
								{conference.status === 0 ? 'Inactivo' : 'Activo'}
							</TableCell>
							<TableCell>{conference.totalCupos ?? 'N/A'}</TableCell>
							<TableCell>{conference.totalRegistrados ?? 'N/A'}</TableCell>
							<TableCell className='text-right'>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant='ghost' className='h-8 w-8 p-0'>
											<span className='sr-only'>Abrir menú</span>
											<MoreHorizontal className='h-4 w-4' />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end'>
										<DropdownMenuLabel>Acciones</DropdownMenuLabel>
										<DropdownMenuItem>Ver detalles</DropdownMenuItem>
										<DropdownMenuItem>Editar conferencia</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>Eliminar conferencia</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
