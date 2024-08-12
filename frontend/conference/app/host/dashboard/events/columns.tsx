"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = {
  id: number;
  eventName: string;
  eventType: number;
  startingDate: Date;
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "eventName",
    header: "Evento",
    cell: ({ row }) => {
      return (
        <Link href={`/host/dashboard/events/${row.original.id}`}>
          {row.getValue("eventName")}
        </Link>
      );
    },
  },
  {
    accessorKey: "eventType",
    header: "Modalidad",
  },
  {
    accessorKey: "startingDate",
    header: "Fecha de inicio",
  },
];
