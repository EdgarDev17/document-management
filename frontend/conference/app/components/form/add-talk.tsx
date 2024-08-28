"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  CalendarIcon,
  HashtagIcon,
  MapPinIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { apiClient } from "@/lib/api-service";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  startHour: z.string(),
  startEnd: z.string(),
  conferenceID: z.number().int().nonnegative(),
  totalSpeakers: z.number().int().nonnegative(),
  totalAttendees: z.number().int().nonnegative(),
  nameSpeaker: z.string().min(1, "Speaker name is required"),
});

type FormValues = z.infer<typeof formSchema>;

function AddTalkForm({
  minDate,
  maxDate,
  token,
  conferenceId,
}: {
  minDate: string;
  maxDate: string;
  conferenceId: string;
  token: string;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      startHour: "",
      startEnd: "",
      conferenceID: 0,
      totalSpeakers: 0,
      totalAttendees: 0,
      nameSpeaker: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const data = {
      name: values.name,
      description: values.description,
      location: values.location,
      startHour: values.startHour,
      startEnd: values.startEnd,
      conferenceID: conferenceId,
      totalSpeakers: values.totalSpeakers,
      totalAttendees: values.totalAttendees,
      nameSpeaker: values.nameSpeaker,
    };
    console.log(data);
    try {
      const res = await apiClient.post(
        "/conference/registerconferencetopics",
        data,
        {
          headers: {
            "Authorization-Token": token,
          },
        },
      );

      if (res.status !== HttpStatusCode.Ok) {
        throw new Error("Error al registrar la charla");
      }

      const movingTopicsToTable = await apiClient.post(
        "/conference/moveconferencetopics",
        {
          conferenceID: conferenceId,
        },
        {
          headers: {
            "Authorization-Token": token,
          },
        },
      );

      if (movingTopicsToTable.status !== HttpStatusCode.Ok) {
        throw new Error("Error al mover la charla a la tabla");
      }

      toast.success("Charla creada con éxito");
      return { res, movingTopicsToTable };
    } catch (err) {
      console.error(err);
      toast.error("Error al crear la charla");
      throw err;
    }
  }

  // Función modificada para establecer la hora a 00:00
  // Función modificada para permitir elegir entre 00:00 y 23:00
  const formatDateForInput = (
    dateString: string,
    useEndOfDay: boolean = false,
  ): string => {
    const date = new Date(dateString);
    if (useEndOfDay) {
      date.setHours(23, 0, 0, 0); // Establece la hora a 23:00:00 (11:00 PM)
    } else {
      date.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 (medianoche)
    }
    return date.toISOString().slice(0, 16); // Formato: YYYY-MM-DDTHH:mm
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Crear una charla</CardTitle>
        <CardDescription>
          Fill in the details for your upcoming event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titulo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter event name"
                          {...field}
                          className="bg-background"
                        />
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
                        <Textarea
                          placeholder="Enter event description"
                          {...field}
                          className="bg-background"
                        />
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
                      <FormLabel>
                        <MapPinIcon className="w-4 h-4 inline-block mr-1" />
                        Ubicación
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter event location"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startHour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                          Fecha de inicio
                        </FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="datetime-local"
                            className="bg-background w-[150px]"
                            min={formatDateForInput(minDate)}
                            max={formatDateForInput(maxDate, true)}
                          />
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
                        <FormLabel>
                          <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                          Fecha de finalización
                        </FormLabel>
                        <FormControl>
                          <input
                            type="datetime-local"
                            {...field}
                            className="bg-background"
                            min={formatDateForInput(minDate)}
                            max={formatDateForInput(maxDate, true)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="totalSpeakers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <UserIcon className="w-4 h-4 inline-block mr-1" />
                          Número de ponentes
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalAttendees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <UsersIcon className="w-4 h-4 inline-block mr-1" />
                          Cupos del evento
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="nameSpeaker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <UserIcon className="w-4 h-4 inline-block mr-1" />
                        Nombre del ponente
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter speaker name"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <CardFooter className="px-0">
              <Button type="submit" className="w-full">
                Create Event
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { AddTalkForm };
