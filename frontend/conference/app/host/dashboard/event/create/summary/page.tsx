"use client";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogOverlay,
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
import { useEffect } from "react";
import { Drawer } from "vaul";
import { format } from "date-fns";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export default function Summary() {
  const formSummary = useNewConferenceFormStore((state) => state);
  const windowsSize = useWindowSize();
  const router = useRouter();

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

  const onSubmit = () => {
    alert("enviando a la bd...");
  };

  if (
    !formSummary.startingDate ||
    !formSummary.finishingDate ||
    !windowsSize.width
  ) {
    return <p>Cargando...</p>;
  }

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
                          Me he asegurado que toda la información está completa
                          y sin errores, asi que deseo crear el evento con la
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
    </div>
  );
}
