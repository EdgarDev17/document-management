import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  DocumentIcon,
  BellAlertIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { apiClient } from "@/lib/api-service";
import { auth } from "@/auth";
import { urlConference } from "@/lib/endpoints";
import { Talk } from "@/types/models/talk";
import { formatDate, getHourFromDate } from "@/lib/utils";
import { Conference } from "@/types/models/conference";

async function getTalkDetails(talkId: string, token: string) {
  try {
    const response = await apiClient.get(
      `${urlConference}/conferenceslisttopicsbytopicsid?TopicsID=${talkId}`,
      {
        headers: {
          "Authorization-Token": token,
        },
      },
    );
    return response.data.topics[0];
  } catch (err) {
    return null;
  }
}

async function getEvenDetails(eventId: number, token: string) {
  try {
    const response = await apiClient.get(
      `${urlConference}/conferencesdetailsspecific?conferenceID=${eventId}`,
      {
        headers: {
          "Authorization-Token": token,
        },
      },
    );
    return response.data.conference[0];
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return "no auth";
  }

  if (!session) {
    return "no se encontró la charla";
  }

  const talk: Talk = await getTalkDetails(params.id, session.accessToken);
  const event: Conference = await getEvenDetails(
    talk.conferenceID,
    session.accessToken,
  );

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{talk.name}</h1>
        <p className="text-xl text-muted-foreground">{talk.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="blue" className="text-sm">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {formatDate(talk.startHour)}
          </Badge>
          <Badge variant="yellow" className="text-sm">
            <ClockIcon className="mr-1 h-3 w-3" />
            {getHourFromDate(talk.startHour)} -{" "}
            {getHourFromDate(talk.startHour)}
          </Badge>
          <Badge variant="blue" className="text-sm">
            <MapPinIcon className="mr-1 h-3 w-3" />
            {talk.location}
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Detalles de la Charla</CardTitle>
          </CardHeader>
          <CardContent className="h-[80%] flex flex-col justify-between">
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p>{talk.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Te has registrado a esta charla como:
              </h3>
              <p>Sin registro. Aún no estas participando en la charla :(</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold mb-2">Participantes</h3>
              <h4>Esta charla posee un número máximo de participantes</h4>
              {/*TODO: HACER QUE LA CONFERENCIA ACEPTA MAXIMOS DE PARTICIAPANTES */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">5</span>
                <Badge variant="red" className="text-sm">
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

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5" />
                Ponente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={""} alt={""} />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">Edgardo Antorio</h3>
                  <p className="text-sm text-muted-foreground">
                    Su area de especialidad es el frontend
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {event.documentAttempt > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DocumentIcon className="mr-2 h-5 w-5" />
                  Aplicaciones (Papers)
                </CardTitle>
                <CardDescription>
                  Papers enviados para esta charla
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-b pb-2 last:border-b-0 last:pb-0">
                  <h4 className="font-semibold">Mi primer paper enviado</h4>
                  <p className="text-sm text-muted-foreground">
                    Autor: Edgardo
                  </p>
                </div>
                <Button className="mt-4 w-full">Enviar Paper</Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BellAlertIcon className="mr-2 h-5 w-5" />
                  Información Importante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Actualmente no se están aceptando nuevos papers para esta
                  charla. Si estás interesado en participar, te recomendamos:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Registrarte para asistir a la charla</li>
                  <li>Revisar los materiales adicionales proporcionados</li>
                  <li>Preparar preguntas para la sesión de Q&A</li>
                </ul>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-800">
                  Registrarse para la Charla
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
