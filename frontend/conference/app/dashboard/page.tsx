import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  CalendarIcon,
  DocumentIcon,
  ChevronRightIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Badge component
const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: string;
}) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
  const variantClasses = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
  };
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

// Mock data
const events = [
  { id: 1, name: "AI Conference 2023", date: "2023-09-15" },
  { id: 2, name: "Machine Learning Workshop", date: "2023-10-20" },
  { id: 3, name: "Data Science Symposium", date: "2023-11-05" },
  { id: 4, name: "Robotics Expo", date: "2023-12-01" },
  { id: 5, name: "Quantum Computing Seminar", date: "2024-01-15" },
];

const papers = [
  {
    id: 1,
    title: "Advances in Natural Language Processing",
    status: "En revisión",
  },
  {
    id: 2,
    title: "Efficient Algorithms for Big Data Analysis",
    status: "Aprobado",
  },
  { id: 3, title: "Deep Learning in Computer Vision", status: "Enviado" },
  {
    id: 4,
    title: "Blockchain Technology in Healthcare",
    status: "En revisión",
  },
  {
    id: 5,
    title: "Ethical Considerations in AI Development",
    status: "Aprobado",
  },
];

export default function Component() {
  const totalEvents = events.length;
  const totalPapers = papers.length;
  const mostRecentEvent = new Date(
    Math.max(...events.map((e) => new Date(e.date).getTime())),
  );

  const getStatusVariant = (status) => {
    switch (status) {
      case "Aprobado":
        return "green";
      case "En revisión":
        return "yellow";
      case "Enviado":
        return "blue";
      default:
        return "blue";
    }
  };

  const getDateVariant = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "red";
    if (diffDays <= 7) return "yellow";
    if (diffDays <= 30) return "blue";
    return "green";
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Summary Cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Eventos Totales
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEvents}</div>
              <p className="text-xs text-muted-foreground">
                Eventos en los que participas
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Documentos Totales
              </CardTitle>
              <DocumentIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPapers}</div>
              <p className="text-xs text-muted-foreground">
                Documentos enviados a revisión.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Evento mas cercano
              </CardTitle>
              <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Introucción a la programación
              </div>
              <p className="text-xs text-muted-foreground">12 de Junio 2024</p>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tus Eventos</CardTitle>
            <CardDescription>
              Estos son los eventos a los que tú estás suscrito
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {events.slice(0, 3).map((event) => (
                <li
                  key={event.id}
                  className="flex justify-between items-center p-2 bg-muted rounded-md hover:bg-muted/80 cursor-pointer transition-colors"
                >
                  <span>{event.name}</span>
                  <Badge variant={getDateVariant(event.date)}>
                    {event.date}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Link href={"/dashboard/events"} className="w-full">
              <Button variant="outline" className="w-full">
                Mirar todos mis eventos
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Papers List */}
        <Card>
          <CardHeader>
            <CardTitle>Mis documentos</CardTitle>
            <CardDescription>
              Estos son todos los documentos que has enviado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {papers.slice(0, 3).map((paper) => (
                <li
                  key={paper.id}
                  className="flex justify-between items-center p-2 bg-muted rounded-md hover:bg-muted/80 cursor-pointer transition-colors"
                >
                  <span>{paper.title}</span>
                  <Badge variant={getStatusVariant(paper.status)}>
                    {paper.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Link href={"/dashboard/events"} className="w-full">
              <Button variant="outline" className="w-full">
                Mirar todos mis docoumentos
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
