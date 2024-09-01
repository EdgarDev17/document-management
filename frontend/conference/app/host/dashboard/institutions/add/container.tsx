'use client'

import React from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { DataTable } from './data-table'
import { columns, InstitutionDetails } from './columns'
import axios from 'axios'
import {
	Dialog,
	DialogTrigger,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { AddInstitution } from '@/app/components/form/add-institution'

function Container({ userId, token }: { userId: string; token: string }) {
	const [loading, setLoading] = React.useState(true)
	const [institutions, setInstitutions] = React.useState<
		InstitutionDetails[] | null
	>(null)
	const [institutionModal, setInstitutionModal] = React.useState<boolean>(false)

  const handleCreatingInstitution = async (state: boolean) => {
    setInstitutionModal(state);
  };
  React.useEffect(() => {
    axios("http://localhost:5110/api/Institutions", {
      headers: {
        "Authorization-Token": token,
      },
    })
      .then((response) => {
        setInstitutions(response.data);
        setLoading(false);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [institutionModal, token]);

	return (
		<div className={'flex flex-col gap-y-16 py-8'}>
			<div className='flex justify-between'>
				<Card className={'w-full max-w-[400px]'}>
					<CardHeader className={'bg-tertiary'}>
						<CardTitle className={'text-white font-bold'}>
							Instituciones creadas
						</CardTitle>
					</CardHeader>
					<CardContent className={'py-6 flex justify-center'}>
						{loading ? (
							<p>Cargando...</p>
						) : (
							<p className={'text-4xl font-bold'}>
								{institutions ? institutions?.length : '0'}
							</p>
						)}
					</CardContent>
				</Card>
				<Dialog open={institutionModal} onOpenChange={setInstitutionModal}>
					<DialogTrigger asChild>
						<Button variant='default' className={'text-sm'}>
							Crear Institución
						</Button>
					</DialogTrigger>
					<DialogContent className='max-w-[700px]'>
						<DialogHeader>
							<DialogTitle>Añadir nueva institución</DialogTitle>
							<DialogDescription>
								Si la institucion no aparece en la lista, puedes crearla aqui
							</DialogDescription>
						</DialogHeader>
						<div className=''>
							<AddInstitution
								token={token}
								userId={userId}
								isInstitutionLoading={handleCreatingInstitution}
							/>
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<div>
				{loading ? (
					<p>Cargando...</p>
				) : (
					<DataTable
						columns={columns}
						data={institutions ? institutions : []}
					/>
				)}
			</div>
		</div>
	)
}

export { Container }
