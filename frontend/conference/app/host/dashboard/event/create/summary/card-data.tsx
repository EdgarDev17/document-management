"use client";

import React from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/app/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogOverlay,
  AlertDialogPortal,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import { Drawer } from "vaul";
import { useNewConferenceFormStore } from "@/lib/providers/conference-form-provider";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-service";
import { Separator } from "@/app/components/ui/separator";
import { Institution } from "@/types/models/institution";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

const EventSummary = ({ token }: { token: string }) => {
  const formSummary = useNewConferenceFormStore((state) => state);
  const [currentInstitution, setCurrentInstitution] =
    React.useState<Institution | null>(null);
  const windowsSize = useWindowSize();
  const router = useRouter();
  const ROL_ADMIN = 1;
  React.useEffect(() => {
    if (
      !formSummary.eventArea ||
      !formSummary.eventName ||
      !formSummary.eventDescription
    ) {
      router.push("/host/dashboard/event/create/step-one");
      return;
    }

    apiClient
      .get(`/institutions/${formSummary.institutionId}`, {
        headers: {
          "Authorization-Token": token,
        },
      })
      .then((res) => {
        setCurrentInstitution(res.data);
      })
      .catch((err) => {
        throw new Error("Error al obtener la institcion en el summary");
      });
  }, [
    formSummary.eventArea,
    formSummary.eventDescription,
    formSummary.eventName,
    router,
    formSummary.institutionId,
    token,
  ]);

  const onSubmit = async () => {
    await apiClient
      .post(
        "/conference/registerconference",
        {
          rollID: ROL_ADMIN,
          institucionID: currentInstitution?.institutionID,
          nameConference: formSummary.eventName,
          typeConference: formSummary.eventType,
          description: formSummary.eventDescription,
          beggingDate: formSummary.startingDate,
          finishDate: formSummary.finishingDate,
          areaID: 26,
          documentAttempt: 0,
        },
        {
          headers: {
            "Authorization-Token": token,
          },
        },
      )
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          toast.success("Conferencia creada con exito");
          router.push("/host/dashboard/events");
          return;
        }
        toast.error("Error al crear la conferencia. intente mas tarde");
      });
  };

  if (
    !formSummary.startingDate ||
    !formSummary.finishingDate ||
    !windowsSize.width
  ) {
    return <p>Cargando...</p>;
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VideoIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Tu conferencia</span>
          </div>
          <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Resumen
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <div>
            <span className="text-sm text-muted-foreground">Titulo</span>
            <h3 className="text-lg font-semibold">{formSummary.eventName}</h3>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Descripción</span>
            <p className="font-medium">{formSummary.eventDescription}</p>
          </div>
          <div className="grid grid-cols-2 gap-0 py-1">
            <div>
              <span className="text-sm text-muted-foreground">Inicio</span>
              <p className="font-medium">
                {format(formSummary.startingDate, "dd/MMM/yyyy")}
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Final</span>
              <p className="font-medium">
                {format(formSummary.startingDate, "dd/MMM/yyyy")}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-0 ">
          <div>
            <div className="text-sm text-muted-foreground">Anfitrión</div>
            <p className="font-medium">{currentInstitution?.name}</p>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Modalidad</div>
            <p className="font-medium">{formSummary.eventType}</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-6">
          <img
            src={`data:image/jpeg;base64,${currentInstitution?.image}`}
            className="w-[400px] h-[200px] object-cover rounded-lg"
          />{" "}
        </div>
      </CardContent>
      <CardFooter className="h-[10%]">
        <Button
          variant={"ghost"}
          onClick={() => router.push("/host/dashboard/event/create/step-three")}
        >
          Volver
        </Button>

        {windowsSize.width > 640 ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"default"}>Finalizar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estas completamente seguro?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Me he asegurado que toda la información está completa y sin
                  errores, asi que deseo crear el evento con la información
                  proporcionada.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onSubmit}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          // TODO: HACERLO COMPONENTE
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
              <Button variant={"default"}>Finalizar</Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[80%] mt-24 fixed bottom-0 left-0 right-0">
                <div className="p-4 bg-white rounded-t-[10px] flex-1">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                  <div className="max-w-md h-[90%] mx-auto flex flex-col justify-between">
                    <div>
                      <Drawer.Title className="font-medium mb-4 text-lg">
                        ¿Estas completamente seguro?
                      </Drawer.Title>
                      <p className="text-zinc-600 mb-2">
                        Me he asegurado que toda la información está completa y
                        sin errores, asi que deseo crear el evento con la
                        información proporcionada.
                      </p>
                    </div>
                    <div className="flex flex-col w-full gap-y-4">
                      <Button onClick={onSubmit}>Continuar</Button>
                      <Drawer.Close asChild>
                        <Button variant={"outline"}>Cancelar</Button>
                      </Drawer.Close>
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        )}
      </CardFooter>
    </Card>
  );
};

function VideoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

export default EventSummary;
