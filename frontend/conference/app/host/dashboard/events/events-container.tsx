"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/app/components/ui/card";
import {
  ArrowTrendingUpIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/charts";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DataTable } from "./data-table";
import { columns, Conference } from "./columns";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-service";
import Link from "next/link";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

function EventsContainer({ token }: { token: string }) {
  const [events, setEvents] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(token);
    apiClient
      .get("/Conference/ConferencesDetailsByUser", {
        headers: {
          "Authorization-Token": token,
        },
      })
      .then((response) => {
        console.log(response.data.conference);
        setEvents(response.data.conference);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-y-14 relative py-14">
      <Link
        href={"/host/dashboard/event/create/step-one"}
        className={
          "bg-blue-800 text-blue-50 border absolute right-0 top-0 border-blue-50 p-4 rounded-lg w-[250px] h-[50px] text-center flex justify-center items-center"
        }
      >
        Crear Conferencia
      </Link>
      <section className="w-full h-[60%] flex gap-x-6">
        <div className="w-[50%] grid grid-cols-2 gap-1  place-items-center">
          <Card className="w-[250px]  flex flex-col justify-between">
            <CardHeader className="w-full bg-tertiary rounded-t-lg">
              <CardTitle className="text-white">Eventos creados</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full flex justify-center items-center py-4">
              {loading ? (
                <p>cargando...</p>
              ) : (
                <p className="text-5xl font-bold text-zinc-800">
                  {events.length}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="w-[250px]  flex flex-col justify-between">
            <CardHeader className="w-full bg-tertiary rounded-t-lg">
              <CardTitle className="text-white">Participantes</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full flex justify-center items-center py-4">
              <p className="text-5xl font-bold text-zinc-800">80</p>
            </CardContent>
          </Card>

          <Card className="w-[250px]  flex flex-col justify-between">
            <CardHeader className="w-full bg-tertiary rounded-t-lg">
              <CardTitle className="text-white">Cancelaciones</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full flex justify-center items-center py-4">
              <p className="text-5xl font-bold text-zinc-800">8</p>
            </CardContent>
          </Card>
          <Card className="w-[250px]  flex flex-col justify-between">
            <CardHeader className="w-full bg-tertiary rounded-t-lg">
              <CardTitle className="text-white">Ventas</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full flex justify-center items-center py-4">
              <p className="text-5xl font-bold text-zinc-800">$190</p>
            </CardContent>
          </Card>
        </div>
        <div className="w-[50%] ">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Registrios</CardTitle>
              <CardDescription>Personas registradas</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ChartContainer config={chartConfig} className="h-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value: string | any[]) => value.slice(0, 3)}
                  />
                  {/* @ts-ignore */}
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  {/* @ts-ignore */}
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Participantes registrados
                    <ArrowTrendingUpIcon className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Datos en tiempo real
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section className={"flex gap-y-3 flex-col"}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <DataTable columns={columns} data={events} />
        )}
      </section>
    </div>
  );
}

export { EventsContainer };
