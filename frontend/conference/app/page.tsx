'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useScroll } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import {
	Calendar,
	Users,
	BarChart,
	Menu,
	X,
	Search,
	Star,
	Clock,
	User,
} from 'lucide-react'

const NavItem = ({
	href,
	children,
}: {
	href: string
	children: React.ReactNode
}) => (
	<Link
		href={href}
		className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'>
		{children}
	</Link>
)

const FeatureCard = ({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode
	title: string
	description: string
}) => (
	<motion.div
		className='flex flex-col items-start space-y-2 p-6 bg-white rounded-lg shadow-lg'
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		viewport={{ once: true }}>
		<div className='p-2 bg-blue-100 rounded-full text-blue-600'>{icon}</div>
		<h3 className='text-xl font-bold text-gray-900'>{title}</h3>
		<p className='text-gray-600'>{description}</p>
	</motion.div>
)

export default function LandingPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { scrollYProgress } = useScroll()
	const controls = useAnimation()

	useEffect(() => {
		controls.start({ opacity: 1, y: 0 })
	}, [controls])

	return (
		<div className='min-h-screen bg-gray-50 text-gray-900'>
			<main>
				<section className='h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-100 to-white'>
					<motion.div
						className='text-center z-10'
						initial={{ opacity: 0, y: 20 }}
						animate={controls}>
						<motion.h1
							className='text-5xl md:text-7xl font-bold mb-6 text-gray-900'
							animate={{ opacity: [0, 1], y: [20, 0] }}
							transition={{ duration: 0.8, delay: 0.2 }}>
							Revoluciona tus eventos
						</motion.h1>
						<motion.p
							className='text-xl md:text-2xl text-gray-600 mb-8'
							animate={{ opacity: [0, 1], y: [20, 0] }}
							transition={{ duration: 0.8, delay: 0.4 }}>
							Crea, gestiona y descubre experiencias extraordinarias
						</motion.p>
						<div className='flex gap-x-4 justify-center'>
							<motion.div
								className='space-x-4'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<Link href={'/account/login?rol=admin'}>
									<Button size='lg' variant='secondary' className='text-lg'>
										<User className='mr-2 h-5 w-5' /> Soy organizador
									</Button>
								</Link>
							</motion.div>
							<motion.div
								className='space-x-4'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<Link href={'/account/login?rol=general'}>
									<Button
										size='lg'
										variant='outline'
										className='bg-white text-blue-600 hover:bg-purple-100 text-lg'>
										<Search className='mr-2 h-5 w-5' /> Explorar eventos
									</Button>
								</Link>
							</motion.div>
						</div>
					</motion.div>
					<motion.div
						className='absolute inset-0 z-0'
						style={{
							background:
								'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(255,255,255,0) 70%)',
						}}
						animate={{
							scale: [1, 1.1, 1],
							opacity: [0.5, 0.8, 0.5],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					/>
				</section>

				<section id='features' className='py-20 bg-white'>
					<div className='container mx-auto px-4'>
						<h2 className='text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900'>
							Características principales
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							<FeatureCard
								icon={<Calendar className='w-6 h-6' />}
								title='Gestión de eventos'
								description='Crea y administra eventos de forma sencilla e intuitiva.'
							/>
							<FeatureCard
								icon={<Users className='w-6 h-6' />}
								title='Networking'
								description='Conecta con otros profesionales y expande tu red.'
							/>
							<FeatureCard
								icon={<BarChart className='w-6 h-6' />}
								title='Análisis avanzado'
								description='Obtén insights valiosos sobre el rendimiento de tus eventos.'
							/>
						</div>
					</div>
				</section>

				<section id='organizers' className='py-20 bg-gray-100'>
					<div className='container mx-auto px-4'>
						<h2 className='text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900'>
							Para Organizadores
						</h2>
						<div className='grid gap-6 lg:grid-cols-3'>
							<motion.div
								className='bg-white p-6 rounded-lg shadow-lg'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								viewport={{ once: true }}>
								<Calendar className='w-12 h-12 mb-4 text-blue-600' />
								<h3 className='text-xl font-bold mb-2'>Crea Eventos</h3>
								<p className='text-gray-600'>
									Diseña y personaliza tus eventos con facilidad usando nuestras
									herramientas intuitivas.
								</p>

								<div className='w-full h-[300px] relative'>
									<Image
										src={'/host-1.png'}
										alt={'caracteristica para gestores de eventos'}
										fill
										className='object-contain w-full'
									/>
								</div>
							</motion.div>
							<motion.div
								className='bg-white p-6 rounded-lg shadow-lg'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								viewport={{ once: true }}>
								<Users className='w-12 h-12 mb-4 text-blue-600' />
								<h3 className='text-xl font-bold mb-2'>Gestiona Asistentes</h3>
								<p className='text-gray-600'>
									Administra registros, envía comunicaciones y controla el
									acceso de manera eficiente.
								</p>

								<div className='w-full h-[300px] relative'>
									<Image
										src={'/host-2.png'}
										alt={'caracteristica para gestores de eventos'}
										fill
										className='object-contain w-full'
									/>
								</div>
							</motion.div>
							<motion.div
								className='bg-white p-6 rounded-lg shadow-lg'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								viewport={{ once: true }}>
								<BarChart className='w-12 h-12 mb-4 text-blue-600' />
								<h3 className='text-xl font-bold mb-2'>
									Analiza el Rendimiento
								</h3>
								<p className='text-gray-600'>
									Obtén estadísticas detalladas y insights para mejorar tus
									futuros eventos.
								</p>
								<div className='w-full h-[300px] relative'>
									<Image
										src={'/host-3.png'}
										alt={'caracteristica para gestores de eventos'}
										fill
										className='object-contain w-full'
									/>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				<section id='attendees' className='py-20 bg-white'>
					<div className='container mx-auto px-4'>
						<h2 className='text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900'>
							Para Asistentes
						</h2>
						<div className='grid gap-6 lg:grid-cols-3'>
							<motion.div
								className='bg-gray-100 p-6 rounded-lg shadow-lg'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								viewport={{ once: true }}>
								<Search className='w-12 h-12 mb-4 text-blue-600' />
								<h3 className='text-xl font-bold mb-2'>Descubre Eventos</h3>
								<p className='text-gray-600'>
									Explora una amplia gama de eventos y encuentra experiencias
									que se ajusten a tus intereses.
								</p>
								<div className='w-full h-[300px] relative'>
									<Image
										src={'/user-1.png'}
										alt={'caracteristica para gestores de eventos'}
										fill
										className='object-contain w-full'
									/>
								</div>
							</motion.div>
							<motion.div
								className='bg-gray-100 p-6 rounded-lg shadow-lg'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								viewport={{ once: true }}>
								<Star className='w-12 h-12 mb-4 text-blue-600' />
								<h3 className='text-xl font-bold mb-2'>
									Participa Activamente
								</h3>
								<p className='text-gray-600'>
									Interactúa con otros asistentes, haz preguntas y participa en
									encuestas en tiempo real.
								</p>
								<div className='w-full h-[300px] relative'>
									<Image
										src={'/user-2.png'}
										alt={'caracteristica para gestores de eventos'}
										fill
										className='object-contain w-full'
									/>
								</div>
							</motion.div>
							<motion.div
								className='bg-gray-100 p-6 rounded-lg shadow-lg'
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								viewport={{ once: true }}>
								<Clock className='w-12 h-12 mb-4 text-blue-600' />
								<h3 className='text-xl font-bold mb-2'>Gestiona tu Agenda</h3>
								<p className='text-gray-600'>
									Organiza tu calendario de eventos, recibe recordatorios y
									accede a materiales exclusivos.
								</p>
								<div className='w-full h-[300px] relative'>
									<Image
										src={'/user-3.png'}
										alt={'caracteristica para gestores de eventos'}
										fill
										className='object-contain w-full'
									/>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				<section className='py-20 bg-blue-600 text-white h-[600px] flex justify-center items-center'>
					<div className='container mx-auto px-4 text-center'>
						<h2 className='text-3xl md:text-5xl font-bold mb-6'>
							¿Listo para revolucionar tus eventos?
						</h2>
						<p className='text-xl mb-8'>
							Únete a EventMaster hoy y lleva tus experiencias al siguiente
							nivel.
						</p>
						<div className='flex gap-x-4 justify-center'>
							<motion.div
								className='space-x-4'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<Link href={'/account/login?rol=admin'}>
									<Button size='lg' variant='secondary' className='text-lg'>
										<User className='mr-2 h-5 w-5' /> Soy organizador
									</Button>
								</Link>
							</motion.div>
							<motion.div
								className='space-x-4'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<Link href={'/account/login?rol=general'}>
									<Button
										size='lg'
										variant='outline'
										className='bg-white text-blue-600 hover:bg-purple-100 text-lg'>
										<Search className='mr-2 h-5 w-5' /> Explorar eventos
									</Button>
								</Link>
							</motion.div>
						</div>
					</div>
				</section>
			</main>

			<footer className='bg-gray-100 py-12'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						<div>
							<h3 className='text-xl font-bold mb-4 text-gray-900'>
								EventMaster
							</h3>
							<p className='text-gray-600'>
								Revolucionando la gestión de eventos
							</p>
						</div>
						<div>
							<h4 className='text-lg font-semibold mb-4 text-gray-900'>
								Enlaces rápidos
							</h4>
							<ul className='space-y-2'>
								<li>
									<Link href='#' className='text-gray-600 hover:text-gray-900'>
										Inicio
									</Link>
								</li>
								<li>
									<Link
										href='#features'
										className='text-gray-600 hover:text-gray-900'>
										Características
									</Link>
								</li>
								<li>
									<Link
										href='#organizers'
										className='text-gray-600 hover:text-gray-900'>
										Para organizadores
									</Link>
								</li>
								<li>
									<Link
										href='#attendees'
										className='text-gray-600 hover:text-gray-900'>
										Para asistentes
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className='text-lg font-semibold mb-4 text-gray-900'>
								Legal
							</h4>
							<ul className='space-y-2'>
								<li>
									<Link href='#' className='text-gray-600 hover:text-gray-900'>
										Términos de servicio
									</Link>
								</li>
								<li>
									<Link href='#' className='text-gray-600 hover:text-gray-900'>
										Política de privacidad
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className='text-lg font-semibold mb-4 text-gray-900'>
								Síguenos
							</h4>
							<div className='flex space-x-4'>
								<a href='#' className='text-gray-600 hover:text-gray-900'>
									<svg
										className='w-6 h-6'
										fill='currentColor'
										viewBox='0 0 24 24'
										aria-hidden='true'>
										<path
											fillRule='evenodd'
											d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
											clipRule='evenodd'
										/>
									</svg>
								</a>
								<a href='#' className='text-gray-600 hover:text-gray-900'>
									<svg
										className='w-6 h-6'
										fill='currentColor'
										viewBox='0 0 24 24'
										aria-hidden='true'>
										<path
											fillRule='evenodd'
											d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
											clipRule='evenodd'
										/>
									</svg>
								</a>
								<a href='#' className='text-gray-600 hover:text-gray-900'>
									<svg
										className='w-6 h-6'
										fill='currentColor'
										viewBox='0 0 24 24'
										aria-hidden='true'>
										<path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
									</svg>
								</a>
							</div>
						</div>
					</div>
					<div className='mt-8 border-t border-gray-200 pt-8 text-center'>
						<p className='text-sm text-gray-600'>
							© 2023 EventMaster. Todos los derechos reservados.
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
