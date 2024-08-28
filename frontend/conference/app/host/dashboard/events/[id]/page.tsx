import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  InboxIcon,
  PlusCircleIcon,
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { auth } from "@/auth";
import { apiClient } from "@/lib/api-service";
import { urlConference, urlInstitutions } from "@/lib/endpoints";
import { Conference } from "@/types/models/conference";
import { formatDate } from "@/lib/utils";
import { Institution } from "@/types/models/institution";
import { AgendaContainer } from "@/app/components/features/agendacontainer";
import { EmptyAgendaMessage } from "@/app/components/features/empty-agenda";
import Link from "next/link";

async function getEventAgenda(id: string, token: string) {
  try {
    const response = await apiClient.get(
      `${urlConference}/conferenceslisttopicsbyconferenceid?conferenceID=${id}`,
      {
        headers: {
          "Authorization-Token": token,
        },
      },
    );
    return response.data.topics;
  } catch (err) {
    return null;
  }
}

async function getEventDetailts(id: string, token: string) {
  try {
    const response = await apiClient.get(
      `${urlConference}/conferencesdetailsspecific?conferenceID=${id}`,
      {
        headers: {
          "Authorization-Token": token,
        },
      },
    );

    return response.data.conference[0];
  } catch (err) {
    console.log({ eventError: err });
    return err;
  }
}

async function getInstitution(id: string, token: string) {
  try {
    const response = await apiClient.get(`${urlInstitutions}/${id}`, {
      headers: {
        "Authorization-Token": token,
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return "no auth";
  }

  const event: Conference = await getEventDetailts(
    params.id,
    session.accessToken,
  );

  if (!event) {
    return "no auth";
  }

  const agenda: [] = await getEventAgenda(params.id, session.accessToken);

  const institution: Institution = await getInstitution(
    event.institutionID.toString(),
    session.accessToken,
  );

  console.log(agenda);
  // console.log({ currentEvent: event });

  return (
    <div className=" p-4 space-y-8 h-[70vh]">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{event.conference_name}</h1>
          <p className="text-xl text-muted-foreground mb-4">
            {event.description}
          </p>
          <div className="flex space-x-4">
            <Badge variant="yellow" className="text-sm">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {formatDate(event.beggingDate)} - {formatDate(event.finishDate)}
            </Badge>
            <Badge variant="blue" className="text-sm">
              <MapPinIcon className="mr-1 h-4 w-4" />
              {event.type}
            </Badge>
            {/*TODO: TRAER EL AREA DE LA BD */}
            <Badge variant="outline" className="text-sm">
              Area aqui
            </Badge>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-blue-600">
              Registrarme al evento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bienvenido, Un paso más</DialogTitle>
              <DialogDescription>
                Selecciona como quieres registrarte al evento
              </DialogDescription>
            </DialogHeader>

            <div className="py-3 flex gap-x-6">
              <Button className="bg-blue-600">Como invitado</Button>
              <Button variant={"outline"}>Como ponente</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative">
        <Card className="md:col-span-2 relative w-full h-[600px] flex flex-col overflow-hidden px-4">
          {agenda.length > 0 && (
            <Link
              href={`/host/dashboard/event/talks/create?conferenceId=${params.id}`}
              className="py-6 absolute right-4 top-0"
            >
              <Button className="bg-blue-600">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Crear charla
              </Button>
            </Link>
          )}

          <CardHeader>
            <CardTitle>Agenda</CardTitle>
            <CardDescription>Programa detallado del evento</CardDescription>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent className="w-full h-full">
              {agenda.length === 0 ? (
                <EmptyAgendaMessage conferenceId={params.id} />
              ) : (
                <AgendaContainer agenda={agenda} rol="host" />
              )}
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
                    src={`data:image/JPG;base64,${institution.image}`}
                    alt={institution.name}
                  />
                  <AvatarFallback>
                    {institution.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{institution.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {institution.description}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <PhoneIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{institution.contact_phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <GlobeAltIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <a
                    href={`${institution.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {institution.website}
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
                    {formatDate(event.beggingDate)}
                  </Badge>
                  <span>hasta</span>
                  <Badge variant="outline" className="text-sm">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {formatDate(event.finishDate)}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">
                  Ubicación
                </h4>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Ubicacion aqui</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">
                  Participantes
                </h4>
                {/*TODO: HACER QUE LA CONFERENCIA ACEPTA MAXIMOS DE PARTICIAPANTES */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">5</span>
                  <Badge variant="outline" className="text-sm">
                    <UsersIcon className="mr-1 h-3 w-3" />
                    100 max
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(5 / 100) * 100}%`,
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
