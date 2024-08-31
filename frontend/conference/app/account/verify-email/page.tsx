import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function WelcomePage() {
	return (
		<div className='w-full min-h-[90vh] bg-white flex items-center justify-center p-4 relative overflow-hidden'>
			{/* Fondo de cuadrícula sutil */}
			<div
				className='absolute inset-0 z-0'
				style={{
					backgroundImage: `
          linear-gradient(to right, #f0f0f0 1px, transparent 1px),
          linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
        `,
					backgroundSize: '20px 20px',
				}}
			/>

			<Card className='w-full max-w-2xl shadow-lg relative z-10 bg-white'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-3xl font-bold text-center text-gray-800'>
						¡Bienvenido a nuestro sitio web!
					</CardTitle>
					<CardDescription className='text-center text-lg text-gray-600'>
						Estamos emocionados de tenerte aquí
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex justify-center'>
						<div className='relative'>
							<svg
								className='w-40 h-40 text-blue-500'
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'>
								<path d='M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5' />
								<path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
								<path d='M20 14v4' />
								<path d='M20 22v.01' />
							</svg>
							<CheckCircle className='absolute bottom-0 right-0 w-10 h-10 text-green-500 bg-white rounded-full' />
						</div>
					</div>
					<p className='text-center text-gray-600 text-lg'>
						Para continuar, por favor verifica tu dirección de correo
						electrónico. Hemos enviado un enlace de verificación a tu bandeja de
						entrada.
					</p>
					<div className='flex justify-center space-x-4 text-sm text-gray-500'>
						<span className='flex items-center'>
							<CheckCircle className='w-4 h-4 mr-1 text-green-500' /> Seguro
						</span>
						<span className='flex items-center'>
							<CheckCircle className='w-4 h-4 mr-1 text-green-500' /> Rápido
						</span>
						<span className='flex items-center'>
							<CheckCircle className='w-4 h-4 mr-1 text-green-500' /> Fácil
						</span>
					</div>
				</CardContent>
				<CardFooter className='flex justify-center items-center'>
					<Link href={'/'} className='w-full'>
						<Button className='w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105'>
							<Mail className='mr-2 h-5 w-5' /> Verificar email
							<ArrowRight className='ml-2 h-5 w-5' />
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	)
}
