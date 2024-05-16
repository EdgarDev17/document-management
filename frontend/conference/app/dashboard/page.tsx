'use client'

import { Button } from '../components/ui/button'
import { H2 } from '../components/ui/headings'
import { P } from '../components/ui/text'

import { DataTable } from './data-table'
import { DataTable as PaperDataTable } from './data-table-papers'

import { conferences, conferencesColumns } from './columns'
import { papers, papersColumns } from './columns-papers'

export default function Dashboard() {
	return (
		<div className='w-full h-full'>
			<div className='py-4'>
				<Button>Unirse a una conferencia</Button>
			</div>
			<div className='flex flex-col gap-y-4 sm:gap-x-8 sm:flex-row'>
				<div className='pt-12 w-full sm:w-[60%] rounded-lg flex flex-col gap-y-9'>
					<div>
						<H2>Conferencias a las que estas suscrito</H2>
						<P>
							Acá se muestra la lista de las conferencias en las que estás
							participando.
						</P>
					</div>
					<DataTable columns={conferencesColumns} data={conferences} />
				</div>

				<div className='pt-12 w-full sm:w-[40%] rounded-lg flex flex-col gap-y-9'>
					<div>
						<H2>Documentos Enviados</H2>
						<P>Acá se muestra la lista de los documentos que has enviado</P>
					</div>
					<PaperDataTable columns={papersColumns} data={papers} />
				</div>
			</div>
		</div>
	)
}
