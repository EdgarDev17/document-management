import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function Summary() {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <Card className="md:w-[800px] md:h-[550px]">
        <CardHeader className="h-[20%]">
          <CardTitle>Resumen de tu conferencia</CardTitle>
          <CardDescription>
            Estos son los datos que proporcionaste
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex h-[70%] py-1 gap-x-14">
          <div className="w-[50%] flex flex-col gap-y-6">
            <div className="space-y-1">
              <p className="text-zinc-500">Titulo</p>
              <p className="font-semibold text-base text-zinc-900">
                Desarrollo de apps moviles
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-zinc-500">Descripción</p>
              <p className="text-base text-zinc-900 pr-3">
                Busca fomentar el desarrollo de apps moviles en El Salvador, los
                expertos hablaran sobre buenas practicas, tendencias y
                tecnologias para el desarrollo de apps moviles.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-500">Área</p>
              <p className="text-base text-zinc-900 pr-3">
                Desarrollo de software
              </p>
            </div>
          </div>
          <div className="w-[50%] flex flex-col gap-y-6">
            <div className="space-y-1">
              <p className="text-zinc-500"> Fecha de inicio</p>
              <p className="text-base text-zinc-900">18 Mayo 2026</p>
            </div>

            <div className="space-y-1">
              <p className="text-zinc-500">Fecha de finalización</p>
              <p className="text-base text-zinc-900">19 Mayo 2026</p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-500">Arfitrión</p>
              <p className="text-base text-zinc-900 pr-3">
                Universidad de Sonsonate
              </p>
            </div>
          </div>{" "}
        </CardContent>
        <CardFooter className="h-[10%]">
          <Button variant={"ghost"}>Volver</Button>
          <Button variant={"default"}>Finalizar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
