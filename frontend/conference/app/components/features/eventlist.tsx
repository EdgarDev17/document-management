"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Conference } from "@/types/models/conference";

const getDateVariant = (date) => {
  const eventDate = new Date(date);
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "red";
  if (diffDays <= 7) return "yellow";
  if (diffDays <= 30) return "secondary";
  return "default";
};

function EventsList({
  events,
  currentPage,
  totalPages,
}: {
  events: Conference;
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/dashboard/events?page=${newPage}`);
  };

  return (
    <Card className="h-[350px] min-h-[350px]">
      <CardHeader>
        <CardTitle>Tus eventos</CardTitle>
        <CardDescription>
          Esta es la lista de eventos en los que participas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {events.map((event: Conference) => (
            <li
              key={event.id}
              className="flex justify-between items-center p-2 bg-muted rounded-md hover:bg-muted/80 cursor-pointer transition-colors"
            >
              <span>{event.name}</span>
              <Badge variant={getDateVariant(event.date)}>{event.date}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          variant={"outline"}
        >
          Anterior
        </Button>
        <span>
          Página {page} de {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          variant={"outline"}
        >
          Siguiente
        </Button>
      </CardFooter>
    </Card>
  );
}

export { EventsList };
