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
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  eventName: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  eventDescription: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  eventArea: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function StepOne() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventArea: "",
      eventName: "",
      eventDescription: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push("/host/dashboard/event/create/step-two");
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
            <CardContent className="h-[60%] space-y-6">
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo del evento</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del evento</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un área" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          Desarrollo de software
                        </SelectItem>
                        <SelectItem value="m@google.com">Leyes</SelectItem>
                        <SelectItem value="m@support.com">
                          Matematicas
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="h-[20%] flex gap-x-4">
              <Button variant={"ghost"}>Cancelar</Button>
              <Button variant={"default"}>Continuar</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
