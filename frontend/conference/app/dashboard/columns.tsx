'use client'

import { ColumnDef } from '@tanstack/react-table'

export interface ConferenceDataTable {
	name: string
	organization: string
	date: Date
}

export const conferences: ConferenceDataTable[] = [
	{
		name: 'Cumbre de Innovaciones Tecnológicas',
		organization: 'Mundo Tech Inc.',
		date: new Date('2024-06-01'),
	},
	{
		name: 'Conferencia Global de IA',
		organization: 'Sociedad de IA',
		date: new Date('2024-07-15'),
	},
	{
		name: 'Expo de Desarrollo de Software',
		organization: 'Grupo DevTech',
		date: new Date('2024-08-10'),
	},
	{
		name: 'Foro del Futuro de la Educación en TI',
		organization: 'EduTech',
		date: new Date('2024-09-05'),
	},
	{
		name: 'Conferencia de Diseño de Interfaces',
		organization: 'Alianza UI/UX',
		date: new Date('2024-10-20'),
	},
	{
		name: 'Cumbre de Ciberseguridad',
		organization: 'CiberSeguro',
		date: new Date('2024-11-18'),
	},
	{
		name: 'Congreso Mundial de Robótica',
		organization: 'RoboTech',
		date: new Date('2024-12-02'),
	},
	{
		name: 'Innovaciones en FinTech',
		organization: 'Finanzas Avanzadas',
		date: new Date('2024-05-22'),
	},
	{
		name: 'Expo de Marketing Digital',
		organization: 'Hub de Medios',
		date: new Date('2024-04-15'),
	},
	{
		name: 'Cumbre de Avances en Biotecnología',
		organization: 'Futuro BioTech',
		date: new Date('2024-03-30'),
	},
]

export const conferencesColumns: ColumnDef<ConferenceDataTable>[] = [
	{
		accessorKey: 'name',
		header: 'Nombre',
	},
	{
		accessorKey: 'organization',
		header: 'Organización',
	},
	{
		accessorKey: 'date',
		header: 'Fecha',
		cell: ({ row }) => {
			const formatter = new Intl.DateTimeFormat('es', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
			})
			const formattedDate = formatter.format(row.getValue('date'))

			return (
				<p className='text-left text-neutral-800 font-medium'>
					{formattedDate}
				</p>
			)
		},
	},
]
