'use client'

import * as React from 'react'
import Link from 'next/link'
import {
	Menu,
	X,
	User,
	FileText,
	BarChart2,
	Users,
	Calendar,
	Info,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/app/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/app/components/ui/navigation-menu'

export default function Navbar() {
	return (
		<header className='bg-background border-b'>
			<div className='container mx-auto px-4'>
				<nav className='flex items-center justify-between py-4'>
					<Link href='/' className='text-2xl font-bold'>
						EventMaster
					</Link>
					<DesktopNav />
					<MobileNav />
				</nav>
			</div>
		</header>
	)
}

function DesktopNav() {
	return (
		<NavigationMenu className='hidden md:flex'>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Organizadores</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
							<li className='row-span-3'>
								<NavigationMenuLink asChild>
									<a
										className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
										href='/'>
										<Users className='h-6 w-6' />
										<div className='mb-2 mt-4 text-lg font-medium'>
											Organizadores
										</div>
										<p className='text-sm leading-tight text-muted-foreground'>
											Gestiona tus conferencias e instituciones
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							<ListItem
								href='/host/dashboard/events'
								title='Ver mis conferencias'>
								<Calendar className='h-4 w-4 mr-2' />
								Gestiona tus eventos
							</ListItem>
							<ListItem
								href='/host/dashboard/institutions'
								title='Ver mis instituciones'>
								<Users className='h-4 w-4 mr-2' />
								Administra tus organizaciones
							</ListItem>
							<ListItem href='/host/dashboard/analytics' title='Ver analíticas'>
								<BarChart2 className='h-4 w-4 mr-2' />
								Analiza el rendimiento
							</ListItem>
							<ListItem href='/host/dashboard/account' title='Mi perfil'>
								<User className='h-4 w-4 mr-2' />
								Gestiona tu cuenta
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Personas</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
							<li className='row-span-3'>
								<NavigationMenuLink asChild>
									<a
										className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
										href='/'>
										<User className='h-6 w-6' />
										<div className='mb-2 mt-4 text-lg font-medium'>
											Personas
										</div>
										<p className='text-sm leading-tight text-muted-foreground'>
											Gestiona tus conferencias y documentos
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							<ListItem href='/dashboard/events' title='Ver mis conferencias'>
								<Calendar className='h-4 w-4 mr-2' />
								Explora tus eventos
							</ListItem>
							<ListItem href='/dashboard/papers' title='Ver mis documentos'>
								<FileText className='h-4 w-4 mr-2' />
								Accede a tus archivos
							</ListItem>
							<ListItem href='/personas/analiticas' title='Ver analíticas'>
								<BarChart2 className='h-4 w-4 mr-2' />
								Revisa tus estadísticas (muy pronto...)
							</ListItem>
							<ListItem href='/dashboard/account' title='Mi perfil'>
								<User className='h-4 w-4 mr-2' />
								Actualiza tu información
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href='/about' legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<Info className='h-4 w-4 mr-2' />
							Acerca de nosotros
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline' size='icon' className='md:hidden'>
					<Menu className='h-6 w-6' />
					<span className='sr-only'>Abrir menú</span>
				</Button>
			</SheetTrigger>
			<SheetContent side='right' className='w-[300px] sm:w-[400px]'>
				<nav className='flex flex-col gap-4'>
					<h2 className='text-lg font-semibold mb-2'>Organizadores</h2>
					<Link
						href='/organizadores/conferencias'
						className='flex items-center gap-2'>
						<Calendar className='h-4 w-4' />
						Ver mis conferencias
					</Link>
					<Link
						href='/organizadores/instituciones'
						className='flex items-center gap-2'>
						<Users className='h-4 w-4' />
						Ver mis instituciones
					</Link>
					<Link
						href='/organizadores/analiticas'
						className='flex items-center gap-2'>
						<BarChart2 className='h-4 w-4' />
						Ver analíticas
					</Link>
					<Link
						href='/organizadores/perfil'
						className='flex items-center gap-2'>
						<User className='h-4 w-4' />
						Mi perfil
					</Link>

					<h2 className='text-lg font-semibold mt-4 mb-2'>Personas</h2>
					<Link
						href='/personas/conferencias'
						className='flex items-center gap-2'>
						<Calendar className='h-4 w-4' />
						Ver mis conferencias
					</Link>
					<Link href='/personas/documentos' className='flex items-center gap-2'>
						<FileText className='h-4 w-4' />
						Ver mis documentos
					</Link>
					<Link href='/personas/analiticas' className='flex items-center gap-2'>
						<BarChart2 className='h-4 w-4' />
						Ver analíticas
					</Link>
					<Link href='/personas/perfil' className='flex items-center gap-2'>
						<User className='h-4 w-4' />
						Mi perfil
					</Link>

					<Link href='/acerca' className='flex items-center gap-2 mt-4'>
						<Info className='h-4 w-4' />
						Acerca de nosotros
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}>
					<div className='text-sm font-medium leading-none'>{title}</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'
