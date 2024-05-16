'use client'

import { ColumnDef } from '@tanstack/react-table'

export interface Papers {
	name: string
	event: string
}

export const papers: Papers[] = [
	{
		name: 'Explorando la Computación Cuántica',
		event: 'Instituto de Investigación Cuántica',
	},
	{
		name: 'Avances en Aprendizaje Automático',
		event: 'Laboratorio de Innovaciones en IA',
	},
	{
		name: 'Tecnologías de Energía Renovable',
		event: 'Alianza de Energía Verde',
	},
	{
		name: 'Blockchain y Criptomonedas',
		event: 'Soluciones FinTech',
	},
	{
		name: 'El Futuro de la Biotecnología',
		event: 'Corporación BioTech',
	},
]

export const papersColumns: ColumnDef<Papers>[] = [
	{
		accessorKey: 'name',
		header: 'Titulo',
	},
	{
		accessorKey: 'event',
		header: 'Conferencia',
	},
]
