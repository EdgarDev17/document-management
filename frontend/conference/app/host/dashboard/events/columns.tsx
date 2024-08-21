"use client";

import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface Conference {
  conferenceID: number;
  conference_name: string;
  conference_type: string;
  description: string;
  conference_RegDate: Date;
  beggingDate: Date;
  finishDate: Date;
  documentAttempt: number;
  institutionID: number;
  status: number;
  institution_name: string;
  institution_website: string;
  institution_contact_phone: string;
  rolID: number;
}

export const columns: ColumnDef<Conference>[] = [
  {
    accessorKey: "conference_name",
    header: "Conferencias",
    cell: ({ row }) => {
      return (
        <Link href={`/host/dashboard/events/${row.original.conferenceID}`}>
          {row.getValue("conference_name")}
        </Link>
      );
    },
  },
  {
    accessorKey: "institution_name",
    header: "Institución",
  },
  {
    accessorKey: "beggingDate",
    header: "Fecha de inicio",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("beggingDate"));

      return <p>{formattedDate}</p>;
    },
  },
  // {
  //   accessorKey: "finishDate",
  //   header: "Fecha de finalización",
  //   cell: ({ row }) => {
  //     const formattedDate = formatDate(row.getValue("finishDate"));
  //
  //     return <p>{formattedDate}</p>;
  //   },
  // },
];
