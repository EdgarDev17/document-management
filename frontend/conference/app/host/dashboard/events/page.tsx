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

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DataTable } from "./data-table";
import { columns, Conference } from "./columns";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlConference } from "@/lib/endpoints";

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

export default function Page() {
  const [events, setEvents] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`${urlConference}/ConferencesDetailsByUser`, {
      headers: {
        "Authorization-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiWTdLbVNCeTAxaFBPejQzRkhCVUVYQXpRR1dSS3pScWk1RFE2QSs5Z1pvaz0iLCJjb21wbGV0ZVByb2ZpbGUiOnRydWUsImNvdW50cnlJRCI6MSwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA4LTE0VDEwOjI1OjA5LjY2NzIwNDgtMDY6MDAiLCJzdGF0ZSI6dHJ1ZX0.VzOMkwfOYWkzFiKE_uB5AkYxYGp0a2wgGldNJoJ1b9I",
      },
    })
      .then((response) => {
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
    <div className="w-full h-full flex flex-col gap-y-14">
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
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
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
      <section className="">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <DataTable columns={columns} data={events} />
        )}
      </section>
    </div>
  );
}
