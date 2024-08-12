"use client";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { useWindowSize } from "@uidotdev/usehooks";
import { useNewConferenceFormStore } from "@/lib/providers/conference-form-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { format } from "date-fns";
import { ChevronRightIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import axios, { HttpStatusCode } from "axios";
import Spinner from "@/app/components/ui/spinner";

export default function Summary() {
  const formSummary = useNewConferenceFormStore((state) => state);
  const windowsSize = useWindowSize();
  const router = useRouter();
  const [waitingApiResponse, setWaitingApiResponse] = useState<boolean>(false);
  const [response, setResponse] = useState(null);
  const [isResponseOk, setIsResponseOk] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (
      !formSummary.eventArea ||
      !formSummary.eventName ||
      !formSummary.eventDescription
    ) {
      router.push("/host/dashboard/event/create/step-one");
      return;
    }
  }, [
    formSummary.eventArea,
    formSummary.eventDescription,
    formSummary.eventName,
    router,
  ]);

  if (
    !formSummary.startingDate ||
    !formSummary.finishingDate ||
    !windowsSize.width
  ) {
    return <p>Cargando...</p>;
  }

  const submitConference = async () => {
    setWaitingApiResponse(true);
    axios
      .post(
        "http://localhost:5110/api/Conference/RegisterConference",
        {
          RollID: 1,
          nameInstitution: "Tech University XDD",
          webSiteInstitution: "https://www.techuniversity.com",
          contactPhoneInstitution: "+1234567890",
          nameConference: "Tech Innovations 2024",
          typeConference: "Technology",
          description:
            "A conference discussing the latest innovations in technology.",
          beggingDate: "2024-09-15T09:00:00",
          finishDate: "2024-09-17T17:00:00",
          areaID: 4,
          documentAttempt: 4,
        },
        {
          headers: {
            "Authorization-Token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiWTdLbVNCeTAxaFBPejQzRkhCVUVYQXpRR1dSS3pScWk1RFE2QSs5Z1pvaz0iLCJjb21wbGV0ZVByb2ZpbGUiOmZhbHNlLCJjb3VudHJ5SUQiOjEsImV4cGlyYXRpb25EYXRlIjoiMjAyNC0wOC0xMFQwMjo1ODoyMS43NzQyNjcxLTA2OjAwIiwic3RhdGUiOnRydWV9.flg5FkcXrxuh5f_-WKBKYp4EMco5RISG5c8TxsKvUfs",
          },
        },
      )
      .then(function (response) {
        setWaitingApiResponse(false);

        if (response.status == HttpStatusCode.Ok) {
          setIsResponseOk(true);
          setInterval(() => {
            setOpen(false);
            router.push("/host/dashboard/events/");
          }, 1000);
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
        setWaitingApiResponse(false);
      });
  };

  return (
    <div className="w-full h-full md:h-[80vh] flex justify-center items-center">
      <Card className="md:w-[800px] md:h-[550px]">
        <CardHeader className="h-[20%]">
          <div className="flex justify-between items-center">
            <div className="w-full md:w-[60%]">
              <CardTitle className="text-lg">Resumen de tu evento</CardTitle>
              <CardDescription>
                Estos son los datos que proporcionaste para tu evento
              </CardDescription>
            </div>

            <div className="w-[40%] gap-x-6 hidden md:flex md:items-center">
              <div className="space-y-1">
                <p className="text-zinc-500 text-sm"> Inicio</p>
                <p className="text-base text-zinc-900">
                  {format(formSummary.startingDate, "dd/MMM/yyyy")}
                </p>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-zinc-400 text-center" />
              <div className="space-y-1">
                <p className="text-zinc-500 text-sm">Finalización</p>
                <p className="text-base text-zinc-900">
                  {format(formSummary.finishingDate, "dd/MMM/yyyy")}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-y-12 md:gap-y-0 md:flex-row h-[70%] py-1 gap-x-14">
          <div className="w-full md:w-[50%] flex flex-col gap-y-8 md:gap-y-6 py-3">
            <div className="space-y-1">
              <p className="text-zinc-500">Titulo</p>
              <p className="font-semibold text-base text-zinc-900">
                {formSummary.eventName}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-zinc-500">Descripción</p>
              <p className="text-base text-zinc-900 pr-3">
                {formSummary.eventDescription}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-500">Área</p>
              <p className="text-base text-zinc-900 pr-3">
                {formSummary.eventArea}
              </p>
            </div>
          </div>
          <div className="gap-x-6 flex items-center md:hidden p-1 border border-zinc-100 bg-zinc-50 rounded-lg">
            <div className="space-y-1">
              <p className="text-zinc-500 text-sm"> Inicio</p>
              <p className="text-base text-zinc-900">
                {format(formSummary.startingDate, "dd/MMM/yyyy")}
              </p>
            </div>
            <ChevronRightIcon className="w-6 h-6 text-zinc-400 text-center" />
            <div className="space-y-1">
              <p className="text-zinc-500 text-sm">Finalización</p>
              <p className="text-base text-zinc-900">
                {format(formSummary.finishingDate, "dd/MMM/yyyy")}
              </p>
            </div>
          </div>
          <div className="w-full md:w-[50%] flex flex-col gap-y-8 md:gap-y-6 py-3">
            <div className="space-y-1 bg-zinc-50 rounded-lg p-3 border border-zinc-100">
              <p className="text-zinc-500">Arfitrión</p>
              <p className="text-base text-zinc-900 pr-3">
                {formSummary.institutionName}
              </p>
            </div>
            <div className="space-y-1 bg-zinc-50 rounded-lg p-3 border border-zinc-100">
              <p className="text-zinc-500">Tipo</p>
              <p className="text-base text-zinc-900 pr-3">
                {formSummary.eventType}
              </p>
            </div>
            <div className="space-y-1 bg-zinc-50 rounded-lg p-3 border border-zinc-100">
              <p className="text-zinc-500">Direción o enlace</p>
              <p className="text-base text-zinc-900 pr-3">
                {formSummary.eventAddress}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="h-[10%]">
          <Button
            variant={"ghost"}
            onClick={() =>
              router.push("/host/dashboard/event/create/step-three")
            }
          >
            Volver
          </Button>

          {windowsSize.width > 640 ? (
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant={"default"}>Finalizar</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {!isResponseOk
                      ? `¿Estás completamente seguro?`
                      : `Petición exitosa`}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {!isResponseOk ? (
                      `Me he asegurado que toda la información está completa y sin
                    errores, asi que deseo crear el evento con la información
                    proporcionada.`
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center">
                        <CheckCircledIcon className="w-12 h-12 text-zinc-800" />
                        <p>Evento creado con éxito</p>
                      </div>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  {!isResponseOk ? (
                    <>
                      {" "}
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <Button
                        disabled={waitingApiResponse}
                        onClick={submitConference}
                      >
                        {waitingApiResponse ? (
                          <span className="flex gap-x-3 items-center">
                            <Spinner color="#fafafa" size={16} />
                            <p>cargando</p>
                          </span>
                        ) : (
                          "Continuar"
                        )}
                      </Button>{" "}
                    </>
                  ) : (
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  )}
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
                          Me he asegurado que toda la información está completa
                          y sin errores, asi que deseo crear el evento con la
                          información proporcionada.
                        </p>
                      </div>
                      <div className="flex flex-col w-full gap-y-4">
                        <Button onClick={submitConference}>Continuar</Button>
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
    </div>
  );
}
