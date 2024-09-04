import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export function NoAccess() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[60vh]  dark:bg-gray-900'>
			<div className='p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center max-w-md w-full'>
				<ShieldAlert className='w-16 h-16 mx-auto mb-4 text-red-500' />
				<h2 className='text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200'>
					Acceso Denegado
				</h2>
				<p className='text-gray-600 dark:text-gray-400 mb-6'>
					Lo sentimos, no tienes permiso para ver este evento.
				</p>
				<Link href={''}>
					<Button>Volver a la pagina principal</Button>
				</Link>
			</div>
		</div>
	)
}
