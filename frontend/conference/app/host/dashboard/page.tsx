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
		<div className='container mx-auto px-4 py-8 space-y-8'>
			<h1 className='text-4xl font-bold text-zinc-900'>Bienvenido de nuevo</h1>

			<Card className='bg-secondary'>
				<CardHeader>
					<CardTitle className='flex items-center text-2xl text-secondary-foreground'>
						<Lightbulb className='mr-2 h-6 w-6' />
						Dato del día
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-lg text-secondary-foreground'>{dailyTip}</p>
				</CardContent>
			</Card>

			<section className='space-y-4'>
				<h2 className='text-3xl font-semibold text-zinc-900'>Tus opciones</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					<Link
						href={'/host/dashboard/events'}
						className='h-auto py-6 flex flex-col items-center justify-center text-lg border border-gray-100 rounded-lg hover:bg-zinc-100'>
						<CalendarDays className='mb-2 h-8 w-8' />
						<span>Ver tus eventos creados</span>
					</Link>
					<Link
						href={'/host/dashboard/institutions'}
						className='h-auto py-6 flex flex-col items-center justify-center text-lg border border-gray-100 rounded-lg hover:bg-zinc-100'>
						<Users className='mb-2 h-8 w-8' />
						<span>Ver tus instituciones</span>
					</Link>

					<Link
						href={'/host/dashboard/analytics'}
						className='h-auto py-6 flex flex-col items-center justify-center text-lg border border-gray-100 rounded-lg hover:bg-zinc-100'>
						<BarChart3 className='mb-2 h-8 w-8' />
						<span>Ver tus analíticas</span>
					</Link>

					<Link
						href={'/host/dashboard/analytics'}
						className='h-auto py-6 flex flex-col items-center justify-center text-lg border border-gray-100 rounded-lg hover:bg-zinc-100'>
						<UserCircle className='mb-2 h-8 w-8' />
						<span>Ver tu perfil</span>
					</Link>
				</div>
			</section>

			<section className='space-y-4'>
				<h2 className='text-3xl font-semibold text-zinc-900'>Atajos</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center text-xl'>
								<PlusCircle className='mr-2 h-6 w-6' />
								Crear evento
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Link href={'/host/dashboard/event/create/step-one'}>
								<Button className='w-full text-lg py-6'>Nuevo evento</Button>
							</Link>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center text-xl'>
								<PlusCircle className='mr-2 h-6 w-6' />
								Crear institución
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Link href={'/host/dashboard/institutions/add'}>
								<Button className='w-full text-lg py-6'>
									Nueva institución
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	)
}
