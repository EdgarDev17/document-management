"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Topic = {
  name: string;
  description: string;
  location: string;
  startHour: Date;
  startEnd: Date;
  conferenceID: number;
};

export const columns: ColumnDef<Topic>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "location",
    header: "Ubicación",
  },
  {
    accessorKey: "startHour",
    header: "Hora de inicio",
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>("startHour"));
      return (
        <div>
          {date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "startEnd",
    header: "Fecha de Fin",
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>("startEnd"));
      return (
        <div>
          {date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "conferenceID",
    header: "ID de Conferencia",
  },
];
