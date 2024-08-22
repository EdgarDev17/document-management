import { notFound } from "next/navigation";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { GlobeAltIcon } from "@heroicons/react/20/solid";
import { ScrollArea } from "@/app/components/ui/scrollarea";

// Simulación de una función para obtener los detalles del evento
async function getEventoDetalle(id: string) {
  // En una aplicación real, aquí se haría una llamada a la API o base de datos
  const eventos = [
    {
      id: "1",
      nombre: "Conferencia de Inteligencia Artificial",
      fechaInicio: "2023-09-15",
      fechaFin: "2023-09-17",
      descripcion:
        "Explorando los últimos avances en IA y sus aplicaciones prácticas.",
      modalidad: "Presencial",
      area: "Tecnología",
      ubicacion: "Centro de Convenciones, Ciudad de México",
      anfitrion: {
        nombre: "Universidad Tecnológica de México",
        imagen: "/placeholder.svg?height=100&width=100",
        descripcion:
          "Institución líder en educación e investigación tecnológica.",
        telefono: "+52 55 1234 5678",
        sitioWeb: "www.unitec.edu.mx",
        email: "contacto@unitec.edu.mx",
      },
      participantesRegistrados: 180,
      limiteParticipantes: 250,
      agenda: [
        { hora: "09:00", titulo: "Registro y café de bienvenida" },
        {
          hora: "10:00",
          titulo: "Keynote: El futuro de la IA",
          ponente: "Dr. Carlos Ramírez",
        },
        {
          hora: "11:30",
          titulo: "Panel: Ética en la IA",
          ponentes: [
            "Dra. Laura Sánchez",
            "Ing. Pedro Gómez",
            "Lic. María Torres",
          ],
        },
        { hora: "13:00", titulo: "Almuerzo" },
        {
          hora: "14:30",
          titulo: "Taller: Implementación de modelos de IA",
          ponente: "Ing. Roberto Díaz",
        },
        {
          hora: "16:00",
          titulo: "Charla: IA en la medicina",
          ponente: "Dra. Sofía Vargas",
        },
        { hora: "17:30", titulo: "Networking y cierre" },
      ],
    },
  ];

  const evento = eventos.find((e) => e.id === id);
  if (!evento) return null;
  return evento;
}

export default async function EventoDetalle({
  params,
}: {
  params: { id: string };
}) {
  const evento = await getEventoDetalle(params.id);

  if (!evento) {
    notFound();
  }

  return (
    <div className=" p-4 space-y-8 h-[70vh]">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{evento.nombre}</h1>
          <p className="text-xl text-muted-foreground mb-4">
            {evento.descripcion}
          </p>
          <div className="flex space-x-4">
            <Badge variant="yellow" className="text-sm">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {evento.fechaInicio} - {evento.fechaFin}
            </Badge>
            <Badge variant="blue" className="text-sm">
              <MapPinIcon className="mr-1 h-4 w-4" />
              {evento.modalidad}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {evento.area}
            </Badge>
          </div>
        </div>
        <Button size="lg" className="bg-blue-600">
          Unirme al evento
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 w-full h-[600px] flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle>Agenda</CardTitle>
            <CardDescription>Programa detallado del evento</CardDescription>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent className="w-full">
              <ol className="relative px-3 border-l border-gray-200 dark:border-gray-700">
                {evento.agenda.map((item, index) => (
                  <li key={index} className="mb-10 ml-6 cursor-pointer">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <ClockIcon className="w-3 h-3 text-blue-800 dark:text-blue-300" />
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {item.titulo}
                      {item.ponente && (
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                          {item.ponente}
                        </span>
                      )}
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {item.hora}
                    </time>
                    {item.ponentes && (
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Ponentes: {item.ponentes.join(", ")}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </CardContent>
          </ScrollArea>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BuildingOfficeIcon className="mr-2 h-5 w-5" />
                Institución Anfitriona
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={evento.anfitrion.imagen}
                    alt={evento.anfitrion.nombre}
                  />
                  <AvatarFallback>
                    {evento.anfitrion.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {evento.anfitrion.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {evento.anfitrion.descripcion}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <PhoneIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{evento.anfitrion.telefono}</span>
                </div>
                <div className="flex items-center text-sm">
                  <GlobeAltIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://${evento.anfitrion.sitioWeb}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {evento.anfitrion.sitioWeb}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Detalles del Evento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">
                  Fecha y Hora
                </h4>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-sm">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {evento.fechaInicio}
                  </Badge>
                  <span>hasta</span>
                  <Badge variant="outline" className="text-sm">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {evento.fechaFin}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">
                  Ubicación
                </h4>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{evento.ubicacion}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">
                  Participantes
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {evento.participantesRegistrados}
                  </span>
                  <Badge variant="outline" className="text-sm">
                    <UsersIcon className="mr-1 h-3 w-3" />
                    {evento.limiteParticipantes} max
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(evento.participantesRegistrados / evento.limiteParticipantes) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
