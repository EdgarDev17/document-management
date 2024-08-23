"use client";
import { useEffect, useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { apiClient } from "@/lib/api-service";
import { urlConference } from "@/lib/endpoints";
import { Conference } from "@/app/host/dashboard/events/columns";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

// Array de colores de Tailwind con valor "100"
const bgColors = [
  "bg-red-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-indigo-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-orange-100",
  "bg-teal-100",
  "bg-cyan-100",
  "bg-lime-100",
  "bg-emerald-100",
  "bg-sky-100",
  "bg-violet-100",
  "bg-fuchsia-100",
];

// Función para obtener un color aleatorio
const getRandomColor = () =>
  bgColors[Math.floor(Math.random() * bgColors.length)];

// Eventos de ejemplo (en una aplicación real, estos vendrían de una API)
const eventos = [
  {
    id: 1,
    nombre: "Conferencia de Inteligencia Artificial",
    fechaInicio: "2023-09-15",
    fechaFin: "2023-09-17",
    descripcion:
      "Explorando los últimos avances en IA y sus aplicaciones prácticas.",
    modalidad: "Presencial",
    area: "Tecnología",
  },
  {
    id: 2,
    nombre: "Simposio de Biología Molecular",
    fechaInicio: "2023-10-01",
    fechaFin: "2023-10-03",
    descripcion:
      "Discusiones sobre los últimos descubrimientos en biología molecular y genética.",
    modalidad: "Virtual",
    area: "Ciencias",
  },
  {
    id: 3,
    nombre: "Seminario de Literatura Latinoamericana",
    fechaInicio: "2023-11-10",
    fechaFin: "2023-11-12",
    descripcion:
      "Análisis de obras contemporáneas y sus contextos socioculturales.",
    modalidad: "Híbrido",
    area: "Humanidades",
  },
  {
    id: 4,
    nombre: "Taller de Economía Circular",
    fechaInicio: "2023-12-05",
    fechaFin: "2023-12-07",
    descripcion:
      "Estrategias prácticas para implementar modelos de economía circular en empresas.",
    modalidad: "Presencial",
    area: "Economía",
  },
  {
    id: 5,
    nombre: "Congreso de Neurociencia Cognitiva",
    fechaInicio: "2024-01-20",
    fechaFin: "2024-01-23",
    descripcion:
      "Presentación de las últimas investigaciones en neurociencia cognitiva y sus implicaciones.",
    modalidad: "Híbrido",
    area: "Ciencias",
  },
  {
    id: 6,
    nombre: "Foro de Innovación Educativa",
    fechaInicio: "2024-02-15",
    fechaFin: "2024-02-17",
    descripcion:
      "Explorando nuevas metodologías y tecnologías para mejorar la educación.",
    modalidad: "Virtual",
    area: "Educación",
  },
];

function EventSearch({ token }: { token: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<Conference[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`${urlConference}/ConferencesDetailsGeneral`, {
        headers: {
          "Authorization-Token": token,
        },
      })
      .then(function (response) {
        console.log("DATAAAAAAAAAAAAAA", response.data.conference);
        setEvents(response.data.conference);
      })
      .catch(function (error) {
        console.log(error);
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>LOADING DATA...</div>;
  }

  // TODO: CAMBIAR NAME POR AREA
  // EN LA SEGUNDA VALIDACION
  const filteredEvents = events.filter(
    (event) =>
      event.conference_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedArea === "" || event.conference_name === selectedArea),
  );

  const eventsPerPage = 5;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const displayedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage,
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">
        Buscador de Eventos Académicos
      </h1>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white"
          />
        </div>
        <Select value={selectedArea} onValueChange={setSelectedArea}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por área" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tecnología">Tecnología</SelectItem>
            <SelectItem value="Ciencias">Ciencias</SelectItem>
            <SelectItem value="Humanidades">Humanidades</SelectItem>
            <SelectItem value="Economía">Economía</SelectItem>
            <SelectItem value="Educación">Educación</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {displayedEvents.map((evento) => {
          const randomColor = getRandomColor();
          return (
            <Link
              key={evento.conferenceID}
              className="w-fit h-fit"
              href={`/dashboard/events/marketplace/event/${evento.conferenceID}`}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4 flex">
                  <div
                    className={`mr-4 flex flex-col items-center justify-center ${randomColor} rounded-md p-2 min-w-[80px]`}
                  >
                    <span className="text-sm font-semibold">12</span>
                    <span className="text-xs">sep</span>
                    <span className="text-xs">2022</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{evento.conference_name}</h3>
                    <p className="text-sm mt-1 line-clamp-2">
                      {evento.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge variant="secondary">
                        <GlobeAltIcon className="inline-block mr-1 h-3 w-3" />
                        {evento.conference_type}
                      </Badge>
                      <Badge variant="outline">{"software"}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end ml-4">
                    <Badge variant="secondary" className="mb-2">
                      {`${formatDate(evento.beggingDate)} - ${formatDate(evento.finishDate)}`}
                    </Badge>
                    <Button size="sm">Ver conferencia</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            size="sm"
          >
            Anterior
          </Button>
          <span className="self-center text-sm">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            size="sm"
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}

export { EventSearch };
