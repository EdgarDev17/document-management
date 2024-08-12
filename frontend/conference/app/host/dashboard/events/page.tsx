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
import { Event, columns } from "./columns";

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

const events: Event[] = [
  {
    id: 1,
    eventName: "Tech Conference 2024",
    eventType: 1,
    startingDate: new Date("2024-09-15"),
  },
  {
    id: 2,
    eventName: "Annual Company Retreat",
    eventType: 2,
    startingDate: new Date("2024-10-05"),
  },
  {
    id: 2,

    eventName: "Product Launch Event",
    eventType: 3,
    startingDate: new Date("2024-08-20"),
  },
  {
    id: 2,

    eventName: "Community Meetup",
    eventType: 4,
    startingDate: new Date("2024-11-12"),
  },
  {
    id: 2,

    eventName: "Cybersecurity Workshop",
    eventType: 5,
    startingDate: new Date("2024-09-01"),
  },
  {
    id: 2,

    eventName: "Holiday Party",
    eventType: 2,
    startingDate: new Date("2024-12-18"),
  },
  {
    id: 2,

    eventName: "Developer Bootcamp",
    eventType: 1,
    startingDate: new Date("2024-07-30"),
  },
  {
    id: 2,

    eventName: "Board Meeting",
    eventType: 6,
    startingDate: new Date("2024-08-25"),
  },
  {
    id: 2,

    eventName: "User Experience Conference",
    eventType: 3,
    startingDate: new Date("2024-10-10"),
  },
  {
    id: 2,
    eventName: "Startup Pitch Night",
    eventType: 4,
    startingDate: new Date("2024-11-20"),
  },
];

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col gap-y-14">
      <section className="w-full h-[60%] flex gap-x-6">
        <div className="w-[50%] grid grid-cols-2 gap-1  place-items-center">
          <Card className="w-[250px]  flex flex-col justify-between">
            <CardHeader className="w-full bg-tertiary rounded-t-lg">
              <CardTitle className="text-white">Eventos creados</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full flex justify-center items-center py-4">
              <p className="text-5xl font-bold text-zinc-800">16</p>
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
        <DataTable columns={columns} data={events} />
      </section>
    </div>
  );
}
