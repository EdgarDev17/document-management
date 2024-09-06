import { Button } from '@/app/components/ui/button'
import { SideBarContainer, SideBarItem } from '@/app/components/ui/sidebar'
import {
	BuildingOffice2Icon,
	CalendarDaysIcon,
	ChartBarIcon,
	HomeIcon,
	UserIcon,
} from '@heroicons/react/24/outline'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<section className='container mx-auto h-[80vh] flex gap-x-4'>
			<div className='hidden sm:block sm:w-[16%] h-full'>
				<SideBarContainer className='flex flex-col justify-between'>
					<div className='h-[50%] flex flex-col justify-around'>
						<SideBarItem url='/host/dashboard/'>
							<div className='w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg'>
								<HomeIcon className='w-6 h-6 text-zinc-700' />
								<p className='text-sm lg:text-base'>Inicio</p>
							</div>
						</SideBarItem>
						<SideBarItem url='/host/dashboard/events'>
							<div className='w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg'>
								<CalendarDaysIcon className='w-6 h-6 text-zinc-700' />
								<p className='text-sm lg:text-base'>Eventos</p>
							</div>
						</SideBarItem>
						<SideBarItem url='/host/dashboard/institutions'>
							<div className='w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg'>
								<BuildingOffice2Icon className='w-6 h-6 text-zinc-700' />
								<p className='text-sm lg:text-base'>Instituciones</p>
							</div>
						</SideBarItem>
						<SideBarItem url='/host/dashboard/analytics'>
							<div className='w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg'>
								<ChartBarIcon className='w-6 h-6 text-zinc-700' />
								<p className='text-sm lg:text-base'>Analíticas</p>
							</div>
						</SideBarItem>
						<SideBarItem url='/host/dashboard/account'>
							<div className='w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg'>
								<UserIcon className='w-6 h-6 text-zinc-700' />
								<p className='text-sm lg:text-base'>Cuenta</p>
							</div>
						</SideBarItem>
					</div>

					<div className='h-[20%] flex justify-center items-center'>
						<SideBarItem url='/'>
							<div className='w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg'>
								<Button
									variant={'ghost'}
									className='hover:bg-transparent hover:text-zinc-800 text-sm lg:text-base'>
									Modo participante
								</Button>
							</div>
						</SideBarItem>
					</div>
				</SideBarContainer>
			</div>
			<div className='w-full sm:w-[84%]'>{children}</div>
		</section>
	)
}
