import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import {
	CalendarDays,
	Users,
	BarChart3,
	UserCircle,
	PlusCircle,
	Lightbulb,
	ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

const funFacts = [
	'¿Sabías que los eventos académicos virtuales han aumentado un 200% desde 2020?',
	'Los pósters digitales están reemplazando a los tradicionales en muchas conferencias.',
	'Las conferencias híbridas (presenciales y virtuales) son la tendencia actual en eventos académicos.',
	'El networking sigue siendo la razón #1 por la que los académicos asisten a conferencias.',
	'Los eventos académicos multidisciplinarios están ganando popularidad rápidamente.',
]

const adminTips = [
	'Consejo: Utiliza herramientas de gestión de proyectos para organizar mejor tus eventos.',
	'Consejo: Considera ofrecer opciones de participación remota para aumentar la asistencia.',
	'Consejo: Implementa un sistema de feedback para mejorar continuamente tus eventos.',
	'Consejo: Colabora con otras instituciones para ampliar el alcance de tus eventos.',
	'Consejo: Utiliza las redes sociales para promocionar tus eventos y aumentar el engagement.',
]

const eventTips = [
	'Tip: Programa descansos regulares durante los eventos largos para mantener la atención de los participantes.',
	'Tip: Fomenta la interacción entre participantes con sesiones de networking estructuradas.',
	'Tip: Ofrece contenido pregrabado junto con sesiones en vivo para mayor flexibilidad.',
	'Tip: Utiliza encuestas en tiempo real para mantener a la audiencia comprometida.',
	'Tip: Proporciona resúmenes o infografías de las presentaciones principales para facilitar el aprendizaje.',
]

// Genera un dato aleatorio del día
function getDailyTip() {
	const allTips = [...funFacts, ...adminTips, ...eventTips]
	return allTips[Math.floor(Math.random() * allTips.length)]
}

export default async function DashboardHome() {
	const dailyTip = getDailyTip()

	return (
		<div className='min-h-screen bg-white'>
			<header className='py-8'>
				<div className='container mx-auto px-4'>
					<h1 className='text-4xl font-bold text-gray-800'>
						Bienvenido de nuevo
					</h1>
				</div>
			</header>

			<main className='container mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<Card className='col-span-1 lg:col-span-2 bg-zinc-50'>
						<CardHeader>
							<CardTitle className='flex items-center text-2xl'>
								<Lightbulb className='mr-2 h-6 w-6' />
								Dato del día
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-lg text-gray-700'>{dailyTip}</p>
						</CardContent>
					</Card>

					<Card className='col-span-1 bg-gray-50 shadow-sm'>
						<CardHeader>
							<CardTitle className='text-2xl text-gray-800'>
								Acciones rápidas
							</CardTitle>
						</CardHeader>
						<CardContent className='flex flex-col gap-y-4'>
							<Link href='/host/dashboard/event/create/step-one'>
								<Button className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
									<PlusCircle className='mr-2 h-5 w-5' />
									Crear nuevo evento
								</Button>
							</Link>
							<Link href='/host/dashboard/institutions/add'>
								<Button className='w-full bg-white border-1 border-blue-600 text-zinc-800 hover:bg-blue-50'>
									<PlusCircle className='mr-2 h-5 w-5' />
									Añadir institución
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>

				<section className='mt-12'>
					<h2 className='text-3xl font-semibold text-gray-800 mb-6'>
						Explora tu dashboard
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{[
							{
								href: '/host/dashboard/events',
								icon: CalendarDays,
								text: 'Tus eventos',
								description: 'Gestiona tus eventos creados',
							},
							{
								href: '/host/dashboard/institutions',
								icon: Users,
								text: 'Instituciones',
								description: 'Administra tus instituciones',
							},
							{
								href: '/host/dashboard/analytics',
								icon: BarChart3,
								text: 'Analíticas',
								description: 'Revisa el rendimiento de tus eventos',
							},
							{
								href: '/host/dashboard/profile',
								icon: UserCircle,
								text: 'Tu perfil',
								description: 'Actualiza tu información personal',
							},
						].map((item, index) => (
							<Link key={index} href={item.href}>
								<Card className='h-full hover:shadow-lg transition-shadow duration-300 group border border-gray-200'>
									<CardContent className='flex flex-col items-center justify-center p-6 text-center'>
										<item.icon className='mb-4 h-12 w-12 text-blue-600 group-hover:text-blue-700 transition-colors duration-300' />
										<h3 className='text-xl font-semibold text-gray-800 mb-2'>
											{item.text}
										</h3>
										<p className='text-sm text-gray-600 mb-4'>
											{item.description}
										</p>
										<ArrowRight className='h-6 w-6 text-blue-600 group-hover:translate-x-2 transition-transform duration-300' />
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</section>
			</main>
		</div>
	)
}
