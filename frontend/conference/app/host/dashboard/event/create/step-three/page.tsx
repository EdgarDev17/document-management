"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { InputNumber } from "@/app/components/ui/input-number-controll";
import useSteps from "@/hooks/usesteps";
import { useState } from "react";

const formSchema = z.object({
  institutionName: z.string().min(1, {
    message: "Selecciona una institución",
  }),
  paperAttempts: z.number().gte(1),
});

export default function StepOne() {
  const router = useRouter();
  const [paperAttempt, setPaperAttemp] = useState(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institutionName: "",
      paperAttempts: paperAttempt,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push("/host/dashboard/event/create/summary");
  }

  const incrementAttempt = () => {
    setPaperAttemp((prevState) => prevState + 1);
  };

  const decrementAttempt = () => {
    if (paperAttempt <= 1) {
      return;
    }
    setPaperAttemp((prevState) => prevState - 1);
  };
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="h-[600px]">
            <CardHeader className="h-[20%]">
              <CardTitle>Datos de la institución</CardTitle>
              <CardDescription>
                Estos datos son necesario para que puedas crear un nuevo evento
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[60%] space-y-6">
              <FormField
                control={form.control}
                name="institutionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selecciona la institución anfitriona</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Selecciona institución" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tus instituciones</SelectLabel>
                            <SelectItem value="apple">
                              Universidad de sonsonate
                            </SelectItem>
                            <SelectItem value="banana">UCA</SelectItem>
                            <SelectItem value="blueberry">IEEE</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paperAttempts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selecciona la institución anfitriona</FormLabel>
                    <FormControl>
                      <div className="flex gap-x-3">
                        <Button
                          variant={"outline"}
                          type={"button"}
                          className="h-10"
                          onClick={decrementAttempt}
                        >
                          <ChevronLeftIcon className="text-zinc-900 w-4 h-4" />
                        </Button>
                        <Input
                          onChange={field.onChange}
                          value={paperAttempt}
                          className="bg-white w-[50px] border-gray-200 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <Button
                          variant={"outline"}
                          type="button"
                          className="h-10"
                          onClick={incrementAttempt}
                        >
                          <ChevronRightIcon className="text-zinc-900 w-4 h-4" />
                        </Button>
                      </div>
                    </FormControl>
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
