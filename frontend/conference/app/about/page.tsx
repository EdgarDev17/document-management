import { Heart, Code, Globe, Users } from 'lucide-react'

export default function About() {
	return (
		<div className='min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto'>
				<h1 className='text-4xl font-bold text-center text-gray-900 mb-8'>
					Sobre Nosotros
				</h1>

				<section className='relative p-[3px] rounded-lg mb-8 overflow-hidden animate-border'>
					<div className='absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient'></div>
					<div className='bg-white rounded-lg p-6 relative z-10'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center'>
							<Users className='mr-2 text-blue-600' />
							Proyecto Estudiantil
						</h2>
						<p className='text-gray-600 mb-4'>
							Este es un proyecto realizado por estudiantes de la Universidad de
							Sonsonate en El Salvador. Nuestro objetivo es demostrar las
							habilidades y conocimientos adquiridos durante nuestra formación
							académica.
						</p>
					</div>
				</section>

				<section className='relative p-[3px] rounded-lg mb-8 overflow-hidden animate-border'>
					<div className='absolute inset-0 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 animate-gradient'></div>
					<div className='bg-white rounded-lg p-6 relative z-10'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center'>
							<Code className='mr-2 text-green-600' />
							Código Abierto
						</h2>
						<p className='text-gray-600 mb-4'>
							Nos enorgullece anunciar que este es un proyecto de código
							abierto. Esto significa que cualquier persona puede acceder,
							copiar y modificar nuestro código para lanzar su propio producto
							basado en este trabajo.
						</p>
					</div>
				</section>

				<section className='relative p-[3px] rounded-lg mb-8 overflow-hidden animate-border'>
					<div className='absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-gradient'></div>
					<div className='bg-white rounded-lg p-6 relative z-10'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center'>
							<Heart className='mr-2 text-red-600' />
							Hecho con Amor
						</h2>
						<p className='text-gray-600 mb-4'>
							Este proyecto ha sido desarrollado con amor y dedicación por un
							equipo de apasionados desarrolladores. Nos hemos enfocado en
							ofrecer la más alta calidad en cada aspecto de nuestro trabajo.
						</p>
					</div>
				</section>

				<section className='relative p-[3px] rounded-lg mb-8 overflow-hidden animate-border'>
					<div className='absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 animate-gradient'></div>
					<div className='bg-white rounded-lg p-6 relative z-10'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center'>
							<Globe className='mr-2 text-purple-600' />
							Impacto Global
						</h2>
						<p className='text-gray-600 mb-4'>
							Aunque somos un equipo pequeño de El Salvador, aspiramos a tener
							un impacto global. Creemos en el poder de la tecnología para
							transformar vidas y comunidades.
						</p>
					</div>
				</section>
			</div>
		</div>
	)
}
