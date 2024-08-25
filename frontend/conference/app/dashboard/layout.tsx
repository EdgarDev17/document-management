import { Button } from "@/app/components/ui/button";
import { SideBarContainer, SideBarItem } from "@/app/components/ui/sidebar";
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-[80vh] flex gap-x-4">
      <div className="md:w-[16%] h-full hidden md:block">
        <SideBarContainer className="hidden md:flex md:flex-col md:justify-between">
          <div className="h-[50%]  flex flex-col justify-around">
            <SideBarItem url="/dashboard/">
              <div className="w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg">
                <HomeIcon className="w-6 h-6 text-zinc-700" />
                <p>Inicio</p>
              </div>
            </SideBarItem>
            <SideBarItem url="/dashboard/events">
              <div className="w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg">
                <CalendarDaysIcon className="w-6 h-6 text-zinc-700" />
                <p>Eventos</p>
              </div>
            </SideBarItem>
            <SideBarItem url="/host/dashboard/institutions">
              <div className="w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg">
                <DocumentDuplicateIcon className="w-6 h-6 text-zinc-700" />
                <p>Documentos</p>
              </div>
            </SideBarItem>
            <SideBarItem url="/host/dashboard/analytics">
              <div className="w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg">
                <ChartBarIcon className="w-6 h-6 text-zinc-700" />
                <p>Diplomas</p>
              </div>
            </SideBarItem>
            <SideBarItem url="/dashboard/account/">
              <div className="w-full flex justify-start items-center gap-x-4 p-3 hover:bg-accent rounded-lg">
                <UserIcon className="w-6 h-6 text-zinc-700" />
                <p>Cuenta</p>
              </div>
            </SideBarItem>
          </div>

          <div className="h-[20%] flex items-center mx-auto">
            <SideBarItem url="/host/dashboard/">
              <p className="p-3 hover:bg-zinc-200 rounded-lg">
                Ir al modo organizador
              </p>
            </SideBarItem>
          </div>
        </SideBarContainer>
      </div>
      <div className="w-full md:w-[84%]">{children}</div>
    </section>
  );
}
