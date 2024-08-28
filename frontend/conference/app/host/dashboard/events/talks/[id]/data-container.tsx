"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { MapPin, Clock, User, Edit, Trash2 } from "lucide-react";
import { apiClient } from "@/lib/api-service";
import { Talk } from "@/types/models/talk";
import { toast } from "sonner";

const talkSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  location: z.string().min(1, "La ubicación es requerida"),
  startHour: z.string(),
  startEnd: z.string(),
  nameSpeaker: z.string().min(1, "El nombre del ponente es requerido"),
});

type TalkData = z.infer<typeof talkSchema> & {
  topicsID: number;
  conferenceID: number;
};

function DataContainer({ talkData, token }: { talkData: any; token: string }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const form = useForm<TalkData>({
    resolver: zodResolver(talkSchema),
    defaultValues: talkData,
  });

  const onSubmit = (data: TalkData) => {
    console.log("editar data...");
  };

  const handleDelete = async () => {
    console.log("eliminando...", talkData.topicsID);

    try {
      const res = await apiClient.post(
        "/conference/deleteconferencetopics",
        {
          topicsID: talkData.topicsID,
        },
        {
          headers: {
            "Authorization-Token": token,
          },
        },
      );

      toast.success("Eliminado con éxito");
    } catch (err) {
      console.log(err);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <Card>
        <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg" />
        <CardHeader className="-mt-16 pb-0">
          <div className="bg-background p-4 rounded-lg shadow-lg inline-block">
            <CardTitle className="text-3xl font-bold">
              {talkData.name}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-col gap-3">
        <Card className="overflow-hidden">
          <CardContent className="pt-6 space-y-6">
            <CardDescription className="text-lg flex flex-col items-start">
              <p className="m-0 text-sm">Descripción</p>
              <p className="font-normal text-zinc-900">
                {talkData.description}
              </p>
            </CardDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4">
                  <CardTitle className="text-xl font-semibold text-zinc-800">
                    Detalles del evento
                  </CardTitle>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-[auto,1fr] gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                        Ubicación
                      </h3>
                      <p className="text-base">{talkData.location}</p>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                        Horario
                      </h3>
                      <p className="text-base">
                        {format(
                          new Date(talkData.startHour),
                          "dd/MM/yyyy HH:mm",
                        )}{" "}
                        -{format(new Date(talkData.startEnd), "HH:mm")}
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                        Ponente
                      </h3>
                      <p className="text-base">{talkData.nameSpeaker}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4">
                  <CardTitle className="text-xl font-semibold text-amber-800">
                    Información adicional
                  </CardTitle>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                        ID de Tema
                      </h3>
                      <Badge variant="outline" className="text-base px-3 py-1">
                        {talkData.topicsID}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                        ID de Conferencia
                      </h3>
                      <Badge variant="outline" className="text-base px-3 py-1">
                        {talkData.conferenceID}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Acciones</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-8 items-center">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Charla</DialogTitle>
                  <DialogDescription>
                    Modifica los detalles de la charla aquí.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ubicación</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startHour"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hora de inicio</FormLabel>
                          <FormControl>
                            <Input {...field} type="datetime-local" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startEnd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hora de finalización</FormLabel>
                          <FormControl>
                            <Input {...field} type="datetime-local" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nameSpeaker"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del ponente</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Guardar cambios</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar eliminación</DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro de que quieres eliminar esta charla? Esta
                    acción no se puede deshacer.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Eliminar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { DataContainer };
