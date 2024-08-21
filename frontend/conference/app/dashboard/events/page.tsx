import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

import {
  CalendarIcon,
  DocumentIcon,
  ChevronRightIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="min-h-screen w-full">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Eventos Totales
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Eventos suscritos</p>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Evento Más Proximo
              </CardTitle>
              <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Intelifencia artificial en El Salvador
              </div>
              <p className="text-xs text-muted-foreground">19/10/2024</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Link
            className="bg-blue-600 hover:bg-blue-800 text-blue-50 px-4 py-3 rounded-lg"
            href={"/dashboard/events/marketplace/"}
          >
            Buscar un evento
          </Link>
        </div>
      </main>
    </div>
  );
}
