"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import { Input } from "@/app/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/app/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  startingDate: z.date({
    required_error: "Selecciona una fecha valida",
  }),
  finishingDate: z.date({
    required_error: "Selecciona una fecha valida",
  }),
  eventType: z.string().min(1, {
    message: "Selecciona una opción valida",
  }),
  eventAddress: z.string().min(1, { message: "Escriba la direccion o enlace" }),
});

export default function StepTwo() {
  const [eventType, setEventType] = useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventType: "",
      eventAddress: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push("/host/dashboard/event/create/step-three");
  }

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="h-[600px]">
            <CardHeader className="h-[20%]">
              <CardTitle>Datos generales del evento</CardTitle>
              <CardDescription>
                Estos datos son necesario para que puedas crear un nuevo evento
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[60%] space-y-8">
              <FormField
                control={form.control}
                name="startingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de inicio</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="finishingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de finalización</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tipo de evento</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setEventType(value);
                        }}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="virtual" />
                          </FormControl>
                          <FormLabel className="font-normal">Virtual</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="presencial" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Presencial
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {eventType && (
                <FormField
                  control={form.control}
                  name="eventAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {eventType == "virtual"
                          ? "Ingresa el enlace al webite del evento"
                          : "Ingresa la ubicación del evento"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setEventType(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
            <CardFooter className="h-[20%] flex gap-x-4">
              <Button variant={"ghost"}>Volver</Button>
              <Button variant={"default"}>Continuar</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
