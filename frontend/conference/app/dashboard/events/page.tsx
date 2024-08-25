import { EventsList } from "@/app/components/features/eventlist";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/app/components/ui/card";
import { CalendarIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Simulated events data
const allEvents = [
  { id: 1, name: "AI Conference 2023", date: "2023-09-15" },
  { id: 2, name: "Machine Learning Workshop", date: "2023-10-20" },
  { id: 3, name: "Data Science Symposium", date: "2023-11-05" },
  { id: 4, name: "Robotics Expo", date: "2023-12-01" },
  { id: 5, name: "Quantum Computing Seminar", date: "2024-01-15" },
  { id: 6, name: "Blockchain in AI", date: "2024-02-10" },
  { id: 7, name: "Natural Language Processing Conference", date: "2024-03-20" },
  { id: 8, name: "Computer Vision Symposium", date: "2024-04-15" },
  { id: 9, name: "AI Ethics Workshop", date: "2024-05-05" },
  { id: 10, name: "Deep Learning Summit", date: "2024-06-10" },
];

export default async function Page() {
  const page = 1;
  const pageSize = 3;
  const totalPages = Math.ceil(allEvents.length / pageSize);

  // Simulating server-side pagination
  const paginatedEvents = allEvents.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

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
              <div className="text-2xl font-bold">{allEvents.length}</div>
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
                Inteligencia artificial en El Salvador
              </div>
              <p className="text-xs text-muted-foreground">19/10/2024</p>
            </CardContent>
          </Card>
        </div>

        <div className="py-8">
          <Link
            className="bg-blue-600 hover:bg-blue-800 text-blue-50 px-4 py-3 rounded-lg"
            href="/dashboard/events/marketplace/"
          >
            Buscar un evento
          </Link>
        </div>

        <EventsList
          events={paginatedEvents}
          currentPage={page}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
}
